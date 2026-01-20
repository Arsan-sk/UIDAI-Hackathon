# 🚀 UIDAI Insights Hub - Vercel Deployment Guide

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup) (free tier works)
- [Git](https://git-scm.com/) installed
- GitHub repository (already set up: `Arsan-sk/UIDAI-Hackathon`)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for command-line deployment)

---

## 🏗️ Project Structure (Vercel-Ready)

```
UIDAI-Hackathon/
├── vercel.json              ✅ Vercel configuration (root-level)
├── .gitignore               ✅ Updated with .vercel
├── frontend/                📁 React application
│   ├── .env.example         ✅ Environment variables template
│   ├── package.json         ✅ Build scripts configured
│   ├── public/
│   ├── src/
│   └── build/               (generated on deployment)
├── data_processing/         📁 Python scripts (not deployed)
└── api_data_*/              📁 CSV data (ignored in deployment)
```

---

## 🌐 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Your Code to GitHub

```powershell
# Already done! Your code is at:
# https://github.com/Arsan-sk/UIDAI-Hackathon
```

### Step 2: Import Project to Vercel

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import Git Repository**: 
   - Select `Arsan-sk/UIDAI-Hackathon`
4. **Configure Project**:
   - **Framework Preset**: `Create React App` (auto-detected)
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: Auto-detected from `vercel.json`
   - **Output Directory**: `frontend/build`
5. **Environment Variables**: (Optional)
   - Add any from `frontend/.env.example` if needed
6. **Click**: `Deploy`

### Step 3: Wait for Deployment

- Vercel will:
  1. Clone your repository
  2. Run `npm install` in the frontend folder
  3. Run `npm run build`
  4. Deploy the `frontend/build` folder
- **Deployment time**: ~2-3 minutes

### Step 4: Access Your Live App

- **Production URL**: `https://uidai-hackathon-<hash>.vercel.app`
- **Custom Domain**: Can be configured in Vercel dashboard

---

## 💻 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Login to Vercel

```powershell
vercel login
```

### Step 3: Deploy from Root Directory

```powershell
cd D:\Hackathons\UIDAI-Hackathon
vercel
```

**Follow the prompts**:
- Set up and deploy? `Y`
- Which scope? (Select your account)
- Link to existing project? `N` (first time) or `Y` (subsequent)
- What's your project's name? `uidai-insights-hub`
- In which directory is your code located? `./`

### Step 4: Deploy to Production

```powershell
# For production deployment
vercel --prod
```

---

## ⚙️ Configuration Files Explained

### 1. `vercel.json` (Root Level)

```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/build/index.html"
    }
  ]
}
```

**Purpose**: 
- Tells Vercel where to find the React app
- Configures build process
- Sets up SPA routing (all routes → index.html)

### 2. `frontend/package.json`

**Build script**:
```json
"scripts": {
  "build": "react-scripts build"
}
```

### 3. `frontend/.env.example`

**Template for environment variables**. For Vercel:
1. Go to Project Settings → Environment Variables
2. Add variables from `.env.example`
3. Redeploy to apply changes

---

## 🔧 Troubleshooting Common Issues

### Issue 1: Build Fails - "Module not found"

**Solution**:
```powershell
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

Then redeploy.

### Issue 2: Routes Return 404

**Solution**: Check `vercel.json` has proper routing configuration:
```json
"routes": [
  {
    "src": "/(.*)",
    "dest": "/frontend/build/index.html"
  }
]
```

### Issue 3: Build Timeout

**Solution**: 
- Free tier has 10-minute build limit
- Your build should complete in ~2 minutes
- If stuck, check for circular dependencies

### Issue 4: Environment Variables Not Working

**Solution**:
- Prefix with `REACT_APP_` (e.g., `REACT_APP_API_URL`)
- Add in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding

---

## 📊 Deployment Checklist

Before deploying, ensure:

- [x] All files committed and pushed to GitHub
- [x] `vercel.json` exists in root directory
- [x] `frontend/package.json` has `build` script
- [x] No sensitive data in code (use environment variables)
- [x] `.gitignore` includes `.vercel`, `build/`, `node_modules/`
- [x] All imports are correct (no broken paths)
- [x] Build succeeds locally: `cd frontend && npm run build`

---

## 🌍 Post-Deployment Steps

### 1. Test Your Deployed App

Visit all routes:
- Landing: `https://your-app.vercel.app/`
- Research: `https://your-app.vercel.app/research`
- Policymaker: `https://your-app.vercel.app/policymaker`
- Tech: `https://your-app.vercel.app/tech`

### 2. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain (e.g., `uidai-insights.com`)
3. Follow DNS configuration instructions

### 3. Enable Analytics (Optional)

1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable Vercel Analytics
3. View real-time visitor data

### 4. Set Up Preview Deployments

- Every push to `main` → Production deployment
- Every PR → Preview deployment with unique URL
- Configure in: Settings → Git → Production Branch

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes locally
git add .
git commit -m "feat: Add new feature"
git push origin main
```

**Result**: Vercel detects push → Builds → Deploys automatically

### Manual Redeploy

If you need to redeploy without code changes:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Find latest deployment → Click "..." → Redeploy

---

## 📱 Monitoring & Performance

### View Deployment Logs

1. Vercel Dashboard → Your Project → Deployments
2. Click on a deployment
3. View **Build Logs** and **Function Logs**

### Performance Metrics

- **Lighthouse Score**: Vercel runs automatically
- **Analytics**: Real-time visitor data
- **Vitals**: Core Web Vitals monitoring

---

## 🎯 Quick Deploy Commands

```powershell
# One-time setup
cd D:\Hackathons\UIDAI-Hackathon
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## 📂 What Gets Deployed vs Ignored

### ✅ Deployed to Vercel:
- `frontend/src/` (React source code)
- `frontend/public/` (Static assets)
- `frontend/package.json` (Dependencies)
- `vercel.json` (Configuration)

### ❌ Ignored (Not Deployed):
- `node_modules/` (Installed on Vercel)
- `data_processing/` (Python scripts)
- `api_data_*/` (CSV files)
- `.venv/` (Python virtual environment)
- `PRP.md` (Documentation)
- `.env.local` (Local environment)

---

## 🚨 Important Notes

1. **Build Time**: Free tier = 100 hours/month (more than enough)
2. **Bandwidth**: Free tier = 100 GB/month
3. **Deployments**: Unlimited
4. **Custom Domains**: 1 per project on free tier
5. **HTTPS**: Automatic SSL certificate
6. **Serverless Functions**: Not used in this project (pure frontend)

---

## 🎉 Success Metrics

After deployment, you should see:

✅ **Build**: Completed in ~2 minutes  
✅ **Status**: Ready  
✅ **Production URL**: Active and accessible  
✅ **All Routes**: Working (/, /research, /policymaker, /tech)  
✅ **Charts**: Rendering correctly  
✅ **Data**: Loading from dataService.js  

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **React Deployment**: https://create-react-app.dev/docs/deployment/#vercel
- **GitHub Integration**: https://vercel.com/docs/git

---

## 🎓 Example Deployment Flow

```powershell
# Terminal 1: Ensure code is ready
cd D:\Hackathons\UIDAI-Hackathon
git status
git push origin main

# Terminal 2: Deploy via CLI (optional)
vercel --prod

# OR use Vercel Dashboard (recommended for first deployment)
```

**Expected Output**:
```
🔗  Preview: https://uidai-hackathon-preview.vercel.app
✅  Production: https://uidai-hackathon.vercel.app
```

---

## ✨ Your App is Now Live!

**GitHub Repository**: https://github.com/Arsan-sk/UIDAI-Hackathon  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Production URL**: (Will be provided after deployment)

---

**Need Help?** 
- Check deployment logs in Vercel Dashboard
- Review build output for errors
- Ensure `npm run build` works locally first

**Happy Deploying! 🚀**
