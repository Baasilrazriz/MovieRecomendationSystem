from flask import request, jsonify
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ml_engine import filter_by_category

def handler(request):
    """Vercel serverless function for category filtering"""
    if request.method == 'OPTIONS':
        return '', 204
    
    if request.method != 'GET':
        return jsonify({"error": "Method not allowed"}), 405
    
    try:
        category = request.args.get('category')
        
        if not category:
            return jsonify({"error": "category parameter required"}), 400
        
        movies = filter_by_category(category)
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
