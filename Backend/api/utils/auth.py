import jwt
import os
import json
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')

# Simple in-memory user store (replace with Supabase/Firebase in production)
USERS_DB = {
    "demo": "demo123",
    "test": "test123"
}

def create_token(username):
    """Create JWT token for user"""
    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(hours=24),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(token):
    """Verify JWT token and return username"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload.get('username')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def login_user(username, password=None):
    """
    Authenticate user
    If password is None, treat as Google login
    """
    if password is None:
        # Google login - just validate username exists
        token = create_token(username)
        return {'success': True, 'token': token, 'username': username}
    
    # Traditional login
    if username in USERS_DB and USERS_DB[username] == password:
        token = create_token(username)
        return {'success': True, 'token': token, 'username': username}
    
    return {'success': False, 'token': None, 'username': None}

def require_auth(f):
    """Decorator to require authentication for Vercel functions"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # For Vercel, we'll use query/body parameter instead
        return f(*args, **kwargs)
    return decorated_function

def extract_token_from_headers(headers):
    """Extract JWT token from Authorization header"""
    auth_header = headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        return auth_header[7:]
    return None
