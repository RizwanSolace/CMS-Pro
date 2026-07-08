"use client";

import Modal from "@/components/common/Modal";
import CmsForm from "./CmsForm";

interface EditCmsModalProps {
  open: boolean;
  onClose: () => void;
  page: any;
}

export default function EditCmsModal({
  open,
  onClose,
  page,
}: EditCmsModalProps) {
  if (!page) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit CMS Page"
    >
      <CmsForm
        mode="edit"
        initialData={page}
        onSubmit={(e) => {
          e.preventDefault();

          console.log("Update Page");

          onClose();
        }}
      />
    </Modal>
  );
}