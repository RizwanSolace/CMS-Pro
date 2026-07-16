"use client";

import { useState } from "react";
import { cmsService } from "@/services/cms.service";

import { CmsPage } from "@/types/cms";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

import CmsForm from "./CmsForm";
interface AddCmsModalProps {
  onClose?: () => void;
 
  mode: "add" | "edit";
  initialData?: any;
  onSubmit?: (data: CmsFormData) => Promise<void> | void;

}
interface CmsFormData {
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

export default function AddCmsModal() {
  const [open, setOpen] = useState(false);
  const handleSubmit = async (data: CmsFormData) => {
  try {
    const payload = {
      title: data.title,
      slug: data.slug ,
      description: data.description ,
      content: {
        hero: {   
          title: data.content.hero.title,
          subtitle: data.content.hero.subtitle,
        },
      },
      featuredImage: data.featuredImage,
    };

    const res = await cmsService.create(payload);

    console.log(res);

    alert("Page created successfully");
  } catch (err) {
    console.error(err);
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