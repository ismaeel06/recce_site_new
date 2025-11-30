import { z } from 'zod';
import type {
  HomePageContent,
  HeroSectionAttributes,
  FeaturesSectionAttributes,
  FeatureCardsAttributes,
  CTASectionAttributes,
  NewsLetterSectionAttributes,
  StrapiResponse,
  StrapiImage,
  StrapiEntity,
  BulletPoint,
  CTABadge,
  FeatureCard,
  Blog,
  RelatedBlog,
  GlobalSocialLinks,
} from '@/types/strapi';

// Note: STRAPI_API_TOKEN is kept secret on the server and NOT used client-side.
// All client requests go through /api/strapi proxy route which calls Strapi server-side.

// ============ Validation Schemas ============

const StrapiImageSchema = z.object({
  id: z.number(),
  url: z.string(),
  alternativeText: z.string().optional().nullable(),
  width: z.number().optional(),
  height: z.number().optional(),
  mime: z.string(),
  name: z.string().optional(),
  hash: z.string().optional(),
  size: z.number().optional(),
  formats: z.record(z.string(), z.any()).optional().nullable(),
  documentId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
  provider: z.string().optional(),
}).passthrough();

const BulletPointSchema = z.object({
  id: z.union([z.string(), z.number()]),
  bulletIcon: StrapiImageSchema.optional().nullable(),
  bulletText: z.string(),
}).passthrough();

const CTABadgeSchema = z.object({
  id: z.union([z.string(), z.number()]),
  badgeIcon: StrapiImageSchema.optional().nullable(),
  badgeText: z.string(),
  badgePosition: z.enum(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']).optional(),
}).passthrough();

const FeatureCardSchema = z.object({
  id: z.union([z.string(), z.number()]),
  featureIcon: StrapiImageSchema.optional().nullable(),
  featureTitle: z.string(),
  featureDescription: z.string(),
  featureBackgroundImage: StrapiImageSchema.optional().nullable(),
  displayOrder: z.number(),
}).passthrough();

const HeroSectionSchema = z.object({
  heroBackgroundImage: StrapiImageSchema.optional().nullable(),
  heroSubtitle: z.string(),
  heroMainTitle: z.string(),
  heroSectionTitle: z.string(),
  heroSectionHighlight: z.string(),
  heroDescription: z.string(),
  googlePlayStoreLink: z.string().url(),
  appleAppStoreLink: z.string().url(),
});

const FeaturesSectionSchema = z.object({
  sectionTitle: z.string(),
  sectionDescription: z.string(),
  sectionHighlightText: z.string(),
  seeRecceInActionTitle: z.string(),
  seeRecceInActionDescription: z.string(),
  seeRecceInActionImage: StrapiImageSchema,
  seeRecceInActionBulletPoints: z.array(BulletPointSchema),
});

const CTASectionSchema = z.object({
  ctaMainTitle: z.string(),
  ctaHighlightText: z.string(),
  ctaDescription: z.string(),
  ctaCentralImage: StrapiImageSchema.optional().nullable(),
  googlePlayLink: z.string().url(),
  appleAppLink: z.string().url(),
  ctaBadges: z.array(CTABadgeSchema),
});

const NewsLetterSectionSchema = z.object({
  newsletterTitle: z.string(),
  newsletterDescription: z.string(),
  newsletterPlaceholder: z.string(),
  newsletterButtonText: z.string(),
});

const HowItWorksStepSchema = z.object({
  id: z.union([z.string(), z.number()]),
  stepNumber: z.number(),
  stepTitle: z.string(),
  stepDescription: z.string(),
  stepImage: StrapiImageSchema.optional().nullable(),
  displayOrder: z.number(),
}).passthrough();

const HowItWorksHeroSchema = z.object({
  heroTitle: z.string(),
  heroTitleHighlight: z.string(),
  heroDescription: z.string(),
});

const HowItWorksExtraSchema = z.object({
  id: z.union([z.string(), z.number()]),
  extraIcon: StrapiImageSchema.optional().nullable(),
  extraTitle: z.string(),
  extraDescription: z.string(),
  displayOrder: z.number(),
}).passthrough();

const HowItWorksExtrasSectionSchema = z.object({
  extrasTitle: z.string(),
  extrasTitleHighlight: z.string(),
});

const HomePageContentSchema = z.object({
  heroSection: HeroSectionSchema,
  featuresSection: FeaturesSectionSchema,
  featureCards: z.array(FeatureCardSchema),
  ctaSection: CTASectionSchema,
  newsLetterSection: NewsLetterSectionSchema,
});

// ============ Base API Fetch Wrapper ============

/**
 * Proxies Strapi API requests through Next.js /api/strapi route.
 * This keeps the STRAPI_API_TOKEN secret on the server.
 * Client makes request to /api/strapi?endpoint=... and the server proxies it to Strapi with the token.
 */
export async function strapiApi<T>(
  endpoint: string,
  options: RequestInit = {}
) {
  // Build the full endpoint path with /api prefix if not already present
  const fullEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

  // Call the Next.js API proxy, passing the Strapi endpoint as a query parameter
  // Use encodeURIComponent to properly encode the entire endpoint string
  const proxyUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:3000';

  const url = `${proxyUrl}/api/strapi?endpoint=${encodeURIComponent(fullEndpoint)}`;

  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}${errorData.details ? ` - ${errorData.details}` : ''}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error('Strapi API error:', error);
    throw error;
  }
}

// ============ HomePage API Functions ============

/**
 * Fetches the hero section content from Strapi
 */
export async function getHeroSection(): Promise<HeroSectionAttributes> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/home-page-hero-section?populate=*'
    );

    // In new Strapi format, attributes are directly on response.data
    const heroData = response.data;

    if (!heroData) {
      throw new Error('Hero section data not found in Strapi');
    }

    const validated = HeroSectionSchema.parse(heroData);
    return validated;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    throw error;
  }
}

/**
 * Fetches the features section content from Strapi
 */
export async function getFeaturesSection(): Promise<FeaturesSectionAttributes> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/home-page-features-section?populate[seeRecceInActionImage][populate]=*&populate[seeRecceInActionBulletPoints][populate]=*'
    );

    // In new Strapi format, attributes are directly on response.data
    const featuresData = response.data;

    if (!featuresData) {
      throw new Error('Features section data not found in Strapi');
    }

    const validated = FeaturesSectionSchema.parse(featuresData);
    return validated;
  } catch (error) {
    console.error('Error fetching features section:', error);
    throw error;
  }
}

/**
 * Fetches all feature cards from Strapi, sorted by displayOrder
 */
export async function getFeatureCards(): Promise<FeatureCard[]> {
  try {
    const response = await strapiApi<StrapiResponse<any[]>>(
      '/home-page-feature-cards?populate[featureIcon][populate]=*&populate[featureBackgroundImage][populate]=*&sort=displayOrder:asc'
    );

    if (!Array.isArray(response.data)) {
      throw new Error('Feature cards data is not an array');
    }

    // In new Strapi format, each item has attributes directly on it
    const featureCards = (response.data as any).map((item: any) => {
      // If item has .attributes, use that; otherwise use the item directly
      const itemData = item.attributes || item;
      const validated = FeatureCardSchema.parse(itemData);
      return validated;
    });

    return featureCards;
  } catch (error) {
    console.error('Error fetching feature cards:', error);
    throw error;
  }
}

/**
 * Fetches the CTA section content from Strapi
 */
export async function getCTASection(): Promise<CTASectionAttributes> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/home-page-cta-section?populate[ctaCentralImage][populate]=*&populate[ctaBadges][populate]=*'
    );

    // In new Strapi format, attributes are directly on response.data
    const ctaData = response.data;

    if (!ctaData) {
      throw new Error('CTA section data not found in Strapi');
    }

    const validated = CTASectionSchema.parse(ctaData);
    return validated;
  } catch (error) {
    console.error('Error fetching CTA section:', error);
    throw error;
  }
}

/**
 * Fetches the newsletter section content from Strapi
 */
export async function getNewsLetterSection(): Promise<NewsLetterSectionAttributes> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/news-letter-section?populate=*'
    );

    // In new Strapi format, attributes are directly on response.data
    const newsletterData = response.data;

    if (!newsletterData) {
      throw new Error('Newsletter section data not found in Strapi');
    }

    const validated = NewsLetterSectionSchema.parse(newsletterData);
    return validated;
  } catch (error) {
    console.error('Error fetching newsletter section:', error);
    throw error;
  }
}

/**
 * Fetches all home page content in a single request
 * This is the main function to use for the homepage
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const [heroSection, featuresSection, featureCards, ctaSection, newsLetterSection] =
      await Promise.all([
        getHeroSection(),
        getFeaturesSection(),
        getFeatureCards(),
        getCTASection(),
        getNewsLetterSection(),
      ]);

    const homePageContent: HomePageContent = {
      heroSection,
      featuresSection,
      featureCards,
      ctaSection,
      newsLetterSection,
    };

    const validated = HomePageContentSchema.parse(homePageContent);
    return validated;
  } catch (error) {
    console.error('Error fetching complete home page content:', error);
    throw error;
  }
}

// ============ Utility Functions ============

/**
 * Constructs a full image URL from Strapi image data.
 * In Strapi v4, images are returned directly (not wrapped in .data).
 * If the URL is relative, it's served through Strapi's public folder at NEXT_PUBLIC_STRAPI_URL.
 */
export function getStrapiImageUrl(image: StrapiImage | undefined | null): string | null {
  if (!image) {
    return null;
  }

  // Handle direct image objects (v4 format)
  const url = image.url;

  if (!url) {
    return null;
  }

  // If URL is already absolute, return as-is
  if (url.startsWith('http')) {
    return url;
  }

  // Otherwise prepend public Strapi/CDN base URL.
  // Normalize to avoid accidental double slashes when joining.
  const rawPublicBase = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const publicBase = rawPublicBase.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;

  // Diagnostic warning: if images are stored with provider 'local' but the public base
  // appears to be a CDN (e.g., CloudFront), it may not serve the `/uploads` path unless
  // the CDN is configured to forward that path to your Strapi origin.
  if (image.provider === 'local' && /cloudfront\.net/i.test(publicBase)) {
    // Use console.warn so developers can see this in browser devtools during debugging.
    // This is not sensitive: we don't log tokens or secrets.
    console.warn(`getStrapiImageUrl: using CDN base (${publicBase}) for locally-hosted image path (${path}). Ensure the CDN forwards /uploads to your Strapi origin.`);
  }

  return `${publicBase}${path}`;
}

/**
 * Constructs a full image URL with optional alt text
 */
export function getImageData(image: StrapiImage | undefined | null) {
  return {
    src: getStrapiImageUrl(image),
    alt: image?.alternativeText || 'Image',
  };
}

// ============ How It Works API Functions ============

/**
 * Fetches the How It Works hero section content from Strapi
 */
export async function getHowItWorksHero(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/how-it-works-hero-section'
    );

    const heroData = response.data;

    if (!heroData) {
      throw new Error('How It Works hero section data not found in Strapi');
    }

    const validated = HowItWorksHeroSchema.parse(heroData);
    return validated;
  } catch (error) {
    console.error('Error fetching How It Works hero section:', error);
    throw error;
  }
}

/**
 * Fetches all How It Works steps from Strapi, sorted by displayOrder
 */
export async function getHowItWorksSteps(): Promise<any[]> {
  try {
    const response = await strapiApi<StrapiResponse<any[]>>(
      '/how-it-works-steps?populate[stepImage][populate]=*&sort=displayOrder:asc'
    );

    if (!Array.isArray(response.data)) {
      throw new Error('How It Works steps data is not an array');
    }

    const steps = (response.data as any).map((item: any) => {
      const itemData = item.attributes || item;
      const validated = HowItWorksStepSchema.parse(itemData);
      return validated;
    });

    return steps;
  } catch (error) {
    console.error('Error fetching How It Works steps:', error);
    throw error;
  }
}

/**
 * Fetches the How It Works extras section header from Strapi
 */
export async function getHowItWorksExtrasSection(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      '/how-it-works-extras-section'
    );

    const extrasData = response.data;

    if (!extrasData) {
      throw new Error('How It Works extras section data not found in Strapi');
    }

    const validated = HowItWorksExtrasSectionSchema.parse(extrasData);
    return validated;
  } catch (error) {
    console.error('Error fetching How It Works extras section:', error);
    throw error;
  }
}

/**
 * Fetches all How It Works extras from Strapi, sorted by displayOrder
 */
export async function getHowItWorksExtras(): Promise<any[]> {
  try {
    const response = await strapiApi<StrapiResponse<any[]>>(
      '/how-it-works-extras?populate[extraIcon][populate]=*&sort=displayOrder:asc'
    );

    if (!Array.isArray(response.data)) {
      throw new Error('How It Works extras data is not an array');
    }

    const extras = (response.data as any).map((item: any) => {
      const itemData = item.attributes || item;
      const validated = HowItWorksExtraSchema.parse(itemData);
      return validated;
    });

    return extras;
  } catch (error) {
    console.error('Error fetching How It Works extras:', error);
    throw error;
  }
}

// ============ Blog API Functions ============

/**
 * Formats a date string from Strapi (ISO 8601) to readable format
 * Example: "2023-01-01T00:00:00.000Z" → "Sunday, 1 Jan 2023"
 */
export function formatBlogDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Fetches a single blog post by slug from Strapi
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await strapiApi<StrapiResponse<Blog[]>>(
      `/blogs?filters[slug][$eq]=${slug}&sort=publishedAt:desc&populate=*`
    );

    if (!Array.isArray(response.data) || response.data.length === 0) {
      return null;
    }

    return response.data[0];
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
}

/**
 * Fetches the latest published blogs from Strapi
 * @param limit - Number of blogs to fetch (default: 6)
 */
export async function getLatestBlogs(limit: number = 6): Promise<Blog[]> {
  try {
    const response = await strapiApi<StrapiResponse<Blog[]>>(
      `/blogs?sort=publishedAt:desc&pagination[limit]=${limit}&populate=*`
    );

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

/**
 * Fetches all blogs with optional filtering by tag and sorting
 */
export async function getBlogsList(
  tag?: string,
  limit?: number,
  offset: number = 0
): Promise<Blog[]> {
  try {
    let endpoint = `/blogs?sort=publishedAt:desc&populate=*`;

    if (tag && tag !== 'All') {
      endpoint += `&filters[tag][$eq]=${tag}`;
    }

    if (limit) {
      endpoint += `&pagination[limit]=${limit}&pagination[start]=${offset}`;
    }

    const response = await strapiApi<StrapiResponse<Blog[]>>(endpoint);

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching blogs list:', error);
    throw error;
  }
}

/**
 * Fetches related blogs by tag, excluding the current blog by documentId
 * @param currentBlogId - documentId of the current blog to exclude
 * @param tag - Blog tag to filter by
 * @param limit - Number of related blogs to fetch (default: 3)
 */
export async function getRelatedBlogs(
  currentBlogId: string,
  tag: string,
  limit: number = 3
): Promise<RelatedBlog[]> {
  try {
    const response = await strapiApi<StrapiResponse<RelatedBlog[]>>(
      `/blogs?filters[tag][$eq]=${tag}&filters[documentId][$ne]=${currentBlogId}&sort=publishedAt:desc&pagination[limit]=${limit}&populate=*`
    );

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    throw error;
  }
}

/**
 * Fetches global social links from Strapi
 * Returns null if not found (optional field)
 */
export async function getGlobalSocialLinks(): Promise<GlobalSocialLinks | null> {
  try {
    const response = await strapiApi<StrapiResponse<GlobalSocialLinks>>(
      `/global-social-link?populate=*`
    );

    return response.data || null;
  } catch (error) {
    // Silently fail - global social links are optional
    // This endpoint may not exist yet in Strapi
    return null;
  }
}

export async function getDownloadLinks(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/global-download-button`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getWhyRecceHero(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/why-recce-hero-section`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getWhyRecceCards(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/why-recce-cards?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getWhyRecceRationale(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/why-recce-rationale?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getWhyRecceStandouts(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/why-recce-standouts`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getBenefitsHero(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/benefits-hero`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getPerksHeader(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/perks-header?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getPerks(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/perks?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getQualifySection(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/qualify-section?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getQualifyPoints(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/qualify-points?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getTeamHero(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/team-hero`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getTeamMembers(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/team-members?populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getHelpHero(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/help-hero`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getFaqs(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/faqs`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}

export async function getContactPoints(): Promise<any> {
  try {
    const response = await strapiApi<StrapiResponse<any>>(
      `/contact-points`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    throw error;
  }
}