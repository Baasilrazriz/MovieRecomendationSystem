from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from backend import MovieRecommendationSystem
app = Flask(__name__)
CORS(app)

system = MovieRecommendationSystem("movie_dataset.csv", "User_history.csv", "User_searches.csv")

api_key = os.getenv('OMDB_API_KEY', 'ad45e532')
@app.route('/')
def welcome():
    return jsonify({"logged_in_user": system.logged_in_user})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')  # This will be None if not provided
    credentials_file = "authentication.txt"
    if system.login(username, password, credentials_file):
        return jsonify({"message": "Login successful."}), 200
    else:
        return jsonify({"message": "Invalid username or password."}), 401

@app.route('/recommendMoviesByname', methods=['GET'])
def recommendMoviesByname():
    # Check if user is logged in
    if system.logged_in_user is None:
        return jsonify({"message": "Please log in to get recommendations."}), 401

    # Get movie name from request parameters
    movie_name = request.args.get('movie_name')

    # Get movie recommendations
    recommendations = system.recommend_movies_based_on_movie_name(movie_name)

    return jsonify({"recommendations": recommendations}), 200
@app.route('/recommend_movies', methods=['GET'])
def recommend_movies():
    if system.logged_in_user:
        recommendations = system.recommend_movies()
        return jsonify(recommendations), 200
    else:
        return jsonify({"message": "Please login first."}), 403

@app.route('/initial_recommendation', methods=['GET'])
def initial_recommendation():
    recommendations = system.initial_recommendation()
    return jsonify(recommendations), 200

@app.route('/record_user_history', methods=['POST'])
def record_user_history():
    data = request.json
    movie_name = data.get('movie_name')
    if system.logged_in_user:
        message = system.record_user_history(movie_name)
        return jsonify({"message": message}), 200
    else:
        return jsonify({"message": "Please login first."}), 403
    
@app.route('/movie_categories', methods=['GET'])
def get_movie_categories():
    categories = system.get_movie_categories()
    return jsonify({"categories": categories}), 200

@app.route('/movie_filter_by_category', methods=['GET'])
def movie_category_filter():
    category = request.args.get('category')
    if category:
        filtered_movies = system.movie_category_filter(category)
        return jsonify(filtered_movies), 200
    else:
        return jsonify({"message": "Category parameter is required."}), 400

@app.route('/on_change_search', methods=['POST'])
def on_change_search():
    data = request.json
    search_input = data.get('search_input')
    if system.logged_in_user:
        message = system.on_change_search(search_input)
        return jsonify({"message": message}), 200
    else:
        return jsonify({"message": "Please login first."}), 403

@app.route('/get_poster', methods=['GET'])
def get_poster_url_from_title():
    movie_title = request.args.get('movie_title')
    if movie_title:
        poster_url = system.get_poster_url_from_title(movie_title, api_key)
        if poster_url:
            return jsonify({"poster_url": poster_url}), 200
        else:
            return jsonify({"message": f"No poster found for movie '{movie_title}'."}), 404
    else:
        return jsonify({"message": "Movie title parameter is required."}), 400

if __name__ == "__main__":
    app.run(debug=True)
