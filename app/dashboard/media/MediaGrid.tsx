"use client";

import MediaCard from "./MediaCard";

interface Props {
  media: any[];
  refresh: () => void;
}

export default function MediaGrid({
  media,
  refresh,
}: Props) {

  return (

    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">

      {media.map((item) => (

        <MediaCard
          key={item._id}
          media={item}
          refresh={refresh}
        />

      ))}

    </div>

  );
}