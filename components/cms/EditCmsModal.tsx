"use client";

import Modal from "@/components/common/Modal";
import CmsForm from "./CmsForm";
import { CmsPage } from "@/types/cms";
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
    };
  };
  featuredImage: string;
}

export default function EditCmsModal({
  open,
  onClose,
  page,
}: EditCmsModalProps) {
  if (!page) return null;

  const handleSubmit = async (data: CmsFormData) => {
    try {
      await cmsService.update(page._id, data);

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