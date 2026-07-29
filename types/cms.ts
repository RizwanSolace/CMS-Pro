
export interface CreateCmsPagePayload {
  title: string;
  slug: string;
  description: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
      ctaText?: string;
      ctaLink?: string;
    };
    intro?: {
      title: string;
      body: string;
    };
    features?: Array<{
      title: string;
      description: string;
    }>;
    cta?: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    seo?: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  featuredImage: string | { url: string; originalName?: string; _id?: string };
}

export interface CmsPage {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
      ctaText?: string;
      ctaLink?: string;
    };
    intro?: {
      title: string;
      body: string;
    };
    features?: Array<{
      title: string;
      description: string;
    }>;
    cta?: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    seo?: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  featuredImage: string | { url: string; originalName?: string; _id?: string };
  status: "Draft" | "Published";
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCmsPageResponse {
  success: boolean;
  message: string;
  data: CmsPage;
}