# Recce - Social Content Discovery Platform

A Next.js application with Strapi headless CMS integration for AWS Amplify deployment.

## Overview

Recce is a social content discovery platform that helps movie and TV lovers discover recommendations through their trusted network, share authentic reviews, and earn rewards for quality contributions.

## Features

- **Social Reviews**: Share honest reviews and ratings with your network
- **Trusted Network**: Build connections with like-minded entertainment enthusiasts
- **Reward System**: Earn rewards for quality reviews and community contributions
- **Smart Discovery**: AI-powered recommendations based on trusted circles
- **Personalized Watchlist**: Organize and manage your must-watch list
- **Dark Theme**: Modern dark UI optimized for evening viewing

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript and React 19
- **Styling**: Tailwind CSS 4 with custom properties
- **CMS**: Strapi (headless CMS integration ready)
- **Deployment**: AWS Amplify
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ismaeel06/recce_site_new.git
cd recce_site_new
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with theme
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles with CSS variables
│   └── [pages]/           # Other page routes
├── components/
│   ├── layout/            # Header, Footer components
│   ├── home/              # Home page sections
│   ├── blog/              # Blog components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript type definitions
```

## Key Pages

- **Home** (`/`) - Landing page with hero, features, blog posts, and CTA sections
- **Why Recce** (`/why-recce`) - Value proposition
- **How it Works** (`/how-it-works`) - Product walkthrough
- **Rewards** (`/rewards`) - Rewards program details
- **Gossip** (`/gossip`) - Blog section
- **Partners** (`/partners`) - Partnership opportunities
- **Benefits** (`/benefits`) - User benefits
- **Team** (`/team`) - Team information
- **Help** (`/help`) - Help and support

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Components

### Reusable Components
- `FeatureCard` - Feature showcase cards with image overlay
- `BlogCard` - Blog post cards with image and metadata
- `Header` - Navigation with mobile menu support
- `Footer` - Full-width footer with responsive layout

### Page Sections
- `HeroSection` - Hero banner with background image
- `FeaturesSection` - 6-card grid (desktop) / swipeable carousel (mobile)
- `RecentBlogsSection` - Blog posts grid (desktop) / carousel (mobile)
- `CTASection` - Call-to-action with download buttons and newsletter signup

## Responsive Design

- Mobile-first approach
- Breakpoints: `md` (768px), `lg` (1024px)
- Touch-friendly carousel navigation with swipe support
- Optimized layouts for all screen sizes

## Dark Theme

CSS custom properties for consistent theming:
- Background: `#111827`
- Foreground: `#f9fafb`
- Accent: Orange (`#f97316`)

## AWS Amplify Deployment

Configured with `amplify.yml` for automated CI/CD deployment.

## License

Proprietary - All rights reserved
