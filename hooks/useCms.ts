import { useEffect, useState } from "react";
import { cmsService } from "@/services/cms.service";
import { CmsPage } from "@/types/cms";

export default function useCmsPages() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const res = await cmsService.getAll({
        page: 1,
        limit: 10,
      });

      const nextPages = Array.isArray(res.data)
        ? res.data
        : res.data?.pages ?? [];

      setPages(nextPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    fetchPages,
  };
}

