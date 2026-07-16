"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cmsService } from "@/services/cms.service";

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();

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

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!page) {
    return <div className="p-10">Page not found.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-10">
      <h1 className="text-4xl font-bold">
        {page.title}
      </h1>

      <p className="mt-4 text-gray-600">
        {page.description}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          {page.content.hero.title}
        </h2>

        <p>{page.content.hero.subtitle}</p>
      </section>
    </div>
  );
}