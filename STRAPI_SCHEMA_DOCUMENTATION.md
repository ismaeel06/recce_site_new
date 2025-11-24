# Recce Strapi Schema Documentation

This document describes the Strapi collections and their fields for the Recce website. This serves as a reference for content editors and developers.

---

## Table of Contents
1. [HomePage Content Collections](#homepage-content-collections)
2. [Navigation Configuration](#navigation-configuration)
3. [Field Types Reference](#field-types-reference)

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

**Last Updated:** November 23, 2025  
**Schema Version:** 1.0
