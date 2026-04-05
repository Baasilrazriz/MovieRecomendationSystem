# 🚀 MODAL LABS - TERMINAL-ONLY DEPLOYMENT GUIDE

## ✨ BEST FOR YOU: Pure Terminal, No Card, No GitHub Scope!

---

## 🎯 Your Final Setup

```
Frontend:  Vercel (already live)              ✅
Backend:   Modal Labs (terminal deploy)       ← NEW!
Database:  CSV files (included in Backend)    ✅

TOTAL:     $0/month forever, fully terminal! 🎉
```

---

## ⚡ QUICKEST PATH (5 minutes terminal-only)

### 1. Install Modal (1 min)
```bash
pip install modal
```

**or macOS with Brew:**
```bash
brew install modal
```

### 2. Create Account & Authenticate (1 min)
```bash
modal token new

# Browser opens → Sign up (free, no card!)
# Copy token shown → Paste into terminal
# Done!
```

### 3. Deploy Backend (1 sec!)
```bash
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem/Backend

modal deploy modal_app.py
```

**Output:**
```
✓ Building image...
✓ Deploying...
✓ App deployed to: https://[username]--movie-api.modal.run
```

### 4. Copy URL & Update Frontend (1 min)
```bash
# Update Frontend/.env with your Modal URL
cd ../Frontend

# Edit .env and change:
VITE_API_URL=https://[username]--movie-api.modal.run

# Save & push
git add Frontend/.env
git commit -m "Add Modal API endpoint"
git push origin main
```

### 5. Test It Works! (Instant)
```bash
# Test backend
curl https://[username]--movie-api.modal.run/health
# Returns: {"status": "healthy"}

# Frontend auto-deploys on Vercel
# Your app is LIVE! 🎉
```

---

## 📋 DETAILED SETUP

### Step 1: Install Modal CLI

```bash
# Using pip (recommended)
pip install modal

# Using Homebrew (macOS)
brew install modal

# Using Homebrew (macOS universal)
brew install modal --universal

# Verify installation
modal --version
# Should show: v0.x.x
```

### Step 2: Authenticate with Modal

```bash
# This opens a browser automatically
modal token new

# Your browser will:
# 1. Show Modal signup page
# 2. You create free account (email + password)
# 3. It generates a token
# 4. Copy the token from browser
# 5. Paste it in terminal when prompted

# Terminal shows: ✓ Authenticated as [email]
```

**Questions:**
- **Card required?** NO! Never!
- **GitHub integration?** NO! Just your account!
- **Time?** 2 minutes max!

### Step 3: Verify Files Are Ready

Modal needs these files in Backend/:

```
Backend/
├── modal_app.py           ✅ (provided)
├── requirements.txt       ✅ (already there)
├── api/
│   ├── __init__.py        ✅ (your Flask app)
│   ├── login.py
│   ├── recommend.py
│   ├── search.py
│   ├── categories.py
│   ├── filter.py
│   ├── top_rated.py
│   └── utils/
│       ├── auth.py
│       └── ml_engine.py
├── movie_dataset.csv      ✅ (data files)
├── User_history.csv
└── User_searches.csv
```

All there? Good!

### Step 4: Deploy!

```bash
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem/Backend

# One command deploys everything
modal deploy modal_app.py

# What happens:
# 1. Reads modal_app.py
# 2. Builds Docker image with dependencies
# 3. Uploads to Modal servers
# 4. Starts your Flask app
# 5. Gives you a URL

# Expected output (1-2 minutes):
# ✓ Created image...
# ✓ Pushing to registry...
# ✓ Deploying web server...
# ✓ Deployed!
# 
# Your live app is at:
# https://[username]--movie-api.modal.run
```

### Step 5: Test Your API

```bash
# Get URL from modal deploy output
MODAL_URL="https://[username]--movie-api.modal.run"

# Test health endpoint
curl $MODAL_URL/health
# Returns: {"status": "healthy", "environment": "production"}

# Test root endpoint
curl $MODAL_URL/
# Returns your API info

# All endpoints ready!
```

### Step 6: Update Frontend

```bash
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem/Frontend

# Edit .env
nano .env

# Update:
VITE_API_URL=https://[username]--movie-api.modal.run
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

Or use VS Code:
```bash
code .env
# Edit the VITE_API_URL line
```

### Step 7: Push & Deploy Frontend

```bash
cd ..

git add Frontend/.env
git commit -m "Configure Modal API endpoint"
git push origin main

# Vercel automatically deploys! ✨
# Check your Vercel dashboard for deployment status
```

### Step 8: Verify Everything Works!

```bash
# 1. Check frontend deployed
# Visit: https://[your-name].vercel.app
# Click around, try searching for movies

# 2. Should connect to Modal API automatically
# If it works, you see recommendations! ✅

# 3. Check logs
modal logs webapp
# See the requests from your frontend
```

---

## 🛠️ MANAGEMENT COMMANDS

```bash
# View current deployments
modal list

# View logs (real-time, Ctrl+C to exit)
modal logs webapp

# View specific app info
modal describe [app-name]

# Stop an app (keeps code, just shuts down)
modal stop [app-name]

# Remove an app completely
modal remove [app-name]

# Redeploy (after code changes)
cd Backend
modal deploy modal_app.py

# Debug locally before deploying
modal run modal_app.py
```

---

## 📊 YOUR URLS

After deployment:

```
Frontend:
  https://[your-vercel-projectname].vercel.app

Backend (Modal):
  https://[your-username]--movie-api.modal.run

API Endpoints:
  Health check:    /health
  Login:          /api/login
  Recommendations: /api/recommend
  Search:         /api/search
  Categories:     /api/categories
  Top rated:      /api/top-rated
  Filter:         /api/filter
```

---

## ✅ COMPLETE CHECKLIST

- [ ] Run: `pip install modal`
- [ ] Run: `modal token new` (create account)
- [ ] Run: `modal deploy modal_app.py`
- [ ] Copy your Modal URL
- [ ] Update Frontend/.env with URL
- [ ] Run: `git push origin main`
- [ ] Visit Vercel URL
- [ ] Test app (search/recommendations)
- [ ] DONE! 🎉

---

## 🆘 TROUBLESHOOTING

### "modal: command not found"
```bash
# Reinstall and make sure PATH is updated
pip install --upgrade modal
# Restart terminal or run:
hash -r
```

### "Authentication failed"
```bash
# Try again
modal token new
# Make sure you paste the full token
```

### "Build fails"
```bash
# Check requirements.txt has all dependencies
cat requirements.txt

# Verify Flask & dependencies are listed
# If missing, add:
pip install flask Flask-cors python-dotenv PyJWT Werkzeug
pip freeze > requirements.txt

# Redeploy
modal deploy modal_app.py
```

### "API not responding"
```bash
# Check if deployed
modal list

# View logs for errors
modal logs webapp

# May need to wait 30sec for cold start
```

### "Can't reach from frontend"
```bash
# Verify URL format
modal list
# Copy exact URL shown

# Update Frontend/.env with correct URL
nano Frontend/.env

# Test directly
curl https://[your-url].modal.run/health

# Redeploy frontend if needed
git add Frontend/.env
git commit -m "Fix API URL"
git push origin main
```

---

## 💡 PRO TIPS

1. **Save your URL:** After first deploy, bookmark it!
   ```bash
   echo "Modal URL: https://[username]--movie-api.modal.run" >> ~/modal_url.txt
   ```

2. **Watch logs during testing:**
   ```bash
   # In one terminal
   modal logs webapp
   
   # In another terminal
   # Make requests to test
   curl https://[url]/health
   ```

3. **Update code** (without redeploying whole app):
   ```bash
   # Edit your files
   nano api/ml_engine.py
   
   # Redeploy
   modal deploy modal_app.py
   ```

4. **Use Modal's free tier generously:**
   - ✅ Always on
   - ✅ No sleep/wake cycles
   - ✅ Great for hobby projects
   - ✅ Scale later if needed

---

## 🎯 SUMMARY

**Your entire backend deployment is:**
1. One command: `modal deploy modal_app.py`
2. One minutes: Wait for deployment
3. Copy URL: Use in frontend
4. Push to git: Everything auto-deploys

**NO dashboards. NO GUI. Just pure CLI!** ✨

---

## 📚 MORE INFO

- Modal Docs: https://modal.com/docs
- Python Deployment: https://modal.com/docs/guide/web_endpoints
- CLI Reference: https://modal.com/docs/reference/cli

---

## 🚀 READY?

```bash
# Go!
pip install modal
modal token new
modal deploy modal_app.py

# Your app is LIVE! 🎉
```

That's it! Pure terminal. No cards. No GitHub scope. No hassle.

**Just terminal commands and you're done!** ✨
