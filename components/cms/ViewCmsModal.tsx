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

  const featuredImage =
    typeof page.featuredImage === "string"
      ? page.featuredImage.startsWith("http")
        ? page.featuredImage
        : ""
      : page.featuredImage?.url ?? "";

  const formatDate = (date?: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const detailRows = [
    { label: "Title", value: page.title },
    { label: "Slug", value: `/${page.slug}` },
    { label: "Status", value: page.status },
    { label: "Author", value: getAuthorName(page) },
    { label: "Created", value: formatDate(page.createdAt) },
    { label: "Updated", value: formatDate(page.updatedAt) },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="CMS Page Details"
      size="lg"
    >
      <div className="space-y-6">
        {featuredImage && (
          <img
            src={featuredImage}
            alt={page.title}
            className="h-64 w-full rounded-xl border border-slate-200 object-cover"
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {detailRows.map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">Description</p>
          <p className="mt-1 whitespace-pre-line text-slate-800">
            {page.description || "-"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Hero Section</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Field label="Hero Title" value={page.content?.hero?.title} />
            <Field label="Hero Subtitle" value={page.content?.hero?.subtitle} />
            <Field label="Button Text" value={page.content?.hero?.ctaText} />
            <Field label="Button Link" value={page.content?.hero?.ctaLink} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Intro / Overview</h3>
          <div className="mt-3 space-y-3">
            <Field label="Section Title" value={page.content?.intro?.title} />
            <Field label="Section Content" value={page.content?.intro?.body} multiline />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Feature Highlights</h3>
          <div className="mt-3 grid gap-3">
            {page.content?.features?.length ? (
              page.content.features.map((feature, index) => (
                <div key={`${feature.title}-${index}`} className="rounded-lg bg-slate-50 p-3">
                  <p className="font-medium text-slate-900">
                    {feature.title || `Feature ${index + 1}`}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {feature.description || "-"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No features added.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Call to Action</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Field label="CTA Title" value={page.content?.cta?.title} />
            <Field label="Button Text" value={page.content?.cta?.buttonText} />
            <Field label="Button Link" value={page.content?.cta?.buttonLink} />
            <Field label="CTA Description" value={page.content?.cta?.description} multiline />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">SEO Settings</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <Field label="SEO Title" value={page.content?.seo?.title} />
            <Field label="Keywords" value={page.content?.seo?.keywords} />
            <Field label="SEO Description" value={page.content?.seo?.description} multiline />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function getAuthorName(page: CmsPage) {
  return typeof page.createdBy === "string"
    ? "Unknown"
    : page.createdBy?.name ?? "Unknown";
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-1 text-slate-800 ${multiline ? "whitespace-pre-line" : ""}`}>
        {value || "-"}
      </p>
    </div>
  );
}
