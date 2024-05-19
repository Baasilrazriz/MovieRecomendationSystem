import csv
import pandas as pd
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
            top_indices = similarity_scores.argsort(axis=1)[:, ::-1][:, 1:6]
            
             # Print recommended movies with all metadata including poster URLs
            print(f"Top 5 recommended movies for user {self.logged_in_user}:")
            for i, indices in enumerate(top_indices[0][:5]):  # Only take the first 5 indices
                movie_metadata = self.imdb_dataset.iloc[indices].to_dict()
                poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
                movie_metadata['poster_url'] = poster_url
                recommendations[i] = movie_metadata
            
            
        else:
            recommendations['error'] = "Please login first."
        return recommendations

    def initial_recommendation(self):
        recommendations = {}

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
           recommendations[i] = movie_metadata
        return recommendations

    def record_user_history(self, movie_name):
        # Search for the movie in the IMDb dataset
        movie_row = self.imdb_dataset[self.imdb_dataset['movie_title'].str.contains(movie_name, case=False)]

        # Check if the movie exists
        if not movie_row.empty:
            # Extract all columns of the movie
            movie_info = movie_row.iloc[0].to_dict()

            movie_info['Username'] = self.logged_in_user

            # Append the movie information to the user_history dataset
            self.user_history = pd.concat([self.user_history, pd.DataFrame(movie_info, index=[0])], ignore_index=True)
            # Save the updated user_history dataset back to the CSV file
            self.user_history.to_csv("User_history.csv", index=False, encoding='latin1')
           
            print(f"Movie '{movie_name}' recorded in user history.")
        else:
            print(f"Movie '{movie_name}' not found in the IMDb dataset.")
    
    def movie_category_filter(self, category):
    # Split the 'genres' column and check if the category is in the genres
        filtered_movies = self.imdb_dataset[self.imdb_dataset['genres'].str.contains(category, case=False, na=False)]

    # Get the top 100 movies that match the category
        top_100_movies = filtered_movies.head(100)

    # Return or print the metadata of the filtered movies
        print(f"Top 100 movies in category '{category}':")
        for _, movie in top_100_movies.iterrows():
            movie_metadata = movie.to_dict()
            poster_url = self.get_poster_url_from_title(movie_metadata['movie_title'])
            movie_metadata['poster_url'] = poster_url
            print(movie_metadata)


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
                
                print(f"Search for '{search_input}' recorded with matching movies.")
            else:
                print(f"No movies found for search input '{search_input}'.")
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

    def extract_imdb_id(self, url):
        return url.split('/')[4]