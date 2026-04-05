"""
Data conversion utility to convert CSV movies to optimized JSON format
Run this locally before deploying to Vercel

Usage: python convert_to_json.py
"""

import pandas as pd
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def convert_csv_to_json():
    """Convert movie CSV files to optimized JSON format"""
    
    # Read the movie dataset
    csv_path = "movie_dataset.csv"
    
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found")
        return
    
    print(f"Reading {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Select essential columns only
    essential_columns = [
        'movie_title', 'director_name', 'genres', 'plot_keywords',
        'duration', 'actor_1_name', 'actor_2_name', 'actor_3_name',
        'imdb_score', 'movie_imdb_link'
    ]
    
    # Filter to available columns
    available_cols = [col for col in essential_columns if col in df.columns]
    df_optimized = df[available_cols].copy()
    
    # Remove rows with missing titles
    df_optimized = df_optimized.dropna(subset=['movie_title'])
    
    # Convert to list of dicts with optimized naming
    movies = []
    for _, row in df_optimized.iterrows():
        movie = {
            'title': str(row.get('movie_title', '')).strip(),
            'director': str(row.get('director_name', '')).strip(),
            'genres': str(row.get('genres', '')).strip(),
            'keywords': str(row.get('plot_keywords', '')).strip(),
            'duration': int(row.get('duration', 0)) if pd.notna(row.get('duration')) else 0,
            'actor_1': str(row.get('actor_1_name', '')).strip(),
            'actor_2': str(row.get('actor_2_name', '')).strip(),
            'actor_3': str(row.get('actor_3_name', '')).strip(),
            'imdb_score': float(row.get('imdb_score', 0)) if pd.notna(row.get('imdb_score')) else 0,
            'poster_url': f"https://www.imdb.com/title/{extract_imdb_id(str(row.get('movie_imdb_link', '')))}/mediaviewer/",
        }
        movies.append(movie)
    
    # Save to JSON
    output_path = "data/movies_light.json"
    os.makedirs("data", exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(movies, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Converted {len(movies)} movies to {output_path}")
    print(f"✓ File size: {os.path.getsize(output_path) / (1024*1024):.2f} MB")

def extract_imdb_id(imdb_url):
    """Extract IMDb ID from URL"""
    if pd.isna(imdb_url):
        return "tt0000000"
    try:
        # URL format: https://www.imdb.com/title/tt1234567/
        parts = imdb_url.split('/title/')
        if len(parts) > 1:
            return parts[1].split('/')[0]
    except:
        pass
    return "tt0000000"

if __name__ == "__main__":
    convert_csv_to_json()
