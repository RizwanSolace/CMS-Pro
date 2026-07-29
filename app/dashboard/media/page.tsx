"use client";

import { useEffect, useState } from "react";
import { cmsService } from "@/services/cms.service";
import Button from "@/components/common/Button";
import MediaGrid from "./MediaGrid";
import UploadMediaModal from "./UploadMediaModal";

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await cmsService.getAllMedia();
      setMedia(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Media Library
        </h1>

        <Button onClick={() =>
 setShowUploadModal(true) }>
          Upload Media
  
        </Button>

      </div>

      <MediaGrid
        media={media}
        refresh={fetchMedia}
      />

      <UploadMediaModal
       isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        refreshMedia={fetchMedia}
      />

    </div>
  );
}