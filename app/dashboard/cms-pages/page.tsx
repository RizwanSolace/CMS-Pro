"use client";

import { mockCmsPages } from "@/data/mockCmsPages";
import CmsTable from "@/components/cms/CmsTable";
import  AddCmsModal  from "@/components/cms/AddCmsModal"

export default function CmsPages() {
  return (
    <div className="space-y-8">
      <div>
      <h1 className="text-3xl font-bold">
        CMS Pages
      </h1>

      <p className="mt-2 text-slate-500">
        Manage all CMS pages.
      </p>
      </div>
      <AddCmsModal />
      <CmsTable pages={mockCmsPages} />
    </div>
  );
}