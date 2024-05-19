import pandas as pd

# Load the movie dataset
movie_dataset_path = "movie_main_dataset.csv"
movie_data = pd.read_csv(movie_dataset_path)

# Display the first few rows of the dataset to understand its structure
print("First few rows of the dataset:")
print(movie_data.head())

# Display the dimensions dataset to understand its structure
print("Dimensions of the dataset:")
print(movie_data.shape)

# Using info so we can check the datatype of the type 
print(movie_data.info())

#here we put value_count on every feature
for column in movie_data.columns:
    print(movie_data[column].value_counts())
    print("*" * 30)

# Check for missing values in each column
print("\nNumber of missing values in each column:")
print(movie_data.isnull().sum())

# Drop columns with a significant number of null values
print("\nColumns to drop due to high null values:")

# drop the null value columns because they contain a significant amount of null values
movie_data.drop(columns=['director_facebook_likes', 'facenumber_in_poster', 'movie_facebook_likes'], inplace=True)

# dropping the irrelevant columns not useful for movie prediction
movie_data.drop(columns=['actor_1_facebook_likes', 'color', 'num_critic_for_reviews', 'actor_3_facebook_likes',
                          'gross', 'actor_2_facebook_likes', 'aspect_ratio','num_voted_users','cast_total_facebook_likes',
                         'num_user_for_reviews','budget'], inplace=True)

# Now we check the min max average number of features
movie_data.describe()

# Display the updated dataset after dropping columns
print("\nUpdated dataset after dropping columns:")
print(movie_data.head())


