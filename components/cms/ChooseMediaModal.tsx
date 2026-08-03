"use client";

import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

interface Media {
  id: string;
  name: string;
  url: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  media: Media[];
  selected?: string;
  onSelect: (media: Media) => void;
  loading?: boolean;
}

export default function ChooseMediaModal({
  open,
  onClose,
  media,
  selected,
  onSelect,
  loading = false,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Import From Media Library"
      size="lg"
    >
      <div className="space-y-5">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500">
            Loading media...
          </div>
        ) : media.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-slate-500">
            No saved images found in the media library.
          </div>
        ) : (
          <div className="grid max-h-96 grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
            {media.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`cursor-pointer rounded-xl border-2 p-2 transition ${
                  selected === item.id ? "border-blue-600" : "border-transparent"
                }`}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-28 w-full rounded-lg object-cover"
                />

                <p className="mt-2 truncate text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
