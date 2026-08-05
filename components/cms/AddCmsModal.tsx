"use client";

import { useState } from "react";
import { cmsService } from "@/services/cms.service";

import { CreateCmsPagePayload } from "@/types/cms";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

import CmsForm from "./CmsForm";

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

export default function AddCmsModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: CmsFormData) => {
    try {
      const payload: CreateCmsPagePayload = {
        title: data.title,
        slug: data.slug.trim().replace(/^\/+|\/+$/g, ""),
        description: data.description,
        content: data.content,
        ...(data.featuredImage ? { featuredImage: data.featuredImage } : {}),
      };

      const res = await cmsService.create(payload);

      console.log(res);
      alert("Page created successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      // rethrow so form can surface validation errors to the user
      throw err;
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Page
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add CMS Page"
      >
        <CmsForm
          mode="add"
          onSubmit={handleSubmit}
          
        />
      </Modal>
    </>
  );
}