import csv
import pandas as pd
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re


class MovieRecommendationSystem:
    def __init__(self, imdb_dataset_path, user_history_path, user_searches_path):
        self.imdb_dataset = self.load_imdb_dataset(imdb_dataset_path)
        self.user_history = self.load_user_history(user_history_path)
        self.user_searches = self.load_user_searches(user_searches_path)
        self.logged_in_user = None
        self.tf_idf_vectorizer = TfidfVectorizer()
        self.search_array = []  # To store search inputs

    def load_imdb_dataset(self, path):
        return pd.read_csv(path)

    def load_user_history(self, path):
        return pd.read_csv(path, encoding='latin1')
    
    
    def load_user_searches(self, path):
        return pd.read_csv(path, encoding='latin1')

    def login(self, username, password=None, credentials_file="authentication.txt"):
        if password is None:
            # If password is not provided, assume Google login and only use username
            self.logged_in_user = username
            print("Login successful.")
            return True
        else:
            # If password is provided, validate it
            with open(credentials_file, 'r') as file:
                reader = csv.reader(file)
                for row in reader:
                    stored_username, stored_password = row
                    if stored_username == username and stored_password == password:
                        print("Login successful.")
                        self.logged_in_user = username
                        return True
            print("Invalid username or password.")
            return False
    def get_movie_categories(self):
    # Assuming 'genres' is a column in your dataset that contains the genres of each movie
    # and each genre is separated by a comma
        all_genres = self.imdb_dataset['genres'].str.split('|').explode()  # Split by '|' and then explode to flatten
        unique_genres = all_genres.unique()  # Get unique genres
        categories = sorted(unique_genres.tolist())  # Sort the list for better readability
        return categories



    def recommend_movies_based_on_movie_name(self, movie_name):
        recommendations = {}
        
        # Check if the movie exists in the dataset
        # Convert both input and titles in dataset to lower case to avoid case sensitivity issues
        # Also strip leading/trailing whitespaces
        if movie_name.lower().strip() not in self.imdb_dataset['movie_title'].str.lower().str.strip().values:
            recommendations['error'] = "Movie not found."
            return recommendations

        # Get the features of the input movie
        # Use the same lower and strip transformations for the comparison
        movie_features = self.imdb_dataset[self.imdb_dataset['movie_title'].str.lower().str.strip() == movie_name.lower().strip()][['director_name', 'genres', 'plot_keywords', 'duration',
                                                      'actor_1_name', 'actor_2_name', 'actor_3_name']].fillna('')
        
        # Convert numeric columns to string
        movie_features['duration'] = movie_features['duration'].astype(str)

        # Concatenate all features into a single string
        movie_features_str = movie_features.apply(lambda x: ' '.join(x.astype(str)), axis=1)

        # Fit TF-IDF vectorizer on IMDb dataset
        self.tf_idf_vectorizer.fit(self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1))

        # Transform movie features and all movies features to TF-IDF vectors
        movie_tfidf = self.tf_idf_vectorizer.transform(movie_features_str)
        all_movies_tfidf = self.tf_idf_vectorizer.transform(self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1))

        # Calculate cosine similarity between movie features and all movies features
        similarity_scores = cosine_similarity(movie_tfidf, all_movies_tfidf)

        # Get indices of top 6 similar movies (including the input movie itself)
        top_indices = similarity_scores.argsort(axis=1)[:, ::-1][:, :11]

        # Print recommended movies with all metadata including poster URLs
        print(f"Top 10 recommended movies for movie {movie_name}:")
        for i, index in enumerate(top_indices[0]):  # Only take the first 6 indices
            if i == 0:  # Skip the first index because it's the input movie itself
                continue
            movie_metadata = self.imdb_dataset.iloc[index].to_dict()
            poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
            movie_metadata['poster_url'] = poster_url
            recommendations[i-1] = movie_metadata  # i-1 because we skipped the first index

        return recommendations
    def recommend_movies(self):
        recommendations = {}
        if self.logged_in_user:
            user_watched_movies = self.user_history[self.user_history['Username'] == self.logged_in_user]
        
        # If the user has no watched movies, treat them as a new user
            if user_watched_movies.empty:
                return self.initial_recommendation()
    
            user_features = user_watched_movies[['director_name', 'genres', 'plot_keywords', 'duration',
                                                  'actor_1_name', 'actor_2_name', 'actor_3_name']].fillna('')
        
            
            # Convert numeric columns to string
            user_features['duration'] = user_features['duration'].astype(str)

            # Concatenate all features into a single string for each movie
            user_features_str = user_features.apply(lambda x: ' '.join(x.astype(str)), axis=1)

            # Fit TF-IDF vectorizer on IMDb dataset
            self.tf_idf_vectorizer.fit(self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1))

            # Transform user features and movie features to TF-IDF vectors
            user_tfidf = self.tf_idf_vectorizer.transform(user_features_str)
            movie_tfidf = self.tf_idf_vectorizer.transform(self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1))

            # Calculate cosine similarity between user features and movie features
            similarity_scores = cosine_similarity(user_tfidf, movie_tfidf)

            # Get indices of top 5 similar movies
            top_indices = similarity_scores.argsort(axis=1)[:, ::-1][:, 1:11]
            
             # Print recommended movies with all metadata including poster URLs
            print(f"Top 5 recommended movies for user {self.logged_in_user}:")
            for i, indices in enumerate(top_indices[0][:10]):  # Only take the first 10 indices
                movie_metadata = self.imdb_dataset.iloc[indices].to_dict()
                poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
                movie_metadata['poster_url'] = poster_url
                recommendations[i] = movie_metadata
            
            
        else:
            recommendations['error'] = "Please login first."
        return recommendations
    
    def top_rated_movies(self):
        top_movies = {}

        # Sort the dataset by the 'rating' column in descending order
        sorted_movies = self.imdb_dataset.sort_values(by='imdb_score', ascending=False)

        # Get the top 5 movies
        top_10_movies = sorted_movies.head(10)

        for i, (_, movie) in enumerate(top_10_movies.iterrows()):
            movie_metadata = movie.to_dict()
            poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
            movie_metadata['poster_url'] = poster_url
            top_movies[i] = movie_metadata

        return top_movies
    def initial_recommendation(self):
        init_recommendations = {}

        # Concatenate all features into a single string for each movie in the IMDb dataset
        movie_features_str = self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1)

        # Fit TF-IDF vectorizer on movie features
        movie_tfidf = self.tf_idf_vectorizer.fit_transform(movie_features_str)

        # Calculate cosine similarity between all pairs of movies
        similarity_scores = cosine_similarity(movie_tfidf)

        # Get indices of top 10 similar movies for each movie
        top_indices = similarity_scores.argsort(axis=1)[:, ::-1][:, 1:11]
        
        print("Top 5 initial recommended movies:")
        for i, indices in enumerate(top_indices[0][:10]):  # Only take the first 10 indices
           movie_metadata = self.imdb_dataset.iloc[indices].to_dict()
           poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
           movie_metadata['poster_url'] = poster_url
           init_recommendations[i] = movie_metadata
        return init_recommendations

 
        init_recommendations = {}

        # Concatenate all features into a single string for each movie in the IMDb dataset
        movie_features_str = self.imdb_dataset.apply(lambda x: ' '.join(x.fillna('').astype(str)), axis=1)

        # Fit TF-IDF vectorizer on movie features
        movie_tfidf = self.tf_idf_vectorizer.fit_transform(movie_features_str)

        # Calculate cosine similarity between all pairs of movies
        similarity_scores = cosine_similarity(movie_tfidf)

        # Get indices of top 5 similar movies for each movie
        top_indices = similarity_scores.argsort(axis=1)[:, ::-1][:, 1:6]
        
        print("Top 5 initial recommended movies:")
        for i, indices in enumerate(top_indices[0][:5]):  # Only take the first 5 indices
           movie_metadata = self.imdb_dataset.iloc[indices].to_dict()
           poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
           movie_metadata['poster_url'] = poster_url
           init_recommendations[i] = movie_metadata
        return init_recommendations

    def record_user_history(self, movie_name):
        # Search for the movie in the IMDb dataset
        movie_row = self.imdb_dataset[self.imdb_dataset['movie_title'].str.contains(movie_name, case=False)]

        # Check if the movie exists
        if not movie_row.empty:
            # Extract all columns of the movie
            movie_info = movie_row.iloc[0].to_dict()

            movie_info['Username'] = self.logged_in_user

            # Check if the movie already exists in user_history for the logged in user
            if movie_name in self.user_history[self.user_history['Username'] == self.logged_in_user]['movie_title'].values:
                return(f"Movie '{movie_name}' already exists in user history.")
            
            # Append the movie information to the user_history dataset
            self.user_history = pd.concat([self.user_history, pd.DataFrame(movie_info, index=[0])], ignore_index=True)
            # Save the updated user_history dataset back to the CSV file
            self.user_history.to_csv("User_history.csv", index=False, encoding='latin1')
           
            return(f"Movie '{movie_name}' recorded in user history.")
        else:
            return(f"Movie '{movie_name}' not found in the IMDb dataset.")
    
    def movie_category_filter(self, category):
        recommendations = {}
    
        # Split the 'genres' column and check if the category is in the genres
        filtered_movies = self.imdb_dataset[self.imdb_dataset['genres'].str.contains(category, case=False, na=False)]
    
        # Get the top 5 movies that match the category
        top_10_movies = filtered_movies.head(10)
    
        # Return the metadata of the filtered movies
        print(f"Top 5 movies in category '{category}':")
        for i, (_, movie) in enumerate(top_10_movies.iterrows()):
            movie_metadata = movie.to_dict()
            poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
            movie_metadata['poster_url'] = poster_url
            recommendations[i] = movie_metadata
    
        return recommendations


    def on_change_search(self, search_input):
        if self.logged_in_user:
            # Append the search input to the search array
            self.search_array.append(search_input)

            # Search for the movie in the IMDb dataset
            movie_rows = self.imdb_dataset[self.imdb_dataset['movie_title'].str.contains(search_input, case=False, na=False)]

            # Check if any movies match the search input
            if not movie_rows.empty:
                # Create a copy of the movie_rows to avoid SettingWithCopyWarning
                movie_rows_copy = movie_rows.copy()
                
                # Add a column for the username
                movie_rows_copy['Username'] = self.logged_in_user

                # Append the search results to the user_searches dataset
                self.user_searches = pd.concat([self.user_searches, movie_rows_copy], ignore_index=True)
                
                # Save the updated user_searches dataset back to the CSV file
                self.user_searches.to_csv("User_searches.csv", index=False, encoding='latin1')
                
                return(f"Search for '{search_input}' recorded with matching movies.")
            else:
                return(f"No movies found for search input '{search_input}'.")
        else:
            print("Please login first.")

    def get_poster_url_from_title(self, movie_title):
        """
        Given a movie title, fetch the IMDb link from the dataset,
        extract the IMDb ID, and then get the poster URL using the OMDb API.
        """
        api_key = 'ad45e532'
        movie_row = self.imdb_dataset[self.imdb_dataset['movie_title'].str.contains(movie_title, case=False, na=False)]
        if not movie_row.empty:
            imdb_url = movie_row.iloc[0]['movie_imdb_link']
            poster_url = self.get_movie_poster(imdb_url, api_key)
            return poster_url
        else:
            print(f"No movie found with title '{movie_title}'.")
            return None

    def get_movie_poster(self, imdb_url, api_key):
        """
        Retrieves the movie poster URL from the OMDb API.
        """
        imdb_id = self.extract_imdb_id(imdb_url)
        omdb_url = f"http://www.omdbapi.com/?i={imdb_id}&apikey={api_key}"
        
        response = requests.get(omdb_url)
        if response.status_code != 200:
            print(f"Failed to retrieve data from OMDb API: {response.status_code}")
            return None

        data = response.json()
        if 'Poster' in data and data['Poster'] != 'N/A':
            return data['Poster']
        
        print(f"No poster image found for movie ID '{imdb_id}'")
        return None
    @staticmethod
    def clean_movie_title(title):
       """
       Cleans the movie title by removing non-ASCII characters and extra spaces.
       """
       # Remove non-ASCII characters
       title = re.sub(r'[^\x00-\x7F]+', '', title)
       # Remove extra spaces
       title = title.strip()
       return title

    def get_user_history(self):
       history_movies = {}
       if self.logged_in_user is None:
           return {"error": "No user is currently logged in."}
       
       user_history = self.user_history[self.user_history['Username'] == self.logged_in_user]
       
       if user_history.empty:
           return {"error": f"No history found for user '{self.logged_in_user}'."}
       
       user_history = user_history.head(10)
       for i, movie in user_history.iterrows():
           movie_metadata = movie.to_dict()
           # Clean the movie title before getting the poster URL
           cleaned_movie_title = MovieRecommendationSystem.clean_movie_title(movie_metadata['movie_title'])
           poster_url = self.get_poster_url_from_title(cleaned_movie_title)
           if poster_url is None:
               poster_url = "path_to_default_poster_image.jpg"  # Fallback image URL
           movie_metadata['poster_url'] = poster_url
           history_movies[i] = movie_metadata
       
       return history_movies
    def extract_imdb_id(self, url):
        return url.split('/')[4]
    
    def get_user_searches(self, username):
        user_searches = self.user_searches[self.user_searches['Username'] == username]
        if user_searches.empty:
            return {"error": f"No searches found for user '{username}'."}
        search_movies = user_searches['movie_title'].tolist()
        return search_movies;