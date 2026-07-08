"use client";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { TriangleAlert } from "lucide-react";

interface DeleteCmsModalProps {
  open: boolean;
  onClose: () => void;
  page: any;
  onConfirm: () => void;
}

export default function DeleteCmsModal({
  open,
  onClose,
  page,
  onConfirm,
}: DeleteCmsModalProps) {
  if (!page) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete CMS Page"
    >
      <div className="space-y-6 text-center">

        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <TriangleAlert
              size={36}
              className="text-red-600"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Delete "{page.title}"?
          </h3>

          <p className="mt-2 text-slate-500">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-4">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete Page
          </Button>

        </div>

      </div>
    </Modal>
  );
}