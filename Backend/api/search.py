from flask import request, jsonify
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ml_engine import search_movies

def handler(request):
    """Vercel serverless function for movie search"""
    if request.method == 'OPTIONS':
        return '', 204
    
    if request.method != 'GET':
        return jsonify({"error": "Method not allowed"}), 405
    
    try:
        query = request.args.get('q')
        
        if not query:
            return jsonify({"error": "q parameter required"}), 400
        
        results = search_movies(query)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
