// Strapi types for Recce website

// ============ Generic Types ============

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  mime: string;
  name?: string;
  hash?: string;
  size?: number;
  formats?: Record<string, any> | null;
  [key: string]: any;
}

// ============ HomePage Types ============

export interface HeroSectionAttributes {
  heroBackgroundImage?: StrapiImage | null;
  heroSubtitle: string;
  heroMainTitle: string;
  heroSectionTitle: string;
  heroSectionHighlight: string;
  heroDescription: string;
  googlePlayStoreLink: string;
  appleAppStoreLink: string;
}

export interface BulletPoint {
  id: string | number;
  bulletIcon?: StrapiImage | null;
  bulletText: string;
  [key: string]: any;
}

export interface FeaturesSectionAttributes {
  sectionTitle: string;
  sectionDescription: string;
  sectionHighlightText: string;
  seeRecceInActionTitle: string;
  seeRecceInActionDescription: string;
  seeRecceInActionImage: StrapiImage;
  seeRecceInActionBulletPoints: BulletPoint[];
}

export interface FeatureCard {
  id: string | number;
  featureIcon?: StrapiImage | null;
  featureTitle: string;
  featureDescription: string;
  featureBackgroundImage?: StrapiImage | null;
  displayOrder: number;
  [key: string]: any;
}

export interface FeatureCardsAttributes {
  featureIcon: StrapiImage;
  featureTitle: string;
  featureDescription: string;
  featureBackgroundImage: StrapiImage;
  displayOrder: number;
}

export interface CTABadge {
  id: string | number;
  badgeIcon?: StrapiImage | null;
  badgeText: string;
  badgePosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  [key: string]: any;
}

export interface CTASectionAttributes {
  ctaMainTitle: string;
  ctaHighlightText: string;
  ctaDescription: string;
  ctaCentralImage?: StrapiImage | null;
  googlePlayLink: string;
  appleAppLink: string;
  ctaBadges: CTABadge[];
}

export interface NewsLetterSectionAttributes {
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
}

// ============ Navigation Types ============

export interface NavigationLink {
  id: string;
  linkLabel: string;
  linkPath: string;
  linkOrder: number;
}

export interface NavigationLinksAttributes {
  navigationTitle: string;
  navigationLinks: NavigationLink[];
}

// ============ BlogPost Types (for future use) ============

export interface BlogPost extends StrapiEntity {
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    featuredImage?: StrapiImage;
    author?: {
      data?: {
        attributes: {
          name: string;
          email: string;
        };
      };
    };
    categories?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
  };
}

// ============ How It Works Types ============

export interface HowItWorksStepAttributes {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  stepImage?: StrapiImage | null;
  displayOrder: number;
}

export interface HowItWorksHeroSectionAttributes {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
}

export interface HowItWorksExtraAttributes {
  extraIcon?: StrapiImage | null;
  extraTitle: string;
  extraDescription: string;
  displayOrder: number;
}

export interface HowItWorksExtrasSectionAttributes {
  extrasTitle: string;
  extrasTitleHighlight: string;
}

// ============ Rewards Page Types ============

export interface RewardsHeroSectionAttributes {
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroImage?: StrapiImage | null;
}

export interface RewardsActionCardAttributes {
  cardIcon?: StrapiImage | null;
  cardTitle: string;
  cardDescription: string;
  actionOrder: number;
}

export interface RewardsEarnWaysSectionAttributes {
  earnTitle: string;
  earnTitleHighlight: string;
  earnDescription: string;
}

export interface RewardPointAttributes {
  pointText: string;
}

export interface RewardsEarnWaysCardAttributes {
  cardTitle: string;
  cardDescription: string;
  rewardPoints: RewardPointAttributes[];
  displayOrder: number;
}

export interface RewardsRedeemSectionAttributes {
  redeemTitle: string;
  redeemTitleHighlight: string;
  redeemDescription: string;
}

export interface RewardsRedeemOptionAttributes {
  optionImage?: StrapiImage | null;
  optionTitle: string;
  optionDescription: string;
  displayOrder: number;
}

export interface FAQAttributes {
  question: string;
  answer: string;
  displayOrder: number;
}

// ============ Blog Collection Types ============

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string | any[]; // Can be HTML string or Rich Text blocks array
  optionalImage?: StrapiImage | null;
  contentContinued?: string | any[]; // Can be HTML string or Rich Text blocks array
  featuredImage: StrapiImage;
  tag: string;
  author?: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface RelatedBlog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string | any[]; // Can be HTML string or Rich Text blocks array
  featuredImage: StrapiImage;
  tag: string;
  publishedAt: string;
  [key: string]: any;
}

// ============ Global Social Links Type ============

export interface GlobalSocialLinks {
  id: number;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  tiktok?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// ============ Complete HomePage Content Type ============

export interface HomePageContent {
  heroSection: HeroSectionAttributes;
  featuresSection: FeaturesSectionAttributes;
  featureCards: FeatureCard[];
  ctaSection: CTASectionAttributes;
  newsLetterSection: NewsLetterSectionAttributes;
}