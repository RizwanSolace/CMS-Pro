"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cmsService } from "@/services/cms.service";
import toast from "react-hot-toast";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState("");

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await cmsService.getPageById(id);
        setPage(res.data);
        setImagePreview(res.data.url); 
        console.log(res);
console.log(res.data);
        console.log("Page:", page);
console.log("Featured Image:", page.featuredImage);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPage();
    }
  }, [id]);

  const handlePublish = async () => {
  try {
    await cmsService.updateStatus(id, "PUBLISHED");
    toast.success("Page published successfully.");

    setPage((prev: any) => ({
      ...prev,
      status: "PUBLISHED",
    }));
  } catch (err) {
    console.error(err);
  }
};

 const handleUnpublish = async () => {
  try {
    await cmsService.updateStatus(id, "DRAFT");
    toast.success("Page moved to Draft")
    setPage((prev: any) => ({
      ...prev,
      status: "DRAFT",
    }));
  } catch (err) {
    console.error(err);
  }
};

  const handleSaveDraft = async () => {
    try {
      // await cmsService.saveDraft(id);

      alert("Draft saved successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!page) {
    return <div className="p-10">Page not found.</div>;
  }

  return (
    <>
      {/* Top Toolbar */}
      <div className="mb-8 flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold">
            Preview Mode
          </h2>

          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              page.status === "PUBLISHED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {page.status}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Back
          </button>

          {page.status === "DRAFT" ? (
            <>
              <button
                onClick={handleSaveDraft}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                Save Draft
              </button>

              <button
                onClick={handlePublish}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Publish
              </button>
            </>
          ) : (
            <button
              onClick={handleUnpublish}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Unpublish
            </button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="mx-auto max-w-5xl p-10">
         {page.featuredImage?.url ? (
  <img
    src={page.featuredImage.url}
    alt={page.featuredImage.originalName || page.title}
    className="mb-8 h-80 w-full rounded-xl object-cover"
  />
) : null}
        <h1 className="text-5xl font-bold">
          {page.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          {page.description}
        </p>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold">
            {page.content.hero.title}
          </h2>

          <p className="mt-3 text-gray-700">
            {page.content.hero.subtitle}
          </p>
        </section>
      </div>
    </>
  );
}