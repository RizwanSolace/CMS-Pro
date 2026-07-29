"use client";

interface Props {
  open: boolean;
  image: any;
  onClose: () => void;
}

export default function MediaPreviewModal({
  open,
  image,
  onClose,
}: Props) {
  if (!open || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative rounded-xl bg-white p-4">

        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded bg-red-500 px-3 py-1 text-white"
        >
          ✕
        </button>

        <img
          src={image.url}
          alt={image.originalName}
          className="max-h-[80vh] max-w-[80vw] rounded-lg"
        />

        <div className="mt-4">
          <h3 className="font-semibold">
            {image.originalName}
          </h3>

          <p>
            {(image.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
    </div>
  );
}