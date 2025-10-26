# Nerdio TCO Calculator Suite

A comprehensive Total Cost of Ownership (TCO) calculator for Azure Virtual Desktop with Nerdio Manager. Built with Next.js 14, React, TypeScript, and Tailwind CSS with Nerdio's brand colors.

## 🎨 Features

- **TCO Calculator**: Full-featured calculator with scenario selection, workload mix, and cost analysis
- **Migration Timeline**: Visual timeline with phases, milestones, and ROI projections
- **Sensitivity Analysis**: Test assumptions with best/worst case scenarios and risk assessment
- **Customer Benchmarks**: Real customer case studies and industry comparisons
- **Strategic Value**: Quantify business agility, risk mitigation, and innovation beyond hard costs
- **Industry Templates**: Pre-configured scenarios for 8+ industries
- **PDF Report Generator**: Professional reports ready for stakeholders

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🎨 Nerdio Branding

The application uses Nerdio's official brand colors:

- **Primary (Teal)**: `#20B2AA`
- **Secondary (Yellow/Lime)**: `#B8E631`

These are configured in `tailwind.config.js` with full color palettes (50-900 shades).

## 📁 Project Structure

```
nerdio-tco-app/
├── app/
│   ├── calculator/       # Main TCO calculator
│   ├── timeline/         # Migration timeline & ROI
│   ├── sensitivity/      # Sensitivity analysis
│   ├── benchmarks/       # Customer case studies
│   ├── strategic-value/  # Strategic value dashboard
│   ├── templates/        # Industry templates
│   ├── report/           # PDF report generator
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   └── AppLayout.tsx     # Main navigation layout
├── contexts/
│   └── TCOContext.tsx    # Shared state management
└── public/               # Static assets
```

## 🔧 Key Technologies

- **Next.js 14**: App Router for modern React development
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with Nerdio brand colors
- **Recharts**: Interactive charts and visualizations
- **Lucide React**: Beautiful icon library
- **Context API**: Shared state management across all pages

## 💡 Usage

### 1. Start with Calculator

Navigate to the Calculator page and input:
- Scenario (On-Prem, Citrix, or Native AVD)
- Organization profile (industry, users, etc.)
- Workload distribution
- Current costs
- Azure configuration

### 2. Explore Analysis

- **Timeline**: See migration phases and break-even analysis
- **Sensitivity**: Test assumptions and risk scenarios
- **Benchmarks**: Compare with similar organizations
- **Strategic Value**: Quantify non-financial benefits

### 3. Generate Report

Visit the Report page to create a professional PDF for stakeholders.

### 4. Use Templates (Optional)

Start fast with pre-configured industry templates for Financial Services, Healthcare, Manufacturing, Technology, Education, Government, Retail, and MSPs.

## 🎯 State Management

The application uses React Context (`TCOContext`) to share data across all pages:

```typescript
// All calculator inputs and calculations are available via:
const { 
  scenario, 
  namedUsers, 
  calculations,
  setScenario,
  // ... and more
} = useTCO();
```

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to adjust the color scheme:

```javascript
colors: {
  nerdio: {
    teal: {
      500: '#20B2AA', // Primary
      // ... other shades
    },
    yellow: {
      500: '#B8E631', // Secondary
      // ... other shades
    }
  }
}
```

### Add New Industry

Edit `contexts/TCOContext.tsx` and add to the Industry type, then add templates in `app/templates/page.tsx`.

## 📊 Calculations

The TCO calculator uses industry-validated formulas:

- **Auto-scaling savings**: 65% infrastructure cost reduction
- **Personnel reduction**: 40-65% depending on scenario
- **Azure discounts**: 0-40% based on pricing model
- **Break-even**: Migration cost / monthly savings

All calculations are in `contexts/TCOContext.tsx`.

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Any Node.js hosting

## 📝 License

© 2025 Nerdio. All rights reserved.

## 🤝 Support

For questions or support, visit [getnerdio.com](https://getnerdio.com)

---

Built with ❤️ for Nerdio Value Engineering
