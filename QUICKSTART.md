# 🚀 Nerdio TCO Calculator - Quick Start Guide

## What You've Got

A complete Next.js application with:
- ✅ 7 integrated calculator pages
- ✅ Nerdio brand colors (Teal #20B2AA & Yellow #B8E631)
- ✅ Shared state management
- ✅ Responsive design
- ✅ Professional UI/UX

## Installation (5 minutes)

### Option 1: Automated Setup (Recommended)

```bash
# Extract the archive
tar -xzf nerdio-tco-calculator.tar.gz
cd nerdio-tco-app

# Run the setup script
./setup.sh

# Start the app
npm run dev
```

### Option 2: Manual Setup

```bash
# Extract the archive
tar -xzf nerdio-tco-calculator.tar.gz
cd nerdio-tco-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000)

## 📱 Application Structure

### Pages Overview

1. **Home (/)**: Overview dashboard with quick stats and navigation
2. **Calculator (/calculator)**: Main TCO input forms and configuration
3. **Timeline (/timeline)**: Migration phases and ROI visualization
4. **Sensitivity (/sensitivity)**: Risk analysis and assumption testing
5. **Benchmarks (/benchmarks)**: Customer case studies and comparisons
6. **Strategic Value (/strategic-value)**: Business value beyond costs
7. **Templates (/templates)**: Pre-configured industry scenarios
8. **Report (/report)**: Professional PDF-ready reports

### Key Features

**Shared State Management**
All inputs and calculations sync across pages automatically using React Context.

**Industry Templates**
Quick-start with pre-configured scenarios for:
- Financial Services
- Healthcare
- Manufacturing
- Technology
- Education
- Government
- Retail
- MSP

**Professional Branding**
- Nerdio teal/cyan (#20B2AA) primary color
- Yellow/lime (#B8E631) secondary color
- Custom component classes (btn-primary, card, badge, etc.)
- Smooth animations and transitions

## 🎯 Usage Flow

### Recommended User Journey

1. **Start at Home**: Review the overview and quick stats
2. **Configure Calculator**: Input organization details and costs
3. **Review Timeline**: See migration phases and ROI
4. **Check Benchmarks**: Compare with similar organizations
5. **Analyze Sensitivity**: Test assumptions and risks
6. **View Strategic Value**: Quantify business benefits
7. **Generate Report**: Create stakeholder-ready PDF

### Or Use Templates

1. Go to Templates page
2. Select your industry
3. Click "Use This Template"
4. Customize as needed
5. Generate report

## 🔧 Customization

### Update Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  nerdio: {
    teal: {
      500: '#YOUR_COLOR',
    },
    yellow: {
      500: '#YOUR_COLOR',
    }
  }
}
```

### Add Industry

1. Edit `contexts/TCOContext.tsx` - add to Industry type
2. Edit `app/templates/page.tsx` - add template configuration
3. Update benchmarks in `app/benchmarks/page.tsx`

### Modify Calculations

All TCO calculations are in `contexts/TCOContext.tsx`:
- Auto-scaling: 65% savings
- Personnel reduction: 40-65%
- Azure discounts: 0-40%
- Migration costs: $45-85/user

## 📊 Default Assumptions

- **Auto-scaling efficiency**: 65% infrastructure cost reduction
- **Personnel reduction**: 55% for typical scenarios
- **Azure EA discount**: 40% for enterprise agreements
- **M365 E3/E5**: AVD rights included (saves $15/user/month)
- **Nerdio licensing**: $6.50/user/month
- **Break-even**: Typically 3-12 months

## 🚢 Deployment

### Vercel (Easiest)

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

None required! The app runs entirely client-side.

## 🎨 Key Components

### TCO Context (`contexts/TCOContext.tsx`)
Provides:
- All calculator inputs (scenario, users, costs, etc.)
- Calculated results (savings, ROI, break-even)
- Setter functions for updates

### App Layout (`components/AppLayout.tsx`)
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- Nerdio-branded header

### Global Styles (`app/globals.css`)
Pre-built classes:
- `.btn-primary` - Teal button
- `.btn-secondary` - Yellow button
- `.card` - White card with shadow
- `.badge` - Small label badges
- `.stat-card` - Metric display cards

## 💡 Tips

1. **State Persistence**: All inputs persist across page navigation
2. **Print Reports**: Use browser print or "Save as PDF" on Report page
3. **Responsive Design**: Works on desktop, tablet, and mobile
4. **No Backend**: Runs entirely in the browser (easy deployment)

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
Make sure Node.js is 18+ and dependencies are installed.

## 📚 Next Steps

1. ✅ Get it running locally
2. ✅ Test with sample data
3. ✅ Customize brand colors (if needed)
4. ✅ Add/modify industry templates
5. ✅ Deploy to production
6. ✅ Share with sales team!

## 🆘 Need Help?

Check:
- README.md for detailed documentation
- Code comments in key files
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs

---

**Built for Nerdio Value Engineering**
Ready to accelerate your sales cycles! 🚀
