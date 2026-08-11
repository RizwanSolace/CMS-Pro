"use client";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-toastify";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { cmsService } from "@/services/cms.service";
import type { CmsPage } from "@/types/cms";
import { ImagePlus, Images } from "lucide-react";
import ChooseMediaModal from "./ChooseMediaModal";
import { getApiFieldError, getApiErrorMessage } from "@/lib/api-response";
import usePermission from "@/hooks/usePermission";

interface CmsFormProps {
  mode: "add" | "edit";
  initialData?: Partial<CmsPage>;
  onSubmit?: (data: CmsFormData) => void | Promise<void>;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
}

interface ServerMedia {
  _id: string;
  id?: string;
  name?: string;
  originalName?: string;
  url: string;
}

interface CmsFormData {
  title: string;
  slug: string;
  description: string;
  content: {
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
    };
    intro: {
      title: string;
      body: string;
    };
    features: Array<{
      title: string;
      description: string;
    }>;
    cta: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  featuredImage: string;
  status: "Draft" | "Published";
}

export default function CmsForm({ mode, initialData, onSubmit }: CmsFormProps) {
  const initialFeaturedImage =
    typeof initialData?.featuredImage === "string"
      ? initialData.featuredImage
      : initialData?.featuredImage?._id ?? initialData?.featuredImage?.id ?? "";
  const [featuredImage, setFeaturedImage] = useState(initialFeaturedImage);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [imagePreview, setImagePreview] = useState(() => {
    if (typeof initialData?.featuredImage === "string" && initialData.featuredImage.startsWith("http")) {
      return initialData.featuredImage;
    }
    if (typeof initialData?.featuredImage !== "string" && initialData?.featuredImage?.url) {
      return initialData.featuredImage.url;
    }
    return "";
  });
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(() => {
    if (typeof initialData?.featuredImage !== "string" && initialData?.featuredImage?.url) {
      return {
        id: initialData.featuredImage._id ?? initialData.featuredImage.id ?? "",
        name: initialData.featuredImage.originalName ?? "Featured image",
        url: initialData.featuredImage.url,
      };
    }

    return null;
  });

  const [formValues, setFormValues] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    heroTitle: initialData?.content?.hero?.title ?? "",
    heroSubtitle: initialData?.content?.hero?.subtitle ?? "",
    heroCtaText: initialData?.content?.hero?.ctaText ?? "",
    heroCtaLink: initialData?.content?.hero?.ctaLink ?? "",
    introTitle: initialData?.content?.intro?.title ?? "",
    introBody: initialData?.content?.intro?.body ?? "",
    featureTitle1: initialData?.content?.features?.[0]?.title ?? "",
    featureDescription1: initialData?.content?.features?.[0]?.description ?? "",
    featureTitle2: initialData?.content?.features?.[1]?.title ?? "",
    featureDescription2: initialData?.content?.features?.[1]?.description ?? "",
    featureTitle3: initialData?.content?.features?.[2]?.title ?? "",
    featureDescription3: initialData?.content?.features?.[2]?.description ?? "",
    ctaTitle: initialData?.content?.cta?.title ?? "",
    ctaDescription: initialData?.content?.cta?.description ?? "",
    ctaButtonText: initialData?.content?.cta?.buttonText ?? "",
    ctaButtonLink: initialData?.content?.cta?.buttonLink ?? "",
    seoTitle: initialData?.content?.seo?.title ?? "",
    seoDescription: initialData?.content?.seo?.description ?? "",
    seoKeywords: initialData?.content?.seo?.keywords ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { role, normalizedRole, can } = usePermission();
  const checkRole = (normalizedRole ?? role) as string | undefined;
  const canPublish = can("cms:crud") || checkRole === "ADMIN" || checkRole === "SUPER_ADMIN";

  const handleInputChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formValues.slug.trim()) {
      newErrors.slug = "Slug is required.";
    }

    if (!formValues.description.trim()) {
      newErrors.description = "Short description is required.";
    }

    if (!formValues.heroTitle.trim()) {
      newErrors.heroTitle = "Hero title is required.";
    }

    if (!formValues.heroSubtitle.trim()) {
      newErrors.heroSubtitle = "Hero subtitle is required.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstField = Object.keys(newErrors)[0];
      // try to focus and scroll to the first invalid field
      try {
        const el = document.getElementById(firstField) as HTMLElement | null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          // small timeout to ensure scroll completes before focusing
          setTimeout(() => el.focus(), 200);
        }
      } catch (e) {
        // ignore DOM errors
      }

      // show unified toast message for missing mandatory fields
      toast.error("Complete all mandatory field", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await cmsService.uploadMedia(formData);

      setFeaturedImage(res.data._id);
      setImagePreview(res.data.url);
      setSelectedMedia({
        id: res.data._id,
        name: res.data.originalName ?? file.name,
        url: res.data.url,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const loadMediaLibrary = async () => {
    try {
      setMediaLoading(true);
      const res = await cmsService.getAllMedia({
        limit: 100,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      const savedMedia = ((res.data?.data ?? []) as ServerMedia[]).map((item) => ({
        id: item._id,
        name: item.originalName ?? item.name ?? "Untitled image",
        url: item.url,
      }));

      setMedia(savedMedia);
    } catch (err) {
      console.error(err);
    } finally {
      setMediaLoading(false);
    }
  };

  const handleOpenMediaLibrary = () => {
    setOpenMedia(true);
    loadMediaLibrary();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData: CmsFormData = {
      title: formValues.title,
      slug: formValues.slug.trim().replace(/^\/+|\/+$/g, ""),
      description: formValues.description,
      content: {
        hero: {
          title: formValues.heroTitle,
          subtitle: formValues.heroSubtitle,
          ctaText: formValues.heroCtaText,
          ctaLink: formValues.heroCtaLink,
        },
        intro: {
          title: formValues.introTitle,
          body: formValues.introBody,
        },
        features: [
          { title: formValues.featureTitle1, description: formValues.featureDescription1 },
          { title: formValues.featureTitle2, description: formValues.featureDescription2 },
          { title: formValues.featureTitle3, description: formValues.featureDescription3 },
        ].filter((feature) => feature.title || feature.description),
        cta: {
          title: formValues.ctaTitle,
          description: formValues.ctaDescription,
          buttonText: formValues.ctaButtonText,
          buttonLink: formValues.ctaButtonLink,
        },
        seo: {
          title: formValues.seoTitle,
          description: formValues.seoDescription,
          keywords: formValues.seoKeywords,
        },
      },
      featuredImage,
      status: mode === "add" ? "Draft" : initialData?.status ?? "Draft",
    };

    try {
      await onSubmit?.(formData);
    } catch (err) {
      // apply server-side validation errors where possible
      const slugError = getApiFieldError(err, "slug");
      const descriptionError = getApiFieldError(err, "description");

      const newErrors: Record<string, string> = {};

      if (slugError) newErrors.slug = slugError;
      if (descriptionError) newErrors.description = descriptionError;

      if (Object.keys(newErrors).length) {
        setErrors((prev) => ({ ...prev, ...newErrors }));
        // show first server error as toast as well
        toast.error(Object.values(newErrors)[0] as string);
        return;
      }

      // generic error toast
      toast.error(getApiErrorMessage(err));
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Page Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="title"
            label="Title"
            value={formValues.title}
            onChange={handleInputChange("title")}
            placeholder="Enter page title"
            required
            error={errors.title}
          />

          <Input
            id="slug"
            label="Slug"
            value={formValues.slug}
            onChange={handleInputChange("slug")}
            placeholder="about-us"
            required
            error={errors.slug}
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">
            Short Description
            <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            className={`w-full rounded-xl border px-4 py-3 outline-none transition ${errors.description ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-blue-600"}`}
            placeholder="Enter short description"
            value={formValues.description}
            onChange={handleInputChange("description")}
            name="description"
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Hero Section</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="heroTitle"
            label="Hero Title"
            value={formValues.heroTitle}
            onChange={handleInputChange("heroTitle")}
            placeholder="Welcome to Our Company"
            required
            error={errors.heroTitle}
          />

          <Input
            id="heroSubtitle"
            label="Hero Subtitle"
            value={formValues.heroSubtitle}
            onChange={handleInputChange("heroSubtitle")}
            placeholder="We build innovative solutions."
            required
            error={errors.heroSubtitle}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input
            id="heroCtaText"
            label="Hero Button Text"
            value={formValues.heroCtaText}
            onChange={handleInputChange("heroCtaText")}
            placeholder="Learn More"
          />

          <Input
            id="heroCtaLink"
            label="Hero Button Link"
            value={formValues.heroCtaLink}
            onChange={handleInputChange("heroCtaLink")}
            placeholder="/about-us"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Intro / Overview</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="introTitle"
            label="Section Title"
            value={formValues.introTitle}
            onChange={handleInputChange("introTitle")}
            placeholder="Why choose us"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Section Content</label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Describe your value proposition in a few sentences"
              value={formValues.introBody}
              onChange={handleInputChange("introBody")}
              name="introBody"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Feature Highlights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Input
              id="featureTitle1"
              label="Feature 1 Title"
              value={formValues.featureTitle1}
              onChange={handleInputChange("featureTitle1")}
              placeholder="Fast delivery"
            />
            <textarea
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Describe feature 1"
              value={formValues.featureDescription1}
              onChange={handleInputChange("featureDescription1")}
              name="featureDescription1"
            />
          </div>

          <div className="space-y-3">
            <Input
              id="featureTitle2"
              label="Feature 2 Title"
              value={formValues.featureTitle2}
              onChange={handleInputChange("featureTitle2")}
              placeholder="Trusted support"
            />
            <textarea
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Describe feature 2"
              value={formValues.featureDescription2}
              onChange={handleInputChange("featureDescription2")}
              name="featureDescription2"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <Input
              id="featureTitle3"
              label="Feature 3 Title"
              value={formValues.featureTitle3}
              onChange={handleInputChange("featureTitle3")}
              placeholder="Scalable solution"
            />
            <textarea
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Describe feature 3"
              value={formValues.featureDescription3}
              onChange={handleInputChange("featureDescription3")}
              name="featureDescription3"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Call to Action</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="ctaTitle"
            label="CTA Title"
            value={formValues.ctaTitle}
            onChange={handleInputChange("ctaTitle")}
            placeholder="Ready to get started?"
          />

          <Input
            id="ctaButtonText"
            label="CTA Button"
            value={formValues.ctaButtonText}
            onChange={handleInputChange("ctaButtonText")}
            placeholder="Contact us"
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">CTA Description</label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="Encourage users to take the next step"
              value={formValues.ctaDescription}
              onChange={handleInputChange("ctaDescription")}
              name="ctaDescription"
            />
          </div>

          <Input
            id="ctaButtonLink"
            label="CTA Button Link"
            value={formValues.ctaButtonLink}
            onChange={handleInputChange("ctaButtonLink")}
            placeholder="/contact"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">SEO Settings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="seoTitle"
            label="SEO Title"
            value={formValues.seoTitle}
            onChange={handleInputChange("seoTitle")}
            placeholder="SEO title"
          />

          <Input
            id="seoKeywords"
            label="Keywords"
            value={formValues.seoKeywords}
            onChange={handleInputChange("seoKeywords")}
            placeholder="cms, content, page"
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">SEO Description</label>
          <textarea
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            placeholder="Add a concise description for search engines"
            value={formValues.seoDescription}
            onChange={handleInputChange("seoDescription")}
            name="seoDescription"
          />
        </div>
      </section>

      <div className="rounded-xl border p-5">
        <h4 className="font-semibold">Featured Image</h4>

        {imagePreview ? (
          <img
            src={imagePreview}
            alt={selectedMedia?.name ?? "Featured image preview"}
            className="mt-4 h-56 w-full rounded-xl object-cover"
          />
        ) : (
          <div className="mt-4 flex h-56 items-center justify-center rounded-xl border-2 border-dashed">
            No Image Selected
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center justify-center gap-2"
          >
            <ImagePlus size={18} />
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>

          <Button
            type="button"
            onClick={handleOpenMediaLibrary}
            className="flex items-center justify-center gap-2"
          >
            <Images size={18} />
            Import From Media Library
          </Button>
        </div>
      </div>

     <div>
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Status
  </label>

  <div className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500">
    Draft
    <span className="text-xs">
      {" "}
      (pages can only be saved as draft)
    </span>
  </div>
</div>

      <div className="flex justify-end">
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : mode === "add" ? "Create Page" : "Update Page"}
        </Button>
      </div>
      <ChooseMediaModal
        open={openMedia}
        onClose={() => setOpenMedia(false)}
        media={media}
        selected={selectedMedia?.id}
        loading={mediaLoading}
        onSelect={(item) => {
          setSelectedMedia(item);
          setFeaturedImage(item.id);
          setImagePreview(item.url);
          setOpenMedia(false);
        }}
      />
    </form>
  );
}
