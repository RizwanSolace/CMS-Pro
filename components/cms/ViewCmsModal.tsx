"use client";

import Modal from "@/components/common/Modal";

import { CmsPage } from "@/types/cms";

interface ViewCmsModalProps {
  open: boolean;
  onClose: () => void;
  page: CmsPage | null;
}

export default function ViewCmsModal({
  open,
  onClose,
  page,
}: ViewCmsModalProps) {
  if (!page) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="CMS Page Details"
    >
      <div className="space-y-5">

        <div>
          <p className="text-sm text-slate-500">Title</p>
          <p className="font-semibold">{page.title}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Slug</p>
          <p>{page.slug}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Description</p>
          <p>{page.description}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Content</p>
          <div className="rounded-lg border p-4 whitespace-pre-wrap">
            {page.content}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-slate-500">SEO Title</p>
            <p>{page.seoTitle}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p>{page.status}</p>
          </div>

        </div>

        <div>
          <p className="text-sm text-slate-500">
            SEO Description
          </p>
          <p>{page.seoDescription}</p>
        </div>

      </div>
    </Modal>
  );
}