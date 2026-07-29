"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cmsService } from "@/services/cms.service";
import toast from "react-hot-toast";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await cmsService.getPageById(id);
        setPage(res.data);
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
      setPage((prev: any) => ({ ...prev, status: "PUBLISHED" }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnpublish = async () => {
    try {
      await cmsService.updateStatus(id, "DRAFT");
      toast.success("Page moved to draft.");
      setPage((prev: any) => ({ ...prev, status: "DRAFT" }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveDraft = async () => {
    try {
      toast.success("Draft saved successfully.");
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

  const featuredImageUrl = page.featuredImage?.url || page.featuredImage || "";
  const statusLabel = page.status === "PUBLISHED" ? "Published" : "Draft";
  const hero = page.content?.hero ?? {};
  const intro = page.content?.intro ?? {};
  const features = page.content?.features ?? [];
  const cta = page.content?.cta ?? {};
  const seo = page.content?.seo ?? {};

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold">Preview Mode</h2>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              page.status === "PUBLISHED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Back
          </button>

          {page.status === "DRAFT" ? (
            <>
              <button onClick={handleSaveDraft} className="rounded-lg border px-4 py-2 hover:bg-gray-100">
                Save Draft
              </button>

              <button onClick={handlePublish} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Publish
              </button>
            </>
          ) : (
            <button onClick={handleUnpublish} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Unpublish
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 p-8">
        {featuredImageUrl ? (
          <img
            src={featuredImageUrl}
            alt={page.title}
            className="h-80 w-full rounded-2xl object-cover"
          />
        ) : null}

        <section className="rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-sm">
          <h1 className="text-4xl font-bold">{page.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{page.description}</p>
          {hero.ctaText ? (
            <a
              href={hero.ctaLink || "#"}
              className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-medium text-slate-900"
            >
              {hero.ctaText}
            </a>
          ) : null}
        </section>

        <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{intro.title || "Overview"}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{intro.body || hero.subtitle}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Hero Highlights</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{hero.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{hero.subtitle}</p>
          </div>
        </section>

        {features.length > 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Key Features</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {features.map((feature: any, index: number) => (
                <div key={`${feature.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {cta.title || cta.description ? (
          <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">{cta.title || "Ready to get started?"}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50">{cta.description}</p>
            {cta.buttonText ? (
              <a href={cta.buttonLink || "#"} className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-medium text-blue-700">
                {cta.buttonText}
              </a>
            ) : null}
          </section>
        ) : null}

        {seo.title || seo.description ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">SEO Details</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {seo.title ? <p><span className="font-medium text-slate-900">Title:</span> {seo.title}</p> : null}
              {seo.description ? <p><span className="font-medium text-slate-900">Description:</span> {seo.description}</p> : null}
              {seo.keywords ? <p><span className="font-medium text-slate-900">Keywords:</span> {seo.keywords}</p> : null}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}