import { useEffect, useState } from "react";
import { cmsService } from "@/services/cms.service";

export default function useCmsPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const res = await cmsService.getAll({
        page: 1,
        limit: 10,
      });

      console.log(res);

      setPages(res.data.pages); // adjust after seeing API response
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

