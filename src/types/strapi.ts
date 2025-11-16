// Basic Strapi types for future integration

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

export interface BlogPost extends StrapiEntity {
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
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