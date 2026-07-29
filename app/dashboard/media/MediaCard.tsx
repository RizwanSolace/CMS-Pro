"use client";
import { useState} from 'react';
import toast from "react-hot-toast";
import { cmsService } from "@/services/cms.service";
import MediaPreviewModal from './MediaPreviewModal';

interface Props {
  media: any;
  refresh: () => void;
  
}

export default function MediaCard({
  media,
  refresh,
  
}: Props) {
    const [previewOpen, setPreviewOpen] = useState(false);
const [preview, setPreview] = useState<any>(null);

const deleteMedia = async () => {
  if (!confirm("Delete media?")) return;

  try {
    const response = await cmsService.deleteMedia(media._id);

    console.log(response);

    toast.success("Deleted");

    refresh();
  } catch (error: any) {
    console.error(error);

    toast.error(
      error?.response?.data?.message || "Failed to delete media"
    );
  }
};

  return (

    <div className="rounded-xl border bg-white shadow">

      <img
        src={media.url}
        className="h-48 w-full rounded-t-xl object-cover"
      />

      <div className="space-y-2 p-4">

        <h3 className="truncate font-semibold">
          {media.originalName}
        </h3>

        <p className="text-xs text-slate-500">
          {(media.size / 1024).toFixed(1)} KB
        </p>

        <div className="flex gap-2">

          <button
            className="rounded bg-blue-600 px-3 py-1 text-white"
            onClick={() => {          
              setPreview(media);
        setPreviewOpen(true);
            }}  
          >
            Preview
           
          </button>

          <button
            className="rounded bg-red-600 px-3 py-1 text-white"
            onClick={deleteMedia}
          >
            Delete
          </button>
          <MediaPreviewModal
  open={previewOpen}
  image={preview}
  onClose={() => setPreviewOpen(false)}
/>

        </div>

      </div>

    </div>

  );
}