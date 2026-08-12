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
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

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
      setPreview("");

      refreshMedia();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Upload Media</h2>
          <p className="text-sm text-gray-600">Upload PNG, JPEG, or WebP images</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!preview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <svg
                className="mx-auto mb-3 h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              
              <p className="mb-2 text-gray-700 font-medium">
                Drag and drop your image here
              </p>
              <p className="mb-4 text-sm text-gray-500">or</p>

              <label className="inline-block">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) =>
                    handleFile(e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <span className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors">
                  Select Image
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* File Info */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file ? file.size / 1024 : 0).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="ml-3 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Change File Option */}
              <label className="block">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) =>
                    handleFile(e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <span className="cursor-pointer text-center block text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Choose Different Image
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            disabled={uploading}
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}