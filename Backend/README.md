# 🚀 Movie Recommendation System - Production Setup

## ✅ Architecture

```
Frontend:  Vercel         https://[your-name].vercel.app
Backend:   Modal Labs     https://baasilrazriz--movie-rec-server-flask-asgi.modal.run
Database:  CSV (Local)    Included in Backend/
```

**Cost:** $0/month forever! 💰

---

## 🔐 SECURITY

### ⚠️ Important: Never commit `.env` files!

**What NOT to commit:**
- `Frontend/.env` (contains API URLs)
- `Backend/.env` (contains secrets)
- `.modal.toml` (auth token)

**What TO commit:**
- `.env.example` files (templates only)
- `.gitignore` (protection rules)

---

## 🚀 DEPLOYMENT GUIDE

### Backend (Modal Labs)

#### 1. Authenticate
```bash
python3 -m modal token new
# Creates free account, no card required
```

#### 2. Deploy
```bash
cd Backend
python3 -m modal deploy modal_app.py
# Returns: https://[username]--movie-rec-server-flask-asgi.modal.run
```

#### 3. View Logs
```bash
python3 -m modal logs
```

### Frontend (Vercel)

#### 1. Copy `.env.example` to `.env.local`
```bash
cd Frontend
cp .env.example .env.local

# Edit .env.local and add your Modal URL:
VITE_API_URL=https://baasilrazriz--movie-rec-server-flask-asgi.modal.run
```

#### 2. Deploy to Vercel
```bash
git add -A
git commit -m "Deploy to production"
git push origin main

# Vercel auto-deploys! ✨
```

---

## 📁 Project Structure

```
MovieRecommendationSystem/
├── Frontend/                 (React + Tailwind)
│   ├── src/
│   ├── .env.example         ✅ Template (commit this)
│   ├── package.json
│   └── vercel.json
│
├── Backend/                 (Python Flask)
│   ├── api/                 (Core API)
│   │   ├── __init__.py      (Flask app)
│   │   ├── utils/
│   │   └── routes...
│   ├── modal_app.py         ✅ Deployment config
│   ├── app.py               (Flask runner)
│   ├── requirements.txt      (Dependencies)
│   ├── .env.example         ✅ Template (commit this)
│   ├── *.csv                (Data files)
│   └── MODAL_COMPLETE_GUIDE.md
│
├── .git/                    (Git repository)
├── .gitignore               ✅ Protects secrets
└── README.md
```

---

## 🔐 Environment Variables

### Frontend (`Frontend/.env.local`)
```bash
VITE_API_URL=https://baasilrazriz--movie-rec-server-flask-asgi.modal.run
VITE_ENVIRONMENT=production
VITE_DEBUG=false
```

### Backend (`Backend/.env`)
```bash
SECRET_KEY=your-random-secret-key
ENVIRONMENT=production
DEBUG=False
```

---

## 📋 Files in Backend/

**Core Logic:**
- `api/` - Flask API code
- `app.py` - Flask app entry point
- `*.csv` - Movie data

**Deployment:**
- `modal_app.py` - Modal configuration (**KEEP THIS**)
- `requirements.txt` - Python dependencies

**Documentation:**
- `MODAL_COMPLETE_GUIDE.md` - Detailed deployment guide
- `FINAL_SOLUTION.md` - Quick summary

**Configuration:**
- `.env.example` - Template for `.env`

---

## ✅ DEPLOYMENT CHECKLIST

### First Time Setup
- [ ] Run `python3 -m modal token new`
- [ ] Run `python3 -m modal deploy Backend/modal_app.py`
- [ ] Copy your Modal URL
- [ ] Create `Frontend/.env.local` with API URL
- [ ] Test locally: `npm run dev`

### Before Pushing to Git
- [ ] Verify `.env` files NOT staged
- [ ] Check `.gitignore` has `*.env`
- [ ] Only `.env.example` is committed
- [ ] Run `git status` to verify

### Deploy to Production
- [ ] Test locally and ensure works
- [ ] `git push origin main`
- [ ] Vercel auto-deploys frontend
- [ ] Test live app

---

## 🆘 TROUBLESHOOTING

### Backend won't deploy
```bash
# Check logs
python3 -m modal logs

# Redeploy
python3 -m modal deploy Backend/modal_app.py
```

### Can't reach from frontend
```bash
# Verify API URL
echo $VITE_API_URL

# Test backend directly
curl https://baasilrazriz--movie-rec-server-flask-asgi.modal.run/health
```

### `.env` got committed by mistake
```bash
# Remove from git history
git rm --cached Frontend/.env Backend/.env .modal.toml
git commit -m "Remove .env files"
git push origin main
```

---

## 📊 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Frontend | Free | Always-on |
| Modal Labs Backend | Free | $5/mo credit (no charge for hobby) |
| GitHub Storage | Free | Unlimited |
| **Total** | **$0/month** | Forever! |

---

## 🎯 Next Steps

1. **Deploy backend:**
   ```bash
   python3 -m modal deploy Backend/modal_app.py
   ```

2. **Update Frontend:**
   ```bash
   cd Frontend
   cp .env.example .env.local
   # Edit .env.local with Modal URL
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Deploy to production:**
   ```bash
   git push origin main
   ```

---

## 📚 Documentation

- `MODAL_COMPLETE_GUIDE.md` - Detailed Modal setup guide
- `FINAL_SOLUTION.md` - Quick deployment summary
- `MODAL_QUICKSTART.sh` - Terminal quick reference

---

## ✨ You're Done!

Your app is now:
- ✅ Live on Vercel (auto-deploy)
- ✅ Live on Modal (terminal deploy)  
- ✅ Secure (no secrets in git)
- ✅ Scalable (free, always-on)
- ✅ Production-ready! 🚀

