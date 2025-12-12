# Recce Strapi Schema Documentation

This document describes the Strapi collections and their fields for the Recce website. This serves as a reference for content editors and developers.

---

## Table of Contents
1. [HomePage Content Collections](#homepage-content-collections)
2. [How It Works Page Collections](#how-it-works-page-collections)
3. [Blog Collections](#blog-collections)
4. [Rewards Page Collections](#rewards-page-collections)
5. [Benefits Page Collections](#benefits-page-collections)
6. [Help Page Collections](#help-page-collections)
7. [Team Page Collections](#team-page-collections)
8. [Partners Page Collections](#partners-page-collections)
9. [Why Recce Page Collections](#why-recce-page-collections)
10. [Legal Pages Collections](#legal-pages-collections)
11. [Navigation Configuration](#navigation-configuration)
12. [Field Types Reference](#field-types-reference)

---

## HomePage Content Collections

### 1. homePageHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Controls the hero section at the top of the homepage.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|​
| `heroBackgroundImage` | Media (Image) | Yes | Full-screen background image for hero section |
| `heroSubtitle` | String (Short Text) | Yes | Subtitle text (e.g., "Welcome to") |
| `heroMainTitle` | String (Short Text) | Yes | Main title (e.g., "Recce") |
| `heroSectionTitle` | String (Short Text) | Yes | Section title on left side (e.g., "Cures Content") |
| `heroSectionHighlight` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Overload") |
| `heroDescription` | String (Long Text) | Yes | Description text on right side |
| `googlePlayStoreLink` | String (Short Text) — use for full URLs (validate as URL) | Yes | Google Play Store download link |
| `appleAppStoreLink` | String (Short Text) — use for full URLs (validate as URL) | Yes | Apple App Store download link |

**Example Data:**
```json
{
  "heroBackgroundImage": "/assets/hero.webp",
  "heroSubtitle": "Welcome to",
  "heroMainTitle": "Recce",
  "heroSectionTitle": "Cures Content",
  "heroSectionHighlight": "Overload",
  "heroDescription": "Recce is the home of authentic reviews. See what your friends are watching, what they loved (or didn't), and why it's worth your time tonight.",
  "googlePlayStoreLink": "https://play.google.com/store/apps/details?id=com.recce",
  "appleAppStoreLink": "https://apps.apple.com/app/recce"
}
```

---

### 2. homePageFeaturesSection

**Collection Type:** `Single Type`  
**Purpose:** Controls the main features section and "See Recce in Action" subsection.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `sectionTitle` | String (Short Text) | Yes | Main section heading |
| `sectionDescription` | String (Long Text) | Yes | Section subheading/description |
| `sectionHighlightText` | String (Short Text) | Yes | Highlighted text in title (e.g., "Social Discovery") |
| `seeRecceInActionTitle` | String (Short Text) | Yes | Title for "See Recce in Action" subsection |
| `seeRecceInActionDescription` | String (Long Text) | Yes | Description for the action subsection |
| `seeRecceInActionImage` | Media (Image) | Yes | Main image/screenshot for action section |
| `seeRecceInActionBulletPoints` | Component (Repeatable) | Yes | Array of bullet points with icons |

**Repeatable Component: `seeRecceInActionBulletPoints`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `bulletIcon` | Media (Image) | Yes | Icon for the bullet point |
| `bulletText` | String (Short Text) | Yes | Text content of the bullet point |

**Example Data:**
```json
{
  "sectionTitle": "Everything You Need for",
  "sectionDescription": "Recce brings together movie and TV lovers...",
  "sectionHighlightText": "Social Discovery",
  "seeRecceInActionTitle": "See Recce in Action",
  "seeRecceInActionDescription": "Our intuitive interface makes it simple...",
  "seeRecceInActionImage": "/assets/Recce_Action.svg",
  "seeRecceInActionBulletPoints": [
    {
      "bulletIcon": "/assets/icons/star.svg",
      "bulletText": "Rate and review in seconds"
    },
    {
      "bulletIcon": "/assets/icons/follow.svg",
      "bulletText": "Follow friends and tastemakers"
    },
    {
      "bulletIcon": "/assets/icons/gift.svg",
      "bulletText": "Earn rewards for quality reviews"
    }
  ]
}
```

---

### 3. homePageFeatureCards

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual feature cards displayed in the features carousel/grid.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `featureIcon` | Media (Image) | Yes | Icon representing the feature |
| `featureTitle` | String (Short Text) | Yes | Feature name (e.g., "Social Reviews") |
| `featureDescription` | String (Long Text) | Yes | Detailed description of the feature |
| `featureBackgroundImage` | Media (Image) | Yes | Background image for card |
| `displayOrder` | Integer | Yes | Order in which cards appear (1, 2, 3, etc.) |

**Example Data:**
```json
{
  "featureIcon": "/assets/icons/Users.svg",
  "featureTitle": "Social Reviews",
  "featureDescription": "Share honest reviews and ratings with your friends...",
  "featureBackgroundImage": "/assets/SocialReviews.svg",
  "displayOrder": 1
}
```

**Note:** Create multiple entries of this collection for each feature card. At least 6 cards are recommended.

---

### 4. homePageCTASection

**Collection Type:** `Single Type`  
**Purpose:** Controls the Call-To-Action section at the bottom of the homepage with a central image and 4 surrounding badge icons.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `ctaMainTitle` | String (Short Text) | Yes | Main CTA heading |
| `ctaHighlightText` | String (Short Text) | Yes | Highlighted portion of the title |
| `ctaDescription` | String (Long Text) | Yes | Description text for CTA section |
| `ctaCentralImage` | Media (Image) | Yes | Central image (phone mockup or featured graphic) displayed in the middle |
| `googlePlayLink` | String (Short Text) — use for full URLs (validate as URL) | Yes | Google Play Store download link |
| `appleAppLink` | String (Short Text) — use for full URLs (validate as URL) | Yes | Apple App Store download link |
| `ctaBadges` | Component (Repeatable) | Yes | Array of 4 positioned badges (icons + text) around central image |

**Repeatable Component: `ctaBadges`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `badgeIcon` | Media (Image) | Yes | Icon for the badge |
| `badgeText` | String (Long Text) | Yes | Text content displayed with the badge icon |
| `badgePosition` | Enumeration | Yes | Position relative to central image: `topLeft`, `topRight`, `bottomLeft`, `bottomRight` |

**Enumeration Values for `badgePosition`:**
- `topLeft` — Top-left corner
- `topRight` — Top-right corner
- `bottomLeft` — Bottom-left corner
- `bottomRight` — Bottom-right corner

**Example Data:**
```json
{
  "ctaMainTitle": "Ready to Discover Your",
  "ctaHighlightText": "Next Favorite Show?",
  "ctaDescription": "Join thousands of movie and TV lovers...",
  "ctaCentralImage": "/assets/HomeCTA.svg",
  "googlePlayLink": "https://play.google.com/store/apps/details?id=com.recce",
  "appleAppLink": "https://apps.apple.com/app/recce",
  "ctaBadges": [
    {
      "badgeIcon": "/assets/icons/time.svg",
      "badgeText": "Never waste time on disappointing content again",
      "badgePosition": "topLeft"
    },
    {
      "badgeIcon": "/assets/icons/binoculor.svg",
      "badgeText": "Discover shows your friends actually love",
      "badgePosition": "topRight"
    },
    {
      "badgeIcon": "/assets/icons/flame.svg",
      "badgeText": "Build your ultimate personalized watchlist",
      "badgePosition": "bottomLeft"
    },
    {
      "badgeIcon": "/assets/icons/ctagift.svg",
      "badgeText": "Get rewarded for sharing honest reviews",
      "badgePosition": "bottomRight"
    }
  ]
}
```

---

### 5. newsLetterSection

**Collection Type:** `Single Type`  
**Purpose:** Controls the newsletter signup form copy and styling.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `newsletterTitle` | String (Short Text) | Yes | Newsletter section heading |
| `newsletterDescription` | String (Long Text) | Yes | Description of newsletter benefits |
| `newsletterPlaceholder` | String (Short Text) | Yes | Placeholder text for email input |
| `newsletterButtonText` | String (Short Text) | Yes | Text on subscribe button |

**Example Data:**
```json
{
  "newsletterTitle": "Get the Best Stories, Straight to Your Inbox",
  "newsletterDescription": "Sign up for our newsletter for a weekly round-up of our top articles and picks",
  "newsletterPlaceholder": "Enter your email",
  "newsletterButtonText": "Subscribe"
}
```

---

## How It Works Page Collections

### 1. howItWorksHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Controls the hero section heading and description for the How It Works page.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroTitle` | String (Short Text) | Yes | Main title text (e.g., "Get Started in") |
| `heroTitleHighlight` | String (Short Text) | Yes | Highlighted portion of title (e.g., "3 Easy Steps") |
| `heroDescription` | String (Long Text) | Yes | Description text below title |

**Example Data:**
```json
{
  "heroTitle": "Get Started in",
  "heroTitleHighlight": "3 Easy Steps",
  "heroDescription": "From setup to your first great recommendation in minutes."
}
```

---

### 2. howItWorksSteps

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual step cards displayed in the hero section grid (typically 3 steps).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `stepNumber` | Integer | Yes | Step number (1, 2, 3) |
| `stepTitle` | String (Short Text) | Yes | Step title (e.g., "Set Up Your Tastes") |
| `stepDescription` | String (Long Text) | Yes | Detailed description of the step |
| `stepImage` | Media (Image) | Yes | SVG/PNG image for the step |
| `displayOrder` | Integer | Yes | Order in which steps appear (1, 2, 3) |

**Example Data:**
```json
{
  "stepNumber": 1,
  "stepTitle": "Set Up Your Tastes",
  "stepDescription": "Tell us your favorite genres, directors, and actors. This helps us calibrate your initial discovery feed.",
  "stepImage": "/assets/SetTastes.svg",
  "displayOrder": 1
}
```

---

### 3. howItWorksExtrasSection

**Collection Type:** `Single Type`  
**Purpose:** Controls the "Optional Extras" section heading and description.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `extrasTitle` | String (Short Text) | Yes | Section title (e.g., "And a Few") |
| `extrasTitleHighlight` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Optional Extras...") |

**Example Data:**
```json
{
  "extrasTitle": "And a Few",
  "extrasTitleHighlight": "Optional Extras..."
}
```

---

### 4. howItWorksExtras

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual extra feature cards displayed in the extras section (typically 3 extras).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `extraIcon` | Media (Image) | Yes | Icon representing the extra feature |
| `extraTitle` | String (Short Text) | Yes | Feature title (e.g., "Creator Recommendations") |
| `extraDescription` | String (Long Text) | Yes | Detailed description of the extra feature |
| `displayOrder` | Integer | Yes | Order in which extras appear (1, 2, 3) |

**Example Data:**
```json
{
  "extraIcon": "/assets/icons/star.svg",
  "extraTitle": "Creator Recommendations",
  "extraDescription": "Go beyond your network and explore picks from critics, filmmakers, and top Recce community members.",
  "displayOrder": 1
}
```

---

## Blog Collections

### 1. Blog

**Collection Type:** `Collection Type`  
**Purpose:** Main blog post collection for the Gossip page and homepage recent blogs section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Blog post title |
| `slug` | String (Short Text) | Yes | URL-friendly identifier (auto-generated or manual, must be unique) |
| `content` | Rich Text (or Long Text) | Yes | Main blog content (first section before optional image) |
| `optionalImage` | Media (Image) | No | Optional image placed between content sections |
| `contentContinued` | Rich Text (or Long Text) | No | Continuation of blog content after optional image |
| `featuredImage` | Media (Image) | Yes | Hero image displayed at top of individual blog post |
| `tag` | Enumeration | Yes | Blog category for filtering |
| `author` | String (Short Text) | No | Author name only (no image/bio) |

**Enumeration Values for `tag`:**
- `Film`
- `TV`
- `Interviews`
- `Coming Soon`
- `Festivals`
- `Hidden Gems`

**System Fields (Auto-managed by Strapi):**
- `publishedAt` — Publication timestamp, used for sorting (newest first)
- `createdAt` — Creation timestamp
- `updatedAt` — Last update timestamp

**Example Data:**
```json
{
  "title": "Recce video search app launched in bid to solve 'viewer decision fatigue'",
  "slug": "recce-video-search-app-launched",
  "content": "A UK start-up is seeking to tackle the problem of audiences feeling overwhelmed by choice with a new social platform for film and TV fans...",
  "optionalImage": "/api/upload/image123.jpg",
  "contentContinued": "Unlike the algorithm-driven recommendation engines of streaming services, Recce features recommendations from people...",
  "featuredImage": "/api/upload/featured456.jpg",
  "tag": "Film",
  "author": "Jim Irving",
  "publishedAt": "2025-11-24T10:00:00.000Z"
}
```

**Frontend Usage:**
- **Blog Read Page** (`/gossip/[slug]`): Displays single blog using `slug` parameter
- **Blog Listing Page** (`/gossip`): Lists blogs with tab filtering by `tag`
- **Homepage Recent Blogs**: Shows 6 latest blogs sorted by `publishedAt`
- **More to Explore Section**: Shows 3 related blogs with same `tag`, excluding current blog

---

### 2. Global Social Links

**Collection Type:** `Single Type`  
**Purpose:** Global social media links displayed on all blog posts and used as share buttons.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `facebook` | String (Short Text) — URL validation | No | Facebook profile or page URL |
| `instagram` | String (Short Text) — URL validation | No | Instagram profile URL |
| `linkedin` | String (Short Text) — URL validation | No | LinkedIn profile or company URL |
| `twitter` | String (Short Text) — URL validation | No | Twitter/X profile URL |
| `tiktok` | String (Short Text) — URL validation | No | TikTok profile URL |

**System Fields (Auto-managed by Strapi):**
- `publishedAt` — Last publication timestamp
- `createdAt` — Creation timestamp
- `updatedAt` — Last update timestamp

**Example Data:**
```json
{
  "facebook": "https://facebook.com/recceapp",
  "instagram": "https://instagram.com/recceapp",
  "linkedin": "https://linkedin.com/company/recceapp",
  "twitter": "https://twitter.com/recceapp",
  "tiktok": "https://tiktok.com/@recceapp"
}
```

**Frontend Usage:**
- **Blog Read Page** (`/gossip/[slug]`): Displays social share buttons with these links
- **Footer Component**: Displays social media icons with links across all pages
- Called once per page load and cached/memoized to avoid duplicate API calls

---

## API Endpoints for Blog

All blog data is fetched through the Next.js API proxy at `/api/strapi` to keep the API token server-side. The following Strapi endpoints are used internally:

### Get Single Blog by Slug
```
GET /api/blogs?filters[slug][$eq]={slug}&populate=*
```

### Get Latest Blogs (for Homepage)
```
GET /api/blogs?sort=-publishedAt&pagination[limit]=6
```

### Get Blogs with Tag Filter (for Listing Page)
```
GET /api/blogs?filters[tag][$eq]={tag}&sort=-publishedAt&pagination[limit]={limit}&pagination[start]={offset}
```

### Get Related Blogs (3 with same tag, excluding current)
```
GET /api/blogs?filters[tag][$eq]={tag}&filters[documentId][$ne]={currentBlogId}&sort=-publishedAt&pagination[limit]=3
```

### Get Global Social Links
```
GET /api/global-social-links?populate=*
```

---



## Rewards Page Collections

The Rewards page consists of 7 Strapi collections that manage different sections of the page. These collections follow the same pattern as How It Works and Blog pages.

**Frontend Location:** `/src/sections/rewards/` (RewardsHero, EarnWays, RedeemRewards, RewardFAQs)  
**Strapi Functions:** `getRewardsHeroSection()`, `getRewardsActionCards()`, `getRewardsEarnWaysSection()`, `getRewardsEarnWaysCards()`, `getRewardsRedeemSection()`, `getRewardsRedeemOptions()`, `getGlobalFAQs()`

---

### 1. rewardsHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section at the top of the Rewards page with 3 action cards.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroTitle` | String (Short Text) | Yes | Main hero title (e.g., "Earn and Redeem") |
| `heroTitleHighlight` | String (Short Text) | Yes | Highlighted portion of title (displayed in orange) |
| `heroDescription` | String (Long Text) | Yes | Hero section description/subtitle |
| `heroImage` | Media (Image) | No | Background or accent image for hero section |

**Example Data:**
```json
{
  "heroTitle": "Earn",
  "heroTitleHighlight": "Recce Points",
  "heroDescription": "Unlock amazing rewards and exclusive perks by engaging with the Recce community. The more you interact, the more you earn!",
  "heroImage": "/api/assets/hero-rewards.webp"
}
```

---

### 2. rewardsActionCards

**Collection Type:** `Collection Type`  
**Purpose:** Manages the 3 action cards displayed in the hero section (usually "Quick Overview" type cards).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `cardTitle` | String (Short Text) | Yes | Action card title (e.g., "Earn Points") |
| `cardDescription` | String (Long Text) | Yes | Action card description |
| `cardIcon` | Media (Image) | No | Icon/image for the card |
| `actionOrder` | Integer | Yes | Display order (1, 2, 3) |

**Example Data:**
```json
[
  {
    "cardTitle": "Quick Overview",
    "cardDescription": "Understand how the rewards system works and what you can achieve.",
    "cardIcon": "/api/assets/icons/overview.svg",
    "actionOrder": 1
  },
  {
    "cardTitle": "Start Earning",
    "cardDescription": "Discover all the ways you can accumulate points on Recce.",
    "cardIcon": "/api/assets/icons/earning.svg",
    "actionOrder": 2
  },
  {
    "cardTitle": "Redeem Now",
    "cardDescription": "Browse available rewards and redeem your hard-earned points.",
    "cardIcon": "/api/assets/icons/redeem.svg",
    "actionOrder": 3
  }
]
```

---

### 3. rewardsEarnWaysSection

**Collection Type:** `Single Type`  
**Purpose:** Section header for the "Ways to Earn" section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `earnTitle` | String (Short Text) | Yes | Section title (e.g., "Two Ways to Earn") |
| `earnTitleHighlight` | String (Short Text) | Yes | Highlighted portion of title |
| `earnDescription` | String (Long Text) | Yes | Section description |

**Example Data:**
```json
{
  "earnTitle": "Two Ways to",
  "earnTitleHighlight": "Earn",
  "earnDescription": "Accumulate points through personal engagement and community contributions. Both paths reward your dedication to Recce!"
}
```

---

### 4. rewardsEarnWaysCards

**Collection Type:** `Collection Type`  
**Purpose:** Manages the 2 earn ways cards (Personal & Community rewards).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `earnWayTitle` | String (Short Text) | Yes | Card title (e.g., "Personal Rewards") |
| `earnWayDescription` | String (Long Text) | Yes | Card description |
| `rewardPoints` | Component (Repeatable) | Yes | Array of reward point items |
| `displayOrder` | Integer | Yes | Display order (1 or 2) |

**Repeatable Component: `rewardPoints`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `pointIcon` | Media (Image) | Yes | Icon representing the activity/reward |
| `pointText` | String (Short Text) | Yes | Activity name (e.g., "Write a Review") |

**Example Data:**
```json
[
  {
    "earnWayTitle": "Personal Rewards",
    "earnWayDescription": "Earn points through your individual activities on Recce.",
    "rewardPoints": [
      {
        "pointIcon": "/api/assets/icons/review.svg",
        "pointText": "Write a Review"
      },
      {
        "pointIcon": "/api/assets/icons/rate.svg",
        "pointText": "Rate a Film"
      },
      {
        "pointIcon": "/api/assets/icons/share.svg",
        "pointText": "Share a Recommendation"
      }
    ],
    "displayOrder": 1
  },
  {
    "earnWayTitle": "Community Rewards",
    "earnWayDescription": "Earn bonus points by helping and inspiring your Recce community.",
    "rewardPoints": [
      {
        "pointIcon": "/api/assets/icons/invite.svg",
        "pointText": "Invite a Friend"
      },
      {
        "pointIcon": "/api/assets/icons/votes.svg",
        "pointText": "Get Helpful Votes"
      },
      {
        "pointIcon": "/api/assets/icons/trending.svg",
        "pointText": "Trending Content"
      }
    ],
    "displayOrder": 2
  }
]
```

---

### 5. rewardsRedeemSection

**Collection Type:** `Single Type`  
**Purpose:** Section header for the "Redemption Options" section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `redeemTitle` | String (Short Text) | Yes | Section title (e.g., "Ready to Redeem") |
| `redeemTitleHighlight` | String (Short Text) | Yes | Highlighted portion of title |
| `redeemDescription` | String (Long Text) | Yes | Section description |

**Example Data:**
```json
{
  "redeemTitle": "Ready to",
  "redeemTitleHighlight": "Redeem?",
  "redeemDescription": "Choose from a wide range of rewards and perks. Redeem your points for movie tickets, streaming subscriptions, exclusive merchandise, and more!"
}
```

---

### 6. rewardsRedeemOptions

**Collection Type:** `Collection Type`  
**Purpose:** Manages redemption options in a carousel (displayed as grid on desktop, carousel on mobile).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `optionTitle` | String (Short Text) | Yes | Redemption option title (e.g., "Movie Tickets") |
| `optionDescription` | String (Long Text) | Yes | Description of the redemption option |
| `optionImage` | Media (Image) | No | Featured image for the option |
| `displayOrder` | Integer | Yes | Display order in carousel/grid |

**Example Data:**
```json
[
  {
    "optionTitle": "Movie Ticket Vouchers",
    "optionDescription": "Enjoy a night at the movies. Redeem points for tickets at participating cinemas.",
    "optionImage": "/api/assets/rewards/movie-tickets.webp",
    "displayOrder": 1
  },
  {
    "optionTitle": "Streaming Subscriptions",
    "optionDescription": "Get a month of your favorite streaming service paid for with your Recce points.",
    "optionImage": "/api/assets/rewards/streaming.webp",
    "displayOrder": 2
  },
  {
    "optionTitle": "Exclusive Merchandise",
    "optionDescription": "Show your love for film with exclusive discounts on movie-themed apparel and gear.",
    "optionImage": "/api/assets/rewards/merchandise.webp",
    "displayOrder": 3
  }
]
```

---

### 7. faqSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the FAQ section heading displayed on different pages.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main FAQ section title |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (displayed in orange) |

**Example Data:**
```json
{
  "title": "Frequently Asked",
  "highlighted": "Questions"
}
```

---

### 8. faq

**Collection Type:** `Collection Type`  
**Purpose:** Manages FAQ items displayed in accordions across the site (Rewards page, Help page, etc.).

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `question` | String (Short Text) | Yes | FAQ question |
| `answer` | String (Long Text) | Yes | FAQ answer/response |

**Example Data:**
```json
[
  {
    "question": "How do I earn Recce points?",
    "answer": "Points are awarded for every activity and interaction on the platform. Write reviews, share gossip, engage with content to accumulate points quickly.",
  },
  {
    "question": "Can I share my points with others?",
    "answer": "Not directly, but you can invite friends to join the community. When they sign up and become active, you both earn bonus rewards.",
  },
  {
    "question": "What is the minimum points needed to redeem?",
    "answer": "The minimum points required varies by reward. Check the individual reward pages to see the exact points needed for each item.",
  },
  {
    "question": "How long do I have to use my rewards?",
    "answer": "Rewards typically expire 12 months from redemption. We'll notify you before expiry so you don't miss out."
  }
]
```

---

## Benefits Page Collections

### 1. benefitsHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section at the top of the Benefits page with background image.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main hero title (e.g., "The Auteur Club") |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (displayed in orange) (e.g., "Top 1%") |
| `description` | String (Long Text) | Yes | Hero section description |
| `backgroundImage` | Media (Image) | Yes | Background image for hero section |

**Example Data:**
```json
{
  "title": "The Auteur Club",
  "highlighted": "Top 1%",
  "description": "An exclusive circle for our Top 1% of contributors. This is where your passion for film and TV gets the VIP treatment you deserve.",
  "backgroundImage": "/assets/benefits-hero-bg.webp"
}
```

---

## Help Page Collections

### 1. helpHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section heading and description for the Help page.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main title text (e.g., "Get Help with") |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Recce") |
| `description` | String (Long Text) | Yes | Hero section description |

**Example Data:**
```json
{
  "title": "Get Help with",
  "highlighted": "Recce",
  "description": "Find answers to common questions and connect with our support team."
}
```

---

## Team Page Collections

### 1. teamHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section heading and description for the Team page.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main title text (e.g., "Meet the") |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Team") |
| `description` | String (Long Text) | Yes | Hero section description |

**Example Data:**
```json
{
  "title": "Meet the",
  "highlighted": "Team",
  "description": "The passionate people behind Recce"
}
```

---

### 2. teamMembers

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual team member profiles displayed in the grid.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | String (Short Text) | Yes | Team member name |
| `title` | String (Short Text) | Yes | Job title/role |
| `description` | String (Long Text) | Yes | Bio or description |
| `image` | Media (Image) | Yes | Profile photo |

**Example Data:**
```json
[
  {
    "name": "John Doe",
    "title": "CEO & Founder",
    "description": "Passionate about film and technology",
    "image": "/assets/team/john-doe.webp"
  }
]
```

---

## Partners Page Collections

### 1. partnersHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section heading and description for the Partners page.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main title text (e.g., "Our") |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Partners") |
| `description` | String (Long Text) | Yes | Hero section description |

**Example Data:**
```json
{
  "title": "Our",
  "highlighted": "Partners",
  "description": "Collaborating with industry leaders to bring you the best experience"
}
```

---

### 2. principalPartnersTitle

**Collection Type:** `Single Type`  
**Purpose:** Manages the title/heading for the Principal Partners section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Section title (e.g., "Principal Partners") |

**Example Data:**
```json
{
  "title": "Principal Partners"
}
```

---

### 3. officialPartnersTitle

**Collection Type:** `Single Type`  
**Purpose:** Manages the title/heading for the Official Partners section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Section title (e.g., "Official Partners") |

**Example Data:**
```json
{
  "title": "Official Partners"
}
```

---

### 4. principalPartners

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual principal partner cards displayed in the hero section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `description` | String (Long Text) | Yes | Partner description |
| `image` | Media (Image) | Yes | Partner logo or featured image |

**Example Data:**
```json
[
  {
    "description": "Leading streaming platform",
    "image": "/assets/partners/netflix.webp"
  }
]
```

---

### 5. officialPartners

**Collection Type:** `Collection Type` (Repeatable)  
**Purpose:** Individual official partner cards displayed in the grid section.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `description` | String (Long Text) | Yes | Partner description |
| `image` | Media (Image) | Yes | Partner logo or featured image |

**Example Data:**
```json
[
  {
    "description": "Movie database partner",
    "image": "/assets/partners/imdb.webp"
  }
]
```

---

## Why Recce Page Collections

### 1. whyRecceHeroSection

**Collection Type:** `Single Type`  
**Purpose:** Manages the hero section heading and description for the Why Recce page.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main title text (e.g., "Why Choose") |
| `highlighted` | String (Short Text) | Yes | Highlighted portion of title (e.g., "Recce") |
| `description` | String (Long Text) | Yes | Hero section description |

**Example Data:**
```json
{
  "title": "Why Choose",
  "highlighted": "Recce",
  "description": "Discover what makes Recce different"
}
```

---

## Legal Pages Collections

Legal pages (Privacy Policy and Terms and Conditions) contain structured policy content that can be easily updated without touching code. Both collections use the same schema structure for consistency.

**Frontend Location:** `/src/app/privacy-policy/page.tsx` and `/src/app/terms-and-conditions/page.tsx`  
**Strapi Functions:** `getPrivacyPolicy()`, `getTermsAndConditions()` in `src/lib/strapi.ts`  
**Routes:** `/privacy-policy` and `/terms-and-conditions`

---

### 1. Privacy Policy

**Collection Type:** `Single Type`  
**Purpose:** Manages all content for the Privacy Policy page, including sections and metadata.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main page title (e.g., "Privacy Policy") |
| `description` | String (Long Text) | Yes | Short description/subtitle displayed under title |
| `sections` | Component (Repeatable) | Yes | Array of policy sections with headings and content |
| `contactEmail` | String (Short Text) with Email validation | Yes | Contact email address for the "Questions?" section (e.g., "privacy@recceapp.com") |

**System Fields (Auto-managed by Strapi):**
- `publishedAt` — Last publication timestamp, used to display "Last updated" date

**Repeatable Component: `sections`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `sectionId` | String | Yes | Unique identifier for section (e.g., "data-collection", "cookies") |
| `title` | String (Short Text) | Yes | Section heading (e.g., "Data Collection") |
| `content` | Rich Text | Yes | Section content (HTML formatted with paragraphs, lists, etc.) |

**Example Data:**
```json
{
  "title": "Privacy Policy",
  "description": "Learn how we protect your personal data.",
  "contactEmail": "privacy@recceapp.com",
  "sections": [
    {
      "sectionId": "introduction",
      "title": "Introduction",
      "content": "<p>Recce (\"Company,\" \"we,\" \"us,\" or \"our\") operates the Recce application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>"
    },
    {
      "sectionId": "data-collection",
      "title": "Information Collection and Use",
      "content": "<p>We collect several different types of information for various purposes to provide and improve our Service to you.</p><h4>Types of Data Collected:</h4><ul><li>Personal Data: Email address, Name, Phone number, Cookies and Usage Data</li><li>Usage Data: Pages visited, Time and date of visit, Time spent on pages, Device information</li></ul>"
    },
    {
      "sectionId": "cookies",
      "title": "Use of Cookies",
      "content": "<p>Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.</p><p>We use cookies to collect information about browsing activities and remember your preferences. This helps us understand how you use our Service and improve your experience.</p>"
    },
    {
      "sectionId": "data-security",
      "title": "Data Security",
      "content": "<p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>"
    },
    {
      "sectionId": "contact",
      "title": "Contact Us",
      "content": "<p>If you have any questions about this Privacy Policy, please contact us at privacy@recceapp.com</p>"
    }
  ]
}
```

**Content Guidelines:**
- Use Rich Text editor for sections to allow formatted text (headings, lists, bold, italic, links)
- Keep section IDs lowercase with hyphens (kebab-case)
- Sections are displayed in the order they appear in the array
- Each section is rendered with its own heading and content in a card-like container
- HTML tags in Rich Text are preserved and rendered in the frontend
- The `publishedAt` date is automatically displayed as "Last updated" on the frontend

---

### 2. Terms and Conditions

**Collection Type:** `Single Type`  
**Purpose:** Manages all content for the Terms and Conditions page, including sections and metadata.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | String (Short Text) | Yes | Main page title (e.g., "Terms and Conditions") |
| `description` | String (Long Text) | Yes | Short description/subtitle displayed under title |
| `sections` | Component (Repeatable) | Yes | Array of terms sections with headings and content |
| `contactEmail` | String (Short Text) with Email validation | Yes | Contact email address for the "Questions?" section (e.g., "legal@recceapp.com") |

**System Fields (Auto-managed by Strapi):**
- `publishedAt` — Last publication timestamp, used to display "Last updated" date

**Repeatable Component: `sections`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `sectionId` | String | Yes | Unique identifier for section (e.g., "user-agreement", "intellectual-property") |
| `title` | String (Short Text) | Yes | Section heading (e.g., "User Agreement") |
| `content` | Rich Text | Yes | Section content (HTML formatted with paragraphs, lists, etc.) |

**Example Data:**
```json
{
  "title": "Terms and Conditions",
  "description": "Please read these terms carefully before using Recce.",
  "contactEmail": "legal@recceapp.com",
  "sections": [
    {
      "sectionId": "user-agreement",
      "title": "User Agreement",
      "content": "<p>By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.</p>"
    },
    {
      "sectionId": "use-license",
      "title": "Use License",
      "content": "<p>Permission is granted to temporarily download one copy of the materials (information or software) on Recce's application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p><ul><li>Modify or copy the materials</li><li>Use the materials for any commercial purpose or for any public display</li><li>Attempt to decompile or reverse engineer any software contained on Recce's application</li><li>Remove any copyright or other proprietary notations from the materials</li></ul>"
    },
    {
      "sectionId": "disclaimer",
      "title": "Disclaimer",
      "content": "<p>The materials on Recce's application are provided on an 'as is' basis. Recce makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>"
    },
    {
      "sectionId": "limitations",
      "title": "Limitations",
      "content": "<p>In no event shall Recce or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Recce's application, even if Recce or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>"
    },
    {
      "sectionId": "accuracy",
      "title": "Accuracy of Materials",
      "content": "<p>The materials appearing on Recce's application could include technical, typographical, or photographic errors. Recce does not warrant that any of the materials on the application are accurate, complete, or current. Recce may make changes to the materials contained on the application at any time without notice.</p>"
    },
    {
      "sectionId": "intellectual-property",
      "title": "Intellectual Property Rights",
      "content": "<p>All content on Recce's application, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Recce or its content suppliers and is protected by international copyright laws.</p>"
    },
    {
      "sectionId": "user-content",
      "title": "User-Generated Content",
      "content": "<p>When you submit content (reviews, comments, ratings) to Recce, you grant Recce a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.</p>"
    },
    {
      "sectionId": "governing-law",
      "title": "Governing Law",
      "content": "<p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts located in the United Kingdom.</p>"
    },
    {
      "sectionId": "contact-legal",
      "title": "Contact Us",
      "content": "<p>If you have any questions about these Terms and Conditions, please contact us at legal@recceapp.com</p>"
    }
  ]
}
```

**Content Guidelines:**
- Use Rich Text editor for sections to allow formatted text (headings, lists, bold, italic, links)
- Keep section IDs lowercase with hyphens (kebab-case)
- Sections are displayed in the order they appear in the array
- Each section is rendered with its own heading and content in a card-like container
- HTML tags in Rich Text are preserved and rendered in the frontend
- The `publishedAt` date is automatically displayed as "Last updated" on the frontend
- Consider typical terms sections: User Agreement, Use License, Disclaimer, Limitations, Accuracy, Intellectual Property, User Content, Governing Law

---

## Navigation Configuration

### navigationLinks

**Collection Type:** `Single Type`  
**Purpose:** Dynamically manage header and footer navigation links.

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `navigationTitle` | String (Short Text) | Yes | Title/name for this navigation config |
| `navigationLinks` | Component (Repeatable) | Yes | Array of navigation links |

**Repeatable Component: `navigationLinks`**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `linkLabel` | String (Short Text) | Yes | Display text for link (e.g., "Why Recce?") |
| `linkPath` | String (Short Text) | Yes | URL path (e.g., "/why-recce") |
| `linkOrder` | Integer | Yes | Display order in menu (1, 2, 3, etc.) |

**Example Data:**
```json
{
  "navigationTitle": "Main Navigation",
  "navigationLinks": [
    {
      "linkLabel": "Why Recce?",
      "linkPath": "/why-recce",
      "linkOrder": 1
    },
    {
      "linkLabel": "How it Works",
      "linkPath": "/how-it-works",
      "linkOrder": 2
    }
  ]
}
```

---

## Field Types Reference

> Note: Strapi does not provide a dedicated `URL` field type. To store links use `String (Short Text)` and enable a URL validation pattern in the field settings, or store structured links as a component if you need additional fields (label, target, analytics metadata).

| Type | Description | Example |
|------|-------------|---------|
| String (Short Text) | Single line text, max 255 chars. Use this for short strings and URLs (apply validation). | "Welcome to Recce" |
| String (Long Text) | Multi-line text, no limit | Long descriptions, paragraphs |
| Media (Image) | Image files (webp, jpg, png) | Hero background images, icons |
| Integer | Whole numbers | 1, 2, 3 for ordering |
| Component (Repeatable) | Group of fields that can repeat | Array of badges, bullet points |
| Enumeration | Predefined list of options | "topLeft", "topRight", etc. |
| Boolean | True/False toggle | Yes/No options |

---

## Migration Notes for Future Pages

When adding new pages to the Strapi integration:

1. **Follow the naming convention:** `pageNameSectionName` (e.g., `benefitsPageHeroSection`, `rewardsPageFeatureCards`)
2. **Create comprehensive schema documentation** for each page here
3. **Use reusable components** where applicable (e.g., similar badge structures)
4. **Validate all content** is editable by non-technical editors
5. **Test responsive behavior** with sample data before going live

---

## API Endpoints

All homepage data is fetched from the following endpoint:

```
GET /api/home-page-content
```

Detailed API implementation can be found in `src/lib/strapi.ts`

---

**Last Updated:** December 12, 2025  
**Schema Version:** 2.3 (Legal Pages Collections Added)
