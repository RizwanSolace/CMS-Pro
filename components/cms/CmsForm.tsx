"use client";
import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { cmsService } from "@/services/cms.service";

interface CmsFormProps {
  mode: "add" | "edit";
  initialData?: any;
   onSubmit?: (data: CmsFormData) => void | Promise<void>;
}
interface CmsFormData {
  title: string;
  slug: string;
  description: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
  featuredImage: string;
  status: "Draft" | "Published";
}

export default function CmsForm({
  mode,
  initialData,
  onSubmit,
}: CmsFormProps)
 {
 const [featuredImage, setFeaturedImage] = useState(
  initialData?.featuredImage ?? ""
);

const [uploading, setUploading] = useState(false);
   
const [imagePreview, setImagePreview] = useState("");       // Cloudinary URL
 const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await cmsService.uploadMedia(formData);

   setFeaturedImage(res.data._id);     // Send this to CMS API
setImagePreview(res.data.url);      // Display this in UI
  } catch (err) {
    console.error(err);
  } finally {
    setUploading(false);
  }
};

  
  return (
   <form
  onSubmit={(e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData: CmsFormData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      slug: (form.elements.namedItem("slug") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      content: {
        hero: {
          title: (
            form.elements.namedItem("heroTitle") as HTMLInputElement
          ).value,
          subtitle: (
            form.elements.namedItem("heroSubtitle") as HTMLInputElement
          ).value,
        },
      },
     featuredImage,
      status: mode === "add" ? "Draft" : (initialData?.status ?? "Draft"),
    };

    onSubmit?.(formData);
  }}
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
          defaultValue={initialData?.description?? ""}
          name="description"
          required  
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Content
        </label>

       <Input
  id="heroTitle"
  label="Hero Title"
  defaultValue={initialData?.content?.hero?.title ?? ""}
  placeholder="Welcome to Our Company"
  name="heroTitle"
  required
/>

<Input
  id="heroSubtitle"
  label="Hero Subtitle"
  defaultValue={initialData?.content?.hero?.subtitle ?? ""}
  placeholder="We build innovative solutions."
  
  name="heroSubtitle"
  required
/>
      </div>

      {/* <Input
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
      </div> */}
     <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Featured Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="block w-full rounded-xl border border-slate-300 px-4 py-3"
  />

  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="mt-4 h-40 rounded-xl border object-cover"
    />
  )}
</div>

      
      

       <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Status
  </label>

  {mode === "add" ? (
    <div className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500">
      Draft <span className="text-xs">(new pages always start as draft)</span>
    </div>
  ) : (
    <select
      name="status"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
      defaultValue={initialData?.status ?? "Draft"}
    >
      <option>Draft</option>
      <option>Published</option>
    </select>
  )}
</div>

      <div className="flex justify-end">
        <Button type="submit" disabled={uploading}>
           {uploading
    ? "Uploading..."
    : mode === "add"
    ? "Create Page"
    : "Update Page"}
        </Button>
      </div>
    </form>
  );
}