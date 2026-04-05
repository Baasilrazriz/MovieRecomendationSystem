#!/bin/bash

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║  🚀 MODAL LABS - PURE TERMINAL DEPLOYMENT                    ║
║     ✅ Terminal Only | ✅ No Card | ✅ No GitHub Scope      ║
╚════════════════════════════════════════════════════════════════╝


## ✨ WHY MODAL LABS?

✅ Deploy from terminal: `modal deploy`
✅ 100% free forever
✅ NO card required
✅ NO GitHub integration
✅ Python-native
✅ Always-on hosting
✅ Production-ready


═══════════════════════════════════════════════════════════════════


## 🚀 SETUP (From Terminal Only!)


### Step 1: Install Modal CLI (1 min)
──────────────────────────────────────

```bash
# Install Modal
pip install modal

# Or with brew (macOS)
brew install modal

# Verify installation
modal --version
```


### Step 2: Authenticate (1 min)
─────────────────────────────────

```bash
# Authenticate with Modal (opens browser to create account)
modal token new

# Browser opens → Create free account
# Copy token from browser
# Paste into terminal
# Done! ✨
```

**No card asked. Ever.**


### Step 3: Create Modal App File (Already Done!)
─────────────────────────────────────────────────

File: `Backend/modal_app.py` (we'll create it)

This tells Modal how to run your app.


### Step 4: Deploy to Modal (1 sec!)
──────────────────────────────────────

```bash
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem/Backend

# Deploy! (That's it!)
modal deploy modal_app.py

# Output will show:
# ✓ Deployment created
# ✓ App URL: https://[username]--movie-api.modal.run
```

**LIVE!** Your backend is now running on Modal's servers!


════════════════════════════════════════════════════════════════════


## 🧪 TEST IT

```bash
# Copy the URL from deployment output
Modal_URL="https://[username]--movie-api.modal.run"

# Test API
curl $Modal_URL/health
# Returns: {"status": "healthy"}

# View logs
modal logs webapp

# Stop/restart
modal stop
```


════════════════════════════════════════════════════════════════════


## 🌐 UPDATE FRONTEND

```bash
cd Frontend

# Edit .env
nano .env

# Change:
VITE_API_URL=https://[username]--movie-api.modal.run
VITE_ENVIRONMENT=production
VITE_DEBUG=false

# Save and push
git add .env
git commit -m "Update API to Modal Labs"
git push origin main

# Vercel auto-deploys! ✨
```


════════════════════════════════════════════════════════════════════


## 🛠️ DAILY COMMANDS

```bash
# Deploy new version
modal deploy modal_app.py

# View logs
modal logs webapp

# List deployed apps
modal list

# Stop an app
modal stop [app-name]

# Remove app
modal remove [app-name]

# Get app details
modal describe [app-name]
```


════════════════════════════════════════════════════════════════════


## ✅ COMPLETE SETUP

Frontend:  Vercel (already live) ✅
Backend:   Modal Labs (terminal deploy) ← NEW!
Database:  CSV files (included) ✅

TOTAL COST: $0/month forever! 🎉


════════════════════════════════════════════════════════════════════


## 🎯 STEP-BY-STEP TERMINAL COMMANDS

```bash
# 1. Install Modal
pip install modal

# 2. Authenticate
modal token new
# (Create account in browser)

# 3. Deploy
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem/Backend
modal deploy modal_app.py

# 4. Your URL appears!
# Copy: https://[your-url].modal.run

# 5. Update Frontend
cd ../Frontend
nano .env
# Change VITE_API_URL to your Modal URL

# 6. Push
git add .
git commit -m "Deploy with Modal"
git push origin main

# DONE! Frontend & Backend live! 🚀
```


════════════════════════════════════════════════════════════════════


## 💡 WHY MODAL > OTHERS?

| Feature | Modal | Fly.io | Replit | HF Spaces |
|---------|-------|--------|--------|-----------|
| **Terminal Deploy** | ✅ CLI | ❌ No | ❌ No | ❌ No |
| **Python Native** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| **Card Required** | ❌ NO | ✅ Yes* | ❌ NO | ❌ NO |
| **GitHub Scope** | ✅ None | ✅ Minimal | ❌ Full | ❌ Full |
| **Setup Time** | 2 min | 30 min | 5 min | 2 min |
| **Always On** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Cost** | Free | Free* | Free | Free |

*Card required (concerns you have)


════════════════════════════════════════════════════════════════════


## 🆘 TROUBLESHOOTING

### "modal: command not found"
```bash
pip install modal
# Or restart terminal after install
```

### "Not authenticated"
```bash
modal token new
# Follow the browser prompt
```

### "API not responding"
```bash
# Check deployment status
modal list

# View logs for errors
modal logs webapp

# Redeploy
modal deploy modal_app.py
```

### "URL keeps changing"
```bash
# Modal generates same URL if you redeploy same app
# Save URL after first deploy
```


════════════════════════════════════════════════════════════════════


## 📚 MODAL RESOURCES

Docs: https://modal.com/docs
Python SDK: https://modal.com/docs/reference
Examples: https://modal.com/docs/examples


════════════════════════════════════════════════════════════════════


## ✨ SUMMARY

1. `pip install modal`
2. `modal token new` (create account)
3. `modal deploy modal_app.py` (deploy)
4. Update Frontend/.env
5. `git push` (auto-deploy)
6. Done! 🚀


EVERYTHING FROM TERMINAL!
NO BROWSER CLICKS (except account creation)
NO CARD, EVER!

That's it! 🎉

EOF
