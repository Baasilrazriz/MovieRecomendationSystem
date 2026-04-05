# Hugging Face Spaces - Python Backend Deployment
# Free, no card, no GitHub required!

# app.py - Simple Flask wrapper for Hugging Face Spaces

from api import app

if __name__ == "__main__":
    # Hugging Face Spaces provides PORT via environment variable
    import os
    port = int(os.getenv("PORT", 7860))
    app.run(host="0.0.0.0", port=port, debug=False)
