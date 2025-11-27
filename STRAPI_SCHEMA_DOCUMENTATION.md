# Recce Strapi Schema Documentation

This document describes the Strapi collections and their fields for the Recce website. This serves as a reference for content editors and developers.

---

## Table of Contents
1. [HomePage Content Collections](#homepage-content-collections)
2. [How It Works Page Collections](#how-it-works-page-collections)
3. [Blog Collections](#blog-collections)
4. [Navigation Configuration](#navigation-configuration)
4. [Field Types Reference](#field-types-reference)

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

**Last Updated:** November 27, 2025  
**Schema Version:** 2.1 (How It Works Page Collections Added)
