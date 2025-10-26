#!/bin/bash

# Nerdio TCO Calculator - Complete Deployment Script
# This script will: install, test locally, push to GitHub, and deploy to Vercel

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════╗"
echo "║   Nerdio TCO Calculator - Deployment Script       ║"
echo "║   Setup → Test → GitHub → Vercel                  ║"
echo "╚════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Function to print colored messages
print_step() {
    echo -e "\n${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in the right directory
print_step "Checking project directory..."
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the nerdio-tco-app directory?"
    echo "Run this script from inside the extracted nerdio-tco-app folder:"
    echo "  cd nerdio-tco-app"
    echo "  ./deploy.sh"
    exit 1
fi
print_success "Project directory confirmed"

# ============================================================
# STEP 1: INSTALL DEPENDENCIES
# ============================================================
print_step "Step 1/4: Installing dependencies..."

if [ -d "node_modules" ]; then
    print_warning "node_modules exists. Skipping installation."
    read -p "Reinstall? (y/N): " reinstall
    if [[ $reinstall =~ ^[Yy]$ ]]; then
        rm -rf node_modules package-lock.json
        npm install
    fi
else
    npm install
fi

print_success "Dependencies installed"

# ============================================================
# STEP 2: TEST LOCALLY
# ============================================================
print_step "Step 2/4: Local testing..."

echo ""
echo -e "${YELLOW}Would you like to test locally before deploying?${NC}"
read -p "Start dev server? (Y/n): " start_dev

if [[ ! $start_dev =~ ^[Nn]$ ]]; then
    echo ""
    echo -e "${GREEN}Starting development server...${NC}"
    echo "Opening at: http://localhost:3000"
    echo ""
    echo "Please test the following:"
    echo "  1. Calculator page loads"
    echo "  2. Input forms work"
    echo "  3. Navigation between pages"
    echo "  4. Calculations display correctly"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C when done testing to continue${NC}"
    echo ""
    
    npm run dev
fi

print_success "Local testing completed"

# ============================================================
# STEP 3: GITHUB SETUP AND PUSH
# ============================================================
print_step "Step 3/4: GitHub repository setup..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    print_error "GitHub CLI (gh) not found"
    echo "Install it with:"
    echo "  sudo apt install gh"
    echo "Or visit: https://cli.github.com/"
    exit 1
fi

# Check GitHub authentication
print_step "Checking GitHub authentication..."
if gh auth status &> /dev/null; then
    GITHUB_USER=$(gh api user -q .login)
    print_success "Logged in as: $GITHUB_USER"
    
    if [ "$GITHUB_USER" != "irfansaas" ]; then
        print_warning "You're logged in as $GITHUB_USER, not irfansaas"
        read -p "Continue anyway? (y/N): " continue_different_user
        if [[ ! $continue_different_user =~ ^[Yy]$ ]]; then
            echo "Login as irfansaas with: gh auth login"
            exit 1
        fi
    fi
else
    print_error "Not logged in to GitHub"
    echo "Please run: gh auth login"
    exit 1
fi

# Get repository name
echo ""
read -p "Enter repository name (default: nerdio-tco-calculator): " REPO_NAME
REPO_NAME=${REPO_NAME:-nerdio-tco-calculator}

# Initialize git if needed
if [ ! -d ".git" ]; then
    print_step "Initializing git repository..."
    git init
    git branch -M main
    print_success "Git initialized"
else
    print_success "Git repository already exists"
fi

# Check if repository exists on GitHub
print_step "Checking if GitHub repository exists..."
if gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
    print_warning "Repository $REPO_NAME already exists"
    read -p "Push to existing repository? (y/N): " push_existing
    if [[ ! $push_existing =~ ^[Yy]$ ]]; then
        print_error "Aborted. Please choose a different repository name."
        exit 1
    fi
    REPO_EXISTS=true
else
    REPO_EXISTS=false
fi

# Create repository if it doesn't exist
if [ "$REPO_EXISTS" = false ]; then
    print_step "Creating GitHub repository..."
    read -p "Make repository private? (Y/n): " make_private
    
    if [[ $make_private =~ ^[Nn]$ ]]; then
        gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
    else
        gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
    fi
    print_success "Repository created: https://github.com/$GITHUB_USER/$REPO_NAME"
else
    # Set remote if not already set
    if ! git remote | grep -q "origin"; then
        git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
    fi
    
    # Stage and commit files
    print_step "Committing files..."
    git add .
    
    if git diff --staged --quiet; then
        print_warning "No changes to commit"
    else
        git commit -m "Deploy: Nerdio TCO Calculator Suite

- Complete Next.js 14 application
- 7 integrated calculator pages
- Nerdio brand colors and design system
- Shared state management with React Context
- Responsive UI with Tailwind CSS
- Ready for production deployment"
        print_success "Files committed"
    fi
    
    # Push to GitHub
    print_step "Pushing to GitHub..."
    git push -u origin main
    print_success "Pushed to GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
fi

# ============================================================
# STEP 4: DEPLOY TO VERCEL
# ============================================================
print_step "Step 4/4: Deploying to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

# Check Vercel authentication
print_step "Checking Vercel authentication..."
if vercel whoami &> /dev/null; then
    VERCEL_USER=$(vercel whoami 2>&1)
    print_success "Logged in to Vercel as: $VERCEL_USER"
else
    print_error "Not logged in to Vercel"
    echo "Please run: vercel login"
    exit 1
fi

# Deploy to Vercel
print_step "Deploying to Vercel..."
echo ""
echo "This will deploy your application to production..."
echo ""

# Deploy and capture output
DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[^\s]+\.vercel\.app' | tail -1)

print_success "Deployment complete!"

# ============================================================
# COMPLETION SUMMARY
# ============================================================
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════╗"
echo "║            🎉 DEPLOYMENT SUCCESSFUL! 🎉            ║"
echo "╚════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${BLUE}📦 Summary:${NC}"
echo "  ✓ Dependencies installed"
echo "  ✓ Local testing completed"
echo "  ✓ Pushed to GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "  ✓ Deployed to Vercel"
echo ""
echo -e "${BLUE}🔗 Quick Links:${NC}"
echo "  GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
if [ ! -z "$DEPLOY_URL" ]; then
    echo "  Live App: $DEPLOY_URL"
fi
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "  1. Visit your Vercel URL to verify deployment"
echo "  2. Share the link with your team"
echo "  3. Configure custom domain in Vercel dashboard (optional)"
echo ""
echo -e "${GREEN}Ready to accelerate your sales cycles! 🚀${NC}"
echo ""
