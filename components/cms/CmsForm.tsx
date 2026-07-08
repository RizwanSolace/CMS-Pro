"use client";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface CmsFormProps {
  mode: "add" | "edit";
  initialData?: any;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function CmsForm({
  mode,
  initialData,
  onSubmit,
}: CmsFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
    >
      <Input
        id="title"
        label="Title"
        defaultValue={initialData?.title ?? ""}
        placeholder="Enter page title"
        required
      />

      <Input
        id="slug"
        label="Slug"
        defaultValue={initialData?.slug ?? ""}
        placeholder="/about-us"
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Short Description
        </label>

        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Enter short description"
          defaultValue={initialData?.lastName?? ""}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Content
        </label>

        <textarea
          rows={8}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Write page content..."
          defaultValue={initialData?.content??""}
        />
      </div>

      <Input
        id="seoTitle"
        label="SEO Title"
        placeholder="SEO Title"
        defaultValue={initialData?.seoTitle??""}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          SEO Description
        </label>

        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="SEO Description"
          defaultValue={initialData?.seoDescription??""}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Status
        </label>

        <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" defaultValue={initialData?.status ?? "Draft"}>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {mode === "add"
            ? "Create Page"
            : "Update Page"}
        </Button>
      </div>
    </form>
  );
}