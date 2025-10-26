# 🚀 Deployment Instructions

## One-Command Deployment

After extracting the archive, run this single command:

```bash
./deploy.sh
```

## What It Does

The script automatically handles:

1. **✓ Install Dependencies** - Runs `npm install`
2. **✓ Test Locally** - Starts dev server for testing (optional)
3. **✓ Push to GitHub** - Creates/updates repo on github.com/irfansaas
4. **✓ Deploy to Vercel** - Deploys to production

## Prerequisites

Make sure you have:
- ✓ Node.js 18+ installed
- ✓ GitHub CLI (`gh`) installed and logged in
- ✓ Vercel CLI installed and logged in

### Check Your Setup

```bash
# Check Node.js
node --version  # Should be 18+

# Check GitHub CLI
gh auth status  # Should show: irfansaas

# Check Vercel CLI
vercel whoami   # Should show your Vercel username
```

### If Not Logged In

**GitHub:**
```bash
gh auth login
# Select: GitHub.com
# Select: HTTPS
# Follow the prompts
```

**Vercel:**
```bash
vercel login
# Follow the prompts
```

## Step-by-Step Guide

### 1. Extract and Navigate

```bash
tar -xzf nerdio-tco-calculator.tar.gz
cd nerdio-tco-app
```

### 2. Run Deployment Script

```bash
./deploy.sh
```

### 3. Follow Interactive Prompts

The script will ask you:
- **Test locally?** (Y/n) - Press Enter to test, or 'n' to skip
  - If yes, test the app then press Ctrl+C to continue
- **Repository name?** - Press Enter for default "nerdio-tco-calculator"
- **Make private?** (Y/n) - Press Enter for private repo

### 4. Done!

The script will output:
- ✓ GitHub repository URL
- ✓ Live Vercel deployment URL

## Manual Deployment (Alternative)

If you prefer to run commands manually:

```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev
# Visit http://localhost:3000
# Press Ctrl+C when done

# 3. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create nerdio-tco-calculator --private --source=. --remote=origin --push

# 4. Deploy to Vercel
vercel --prod
```

## Troubleshooting

### "command not found: gh"

Install GitHub CLI:
```bash
# WSL/Ubuntu
sudo apt update
sudo apt install gh

# Or download from: https://cli.github.com/
```

### "command not found: vercel"

Install Vercel CLI:
```bash
npm install -g vercel
```

### "Not logged in"

For GitHub:
```bash
gh auth login
```

For Vercel:
```bash
vercel login
```

### Port 3000 already in use

Kill the process or use a different port:
```bash
npm run dev -- -p 3001
```

### Git repository already exists

If you've run this before, the script will ask if you want to push to the existing repo. Say 'y' to update it.

## Post-Deployment

After successful deployment:

1. **Visit the Vercel URL** to verify the app works
2. **Share the URL** with your team
3. **Set up custom domain** (optional) in Vercel dashboard
4. **Enable analytics** (optional) in Vercel dashboard

## Quick Reference

```bash
# Full deployment (recommended)
./deploy.sh

# Just install dependencies
npm install

# Just test locally
npm run dev

# Just deploy to Vercel
vercel --prod

# View Vercel deployments
vercel ls

# View GitHub repos
gh repo list
```

## Environment Variables (if needed later)

The app doesn't require any environment variables to run. If you need to add them later:

1. Go to Vercel dashboard
2. Select your project
3. Settings → Environment Variables
4. Add variables and redeploy

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub CLI Docs**: https://cli.github.com/manual/

---

**Ready to deploy!** 🚀
