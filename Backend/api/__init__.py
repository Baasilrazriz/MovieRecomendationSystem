from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from .utils.auth import login_user, verify_token, extract_token_from_headers
from .utils.ml_engine import (
    recommend_by_movie_name, 
    get_top_rated_movies,
    filter_by_category,
    search_movies,
    get_movie_categories
)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration from environment
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

# Health check endpoint (used by Fly.io)
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "environment": ENVIRONMENT}), 200

# Root endpoint
@app.route('/', methods=['GET'])
def welcome():
    return jsonify({
        "message": "Movie Recommendation API",
        "version": "1.0",
        "endpoints": [
            "/api/login",
            "/api/top-rated",
            "/api/recommend",
            "/api/categories",
            "/api/filter",
            "/api/search"
        ]
    }), 200

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')
    
    if not username:
        return jsonify({"error": "Username required"}), 400
    
    result = login_user(username, password)
    
    if result['success']:
        return jsonify({
            "message": "Login successful",
            "token": result['token'],
            "username": result['username']
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Top rated movies
@app.route('/api/top-rated', methods=['GET'])
def top_rated():
    try:
        movies = get_top_rated_movies(limit=10)
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Recommend by movie name
@app.route('/api/recommend', methods=['GET'])
def recommend():
    movie_name = request.args.get('movie_name')
    
    if not movie_name:
        return jsonify({"error": "movie_name parameter required"}), 400
    
    try:
        recommendations = recommend_by_movie_name(movie_name)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get movie categories
@app.route('/api/categories', methods=['GET'])
def categories():
    try:
        cats = get_movie_categories()
        return jsonify({"categories": cats}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Filter by category
@app.route('/api/filter', methods=['GET'])
def filter_movies():
    category = request.args.get('category')
    
    if not category:
        return jsonify({"error": "category parameter required"}), 400
    
    try:
        movies = filter_by_category(category)
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Search movies
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q')
    
    if not query:
        return jsonify({"error": "q parameter required"}), 400
    
    try:
        results = search_movies(query)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=DEBUG)
