from flask import request, jsonify
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ml_engine import get_movie_categories

def handler(request):
    """Vercel serverless function for movie categories"""
    if request.method == 'OPTIONS':
        return '', 204
    
    if request.method != 'GET':
        return jsonify({"error": "Method not allowed"}), 405
    
    try:
        categories = get_movie_categories()
        return jsonify({"categories": categories}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
