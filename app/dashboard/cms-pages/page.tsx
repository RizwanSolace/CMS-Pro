"use client";

import  useCmsPages  from "@/hooks/useCms";
import CmsTable from "@/components/cms/CmsTable";
import  AddCmsModal  from "@/components/cms/AddCmsModal"

export default function CmsPages() {
  const { pages, loading } = useCmsPages();

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
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Loading CMS pages...
        </div>
      ) : pages.length > 0 ? (
        <CmsTable pages={pages} />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            No CMS pages found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You can create a new CMS page from the Add Page button above.
          </p>
        </div>
      )}
    </div>
  );
}
