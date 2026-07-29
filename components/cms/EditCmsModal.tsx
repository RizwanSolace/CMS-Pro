"use client";

import Modal from "@/components/common/Modal";
import CmsForm from "./CmsForm";
import { CmsPage, CreateCmsPagePayload } from "@/types/cms";
import { cmsService } from "@/services/cms.service";

interface EditCmsModalProps {
  open: boolean;
  onClose: () => void;
  page: CmsPage | null;
}

interface CmsFormData {
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
  featuredImage: string;
  status?: "Draft" | "Published";
}

export default function EditCmsModal({
  open,
  onClose,
  page,
}: EditCmsModalProps) {
  if (!page) return null;

  const handleSubmit = async (data: CmsFormData) => {
    try {
      const payload: CreateCmsPagePayload = {
        title: data.title,
        slug: data.slug.trim().replace(/^\/+|\/+$/g, ""),
        description: data.description,
        content: data.content,
        featuredImage: data.featuredImage,
      };

      await cmsService.update(page._id, payload);

      alert("Page updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit CMS Page"
    >
      <CmsForm
        mode="edit"
        initialData={page} 
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}