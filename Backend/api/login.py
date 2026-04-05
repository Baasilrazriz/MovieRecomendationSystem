from flask import request, jsonify
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.auth import login_user

def handler(request):
    """Vercel serverless function for login"""
    if request.method == 'OPTIONS':
        return '', 204
    
    if request.method != 'POST':
        return jsonify({"error": "Method not allowed"}), 405
    
    try:
        data = request.get_json() or {}
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500
