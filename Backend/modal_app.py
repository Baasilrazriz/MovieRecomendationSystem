"""
Modal Labs Web App Configuration
Deploy with: python3 -m modal deploy modal_app.py
"""

import modal
import os
import sys

# Create Modal App
app = modal.App("movie-rec-server")

# Get the absolute path to the Backend directory
BACKEND_PATH = os.path.dirname(os.path.abspath(__file__))

# Define image with dependencies
image = (
    modal.Image.debian_slim()
    .pip_install(
        "flask==3.0.3",
        "flask-cors==4.0.0",
        "python-dotenv==1.0.0",
        "PyJWT==2.8.0",
        "scikit-learn==1.3.1",
        "numpy==1.24.3",
        "pandas==2.0.3"
    )
)

# Deploy Flask app with Modal's web server
@app.function(image=image)
@modal.asgi_app()
def flask_asgi():
    """Deploy Flask app via ASGI"""
    sys.path.insert(0, BACKEND_PATH)
    
    # Import Flask app - api/__init__.py will set it up
    from api import app as flask_app
    return flask_app


# To deploy: python3 -m modal deploy modal_app.py
# To view logs: python3 -m modal logs  
# API will be at: https://[username]--movie-rec-server.modal.run