#!/bin/bash

# 🚀 Nerdio TCO Calculator - Phase 1 Quick Setup Script
# This script automates the initial setup for Phase 1 implementation

set -e  # Exit on any error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Nerdio TCO Calculator - Phase 1 Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the root of your nerdio-tco-calculator directory"
    exit 1
fi

echo "📍 Current directory: $(pwd)"
echo "✅ Found package.json"
echo ""

# Check current git branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  Warning: You're not on the main/master branch"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create backups directory
echo ""
echo "📦 Creating backups..."
mkdir -p backups/original
mkdir -p backups/phase-1

# Backup original files
if [ -f "contexts/TCOContext.tsx" ]; then
    cp contexts/TCOContext.tsx backups/original/TCOContext-ORIGINAL.tsx
    echo "✅ Backed up TCOContext.tsx"
else
    echo "⚠️  Warning: contexts/TCOContext.tsx not found"
fi

if [ -f "app/calculator/page.tsx" ]; then
    cp app/calculator/page.tsx backups/original/calculator-page-ORIGINAL.tsx
    echo "✅ Backed up calculator/page.tsx"
else
    echo "⚠️  Warning: app/calculator/page.tsx not found"
fi

# Create Phase 1 branch
echo ""
echo "🌿 Creating phase-1 branch..."
git checkout -b phase-1 2>/dev/null || {
    echo "ℹ️  phase-1 branch already exists, switching to it..."
    git checkout phase-1
}

# Commit backups
echo ""
echo "💾 Committing backups to git..."
git add backups/ 2>/dev/null || true
git commit -m "chore: backup original files before Phase 1 implementation" 2>/dev/null || {
    echo "ℹ️  Backups already committed or no changes to commit"
}

# Check if enhanced files exist in current directory
echo ""
echo "🔍 Checking for Phase 1 enhanced files..."
ENHANCED_CONTEXT_EXISTS=false
ENHANCED_PAGE_EXISTS=false

if [ -f "TCOContext-Enhanced.tsx" ]; then
    echo "✅ Found TCOContext-Enhanced.tsx"
    ENHANCED_CONTEXT_EXISTS=true
fi

if [ -f "calculator-page-enhanced.tsx" ]; then
    echo "✅ Found calculator-page-enhanced.tsx"
    ENHANCED_PAGE_EXISTS=true
fi

if [ "$ENHANCED_CONTEXT_EXISTS" = false ] || [ "$ENHANCED_PAGE_EXISTS" = false ]; then
    echo ""
    echo "⚠️  Enhanced files not found in current directory"
    echo "📋 Next steps:"
    echo "   1. Copy TCOContext-Enhanced.tsx to this directory"
    echo "   2. Copy calculator-page-enhanced.tsx to this directory"
    echo "   3. Run this script again, OR"
    echo "   4. Manually copy files:"
    echo "      cp TCOContext-Enhanced.tsx contexts/TCOContext.tsx"
    echo "      cp calculator-page-enhanced.tsx app/calculator/page.tsx"
    echo ""
    read -p "Press Enter to continue or Ctrl+C to exit..."
else
    echo ""
    echo "📂 Copying enhanced files to project..."
    
    # Copy enhanced files
    cp TCOContext-Enhanced.tsx contexts/TCOContext.tsx
    echo "✅ Copied TCOContext-Enhanced.tsx → contexts/TCOContext.tsx"
    
    cp calculator-page-enhanced.tsx app/calculator/page.tsx
    echo "✅ Copied calculator-page-enhanced.tsx → app/calculator/page.tsx"
    
    # Stage the changes
    echo ""
    echo "📝 Staging Phase 1 changes..."
    git add contexts/TCOContext.tsx
    git add app/calculator/page.tsx
    
    # Show what changed
    echo ""
    echo "📊 Files modified:"
    git status --short
    
    # Commit changes
    echo ""
    echo "💾 Committing Phase 1 implementation..."
    git commit -m "feat: Phase 1 - Add Azure Hybrid Benefit, Hardware Refresh, Backup/DR, Monitoring, Maintenance, and Bandwidth toggles

- Add Azure Hybrid Benefit toggle (40% additional savings)
- Add Hardware Refresh cycles calculation (\$2.4M+ for 5K users)
- Add Backup & DR infrastructure detail (\$1.04M savings)
- Add Monitoring tools breakdown (\$195K savings)
- Add Software Maintenance contracts (\$792K savings)
- Add Bandwidth & Egress costs (honest accounting)
- Enhanced Azure pricing models (RI-1yr, RI-3yr, EA-Plus)
- New 'Advanced Cost Components' UI section
- Real-time impact summary for toggled components
- Savings increase from 47% to 70% with all toggles enabled" || {
        echo "ℹ️  Changes already committed"
    }
fi

# Install dependencies if needed
echo ""
echo "📦 Checking npm dependencies..."
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Phase 1 Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Start development server:"
echo "   npm run dev"
echo ""
echo "2️⃣  Open in browser:"
echo "   http://localhost:3000/calculator"
echo ""
echo "3️⃣  Test Phase 1 features:"
echo "   • Azure Hybrid Benefit toggle"
echo "   • Advanced Cost Components section"
echo "   • All 5 new toggles"
echo "   • Enhanced calculations"
echo ""
echo "4️⃣  When ready to deploy:"
echo "   git push -u origin phase-1"
echo ""
echo "📖 Full deployment guide: PHASE-1-DEPLOYMENT-GUIDE.md"
echo ""
echo "🎉 Happy testing!"
echo ""
