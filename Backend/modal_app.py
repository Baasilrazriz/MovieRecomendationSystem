"""
Modal Labs Web App Configuration
Deploy with: python3 -m modal deploy modal_app.py
"""

import modal

# Create Modal App
app = modal.App("movie-rec-server")

# Define image with all dependencies
image = (
    modal.Image.debian_slim()
    .pip_install("flask==3.0.3", "flask-cors==4.0.0", "python-dotenv==1.0.0", "PyJWT==2.8.0")
)

# Deploy Flask app with Modal's web server
@app.function(image=image)
@modal.asgi_app()
def flask_asgi():
    """Deploy Flask app via ASGI"""
    from api import app
    return app


# To deploy: python3 -m modal deploy modal_app.py
# To view logs: python3 -m modal logs  
# API will be at: https://[username]--movie-rec-server.modal.run
