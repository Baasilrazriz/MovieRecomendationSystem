import requests

def extract_imdb_id(url):
    """
    Extracts the IMDb ID from the given URL.
    Example: "http://www.imdb.com/title/tt0499549/?ref_=fn_tt_tt_1" -> "tt0499549"
    """
    return url.split('/')[4]

def get_movie_poster(imdb_url, api_key):
    """
    Retrieves the movie poster URL from the OMDb API.
    """
    imdb_id = extract_imdb_id(imdb_url)
    omdb_url = f"http://www.omdbapi.com/?i={imdb_id}&apikey={api_key}"
    
    response = requests.get(omdb_url)
    if response.status_code != 200:
        print(f"Failed to retrieve data from OMDb API: {response.status_code}")
        return None

    data = response.json()
    if 'Poster' in data and data['Poster'] != 'N/A':
        return data['Poster']
    
    print(f"No poster image found for movie ID '{imdb_id}'")
    return None

# Example usage
imdb_url = 'https://www.imdb.com/title/tt2379713/?ref_=fn_tt_tt_1'
api_key = 'ad45e532'  # Replace with your OMDb API key
poster_url = get_movie_poster(imdb_url, api_key)
if poster_url:
    print(f"Poster URL: {poster_url}")
