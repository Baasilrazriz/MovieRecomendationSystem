from flask import request, jsonify
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ml_engine import recommend_by_movie_name

def handler(request):
    """Vercel serverless function for movie recommendations"""
    if request.method == 'OPTIONS':
        return '', 204
    
    if request.method != 'GET':
        return jsonify({"error": "Method not allowed"}), 405
    
    try:
        movie_name = request.args.get('movie_name')
        
        if not movie_name:
            return jsonify({"error": "movie_name parameter required"}), 400
        
        recommendations = recommend_by_movie_name(movie_name)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
