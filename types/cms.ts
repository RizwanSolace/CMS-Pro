
export interface CreateCmsPagePayload {
  title: string;
  slug: string;
  description: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
  featuredImage: string;
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
    };
  };
  featuredImage: string;
  status: "DRAFT" | "PUBLISHED";
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