import json
import math
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Load movie data once (cached)
MOVIES_DATA = None
MOVIE_TITLES_INDEX = None

def load_movies_data():
    """Load optimized movie data from JSON"""
    global MOVIES_DATA, MOVIE_TITLES_INDEX
    
    if MOVIES_DATA is None:
        data_path = os.path.join(os.path.dirname(__file__), '../../data/movies_light.json')
        try:
            with open(data_path, 'r', encoding='utf-8') as f:
                MOVIES_DATA = json.load(f)
                # Create movie title index for fast lookup
                MOVIE_TITLES_INDEX = {
                    movie['title'].lower().strip(): idx 
                    for idx, movie in enumerate(MOVIES_DATA)
                }
        except (FileNotFoundError, json.JSONDecodeError):
            MOVIES_DATA = []
            MOVIE_TITLES_INDEX = {}
    
    return MOVIES_DATA

def simple_tfidf_similarity(features1, features2):
    """
    Lightweight cosine similarity without sklearn
    features: list of strings from movie attributes
    """
    # Build word frequency maps
    def get_word_freq(text):
        words = text.lower().split()
        freq = {}
        for word in words:
            freq[word] = freq.get(word, 0) + 1
        return freq
    
    freq1 = get_word_freq(' '.join(str(f) for f in features1 if f))
    freq2 = get_word_freq(' '.join(str(f) for f in features2 if f))
    
    # Calculate cosine similarity
    common = set(freq1.keys()) & set(freq2.keys())
    if not common:
        return 0.0
    
    dot_product = sum(freq1[w] * freq2[w] for w in common)
    magnitude1 = math.sqrt(sum(f*f for f in freq1.values())) or 1
    magnitude2 = math.sqrt(sum(f*f for f in freq2.values())) or 1
    
    return dot_product / (magnitude1 * magnitude2)

def get_movie_categories():
    """Get all unique genres from dataset"""
    movies = load_movies_data()
    genres = set()
    for movie in movies:
        if 'genres' in movie and movie['genres']:
            genre_list = movie['genres'].split('|') if isinstance(movie['genres'], str) else movie['genres']
            genres.update(genre_list)
    return sorted(list(genres))

def recommend_by_movie_name(movie_name, limit=10):
    """Get recommendations based on a specific movie"""
    movies = load_movies_data()
    
    # Find the movie
    target_idx = None
    for idx, movie in enumerate(movies):
        if movie['title'].lower().strip() == movie_name.lower().strip():
            target_idx = idx
            break
    
    if target_idx is None:
        return {'error': f"Movie '{movie_name}' not found"}
    
    target_movie = movies[target_idx]
    target_features = [
        target_movie.get('director', ''),
        target_movie.get('genres', ''),
        target_movie.get('keywords', ''),
        str(target_movie.get('duration', '')),
        target_movie.get('actor_1', ''),
        target_movie.get('actor_2', ''),
        target_movie.get('actor_3', '')
    ]
    
    # Calculate similarities
    similarities = []
    for idx, movie in enumerate(movies):
        if idx == target_idx:
            continue
        
        features = [
            movie.get('director', ''),
            movie.get('genres', ''),
            movie.get('keywords', ''),
            str(movie.get('duration', '')),
            movie.get('actor_1', ''),
            movie.get('actor_2', ''),
            movie.get('actor_3', '')
        ]
        
        score = simple_tfidf_similarity(target_features, features)
        similarities.append((idx, score, movie))
    
    # Sort by similarity score and get top recommendations
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    recommendations = {}
    for i, (_, score, movie) in enumerate(similarities[:limit]):
        recommendations[i] = {
            'title': movie.get('title'),
            'director': movie.get('director'),
            'genres': movie.get('genres'),
            'imdb_score': movie.get('imdb_score'),
            'duration': movie.get('duration'),
            'poster_url': movie.get('poster_url'),
            'actors': [movie.get('actor_1'), movie.get('actor_2'), movie.get('actor_3')],
            'similarity_score': round(score, 2)
        }
    
    return recommendations

def get_top_rated_movies(limit=10):
    """Get top rated movies from dataset"""
    movies = load_movies_data()
    
    # Sort by IMDB score
    sorted_movies = sorted(
        movies,
        key=lambda x: float(x.get('imdb_score', 0)),
        reverse=True
    )
    
    top_movies = {}
    for i, movie in enumerate(sorted_movies[:limit]):
        top_movies[i] = {
            'title': movie.get('title'),
            'director': movie.get('director'),
            'genres': movie.get('genres'),
            'imdb_score': movie.get('imdb_score'),
            'duration': movie.get('duration'),
            'poster_url': movie.get('poster_url'),
            'actors': [movie.get('actor_1'), movie.get('actor_2'), movie.get('actor_3')]
        }
    
    return top_movies

def filter_by_category(category, limit=10):
    """Filter movies by genre/category"""
    movies = load_movies_data()
    
    filtered = []
    for movie in movies:
        genres = movie.get('genres', '')
        if isinstance(genres, str):
            if category.lower() in genres.lower():
                filtered.append(movie)
    
    # Sort by IMDB score
    filtered.sort(
        key=lambda x: float(x.get('imdb_score', 0)),
        reverse=True
    )
    
    result = {}
    for i, movie in enumerate(filtered[:limit]):
        result[i] = {
            'title': movie.get('title'),
            'director': movie.get('director'),
            'genres': movie.get('genres'),
            'imdb_score': movie.get('imdb_score'),
            'duration': movie.get('duration'),
            'poster_url': movie.get('poster_url'),
            'actors': [movie.get('actor_1'), movie.get('actor_2'), movie.get('actor_3')]
        }
    
    return result

def search_movies(query, limit=5):
    """Search movies by title"""
    movies = load_movies_data()
    query_lower = query.lower()
    
    results = []
    for movie in movies:
        if query_lower in movie.get('title', '').lower():
            results.append(movie)
    
    # Sort by IMDB score
    results.sort(
        key=lambda x: float(x.get('imdb_score', 0)),
        reverse=True
    )
    
    search_results = {}
    for i, movie in enumerate(results[:limit]):
        search_results[i] = {
            'title': movie.get('title'),
            'director': movie.get('director'),
            'genres': movie.get('genres'),
            'imdb_score': movie.get('imdb_score'),
            'poster_url': movie.get('poster_url'),
            'actors': [movie.get('actor_1'), movie.get('actor_2'), movie.get('actor_3')]
        }
    
    return search_results
