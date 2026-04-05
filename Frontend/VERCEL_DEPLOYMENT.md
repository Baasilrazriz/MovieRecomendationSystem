# 🚀 Deploy Frontend to Vercel

## Quick Setup (5 minutes)

### Step 1: Ensure GitHub has latest code
```bash
cd /Users/baasilrazriz/Desktop/personal/MovieRecomendationSystem
git add Frontend/vercel.json
git commit -m "Add Vercel configuration"
git push origin main
```

### Step 2: Deploy to Vercel with Custom Domain

1. Go to: https://vercel.com
2. Click "New Project"
3. Select your GitHub repository: `MovieRecommendationSystem`
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` ✅ (auto-detected)
   - **Output Directory:** `dist` ✅ (auto-detected)
   - **Root Directory:** `Frontend` ← **IMPORTANT!**

5. Click "Deploy"

### Step 3: Set Environment Variables

After deployment, in Vercel Dashboard:

1. Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL = https://baasilrazriz--movie-rec-server-flask-asgi.modal.run
   VITE_ENVIRONMENT = production
   VITE_DEBUG = false
   VITE_API_TIMEOUT = 15000
   ```
3. Click "Save"
4. Re-deploy (Deployments → Redeploy)

### Step 4: Set Custom Domain

In Vercel Dashboard:

1. Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `basflix.vercel.app`
4. Click "Add"
5. Done! Your site is live at: **https://basflix.vercel.app**

---

## Verification

```bash
# Test frontend is live
curl https://basflix.vercel.app

# Test API connection
curl https://basflix.vercel.app/health  
# (if no errors, frontend is connecting to Modal backend!)
```

---

## If Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from Frontend folder
cd Frontend
vercel --prod

# Follow prompts
# Select your GitHub repo
# Configure as above
# Link to custom domain: basflix.vercel.app
```

---

## Your Final URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://basflix.vercel.app |
| **Backend** | https://baasilrazriz--movie-rec-server-flask-asgi.modal.run |
| **GitHub** | Your repository |

---

## ✅ Deployment Complete!

Your app is now:
- ✅ Frontend live on Vercel
- ✅ Backend live on Modal
- ✅ Using custom domain basflix.vercel.app
- ✅ Auto-deploys on GitHub push
- ✅ $0/month forever!

Test it: Visit https://basflix.vercel.app and try searching for movies! 🎉
