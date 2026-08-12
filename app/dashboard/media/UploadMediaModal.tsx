"use client";

import { useState } from "react";
import { cmsService } from "@/services/cms.service";
import { toast } from "react-toastify";
import Input from "@/components/common/Input";

interface UploadMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshMedia: () => void;
}

export default function UploadMediaModal({
  isOpen,
  onClose,
  refreshMedia,
}: UploadMediaModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      await cmsService.uploadMedia(formData);

      toast.success("Media uploaded successfully.");

      setFile(null);

      refreshMedia();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Upload Media
        </h2>

        <Input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="mb-4 w-full"
        />

        {file && (
          <div className="mb-5 rounded-lg bg-gray-100 p-3">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

        </div>
      </div>
    </div>
  );
}