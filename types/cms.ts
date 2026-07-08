export interface CmsPage {
  id: number;

  title: string;

  slug: string;

  shortDescription: string;

  content: string;

  seoTitle: string;

  seoDescription: string;

  status: "Published" | "Draft";

  author: string;

  updatedAt: string;
}