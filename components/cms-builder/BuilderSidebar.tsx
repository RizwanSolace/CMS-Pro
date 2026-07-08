"use client";

import { useDraggable } from "@dnd-kit/core";

const blocks = [
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "hero", label: "Hero" },
];

function DraggableBlock({
  type,
  label,
}: {
  type: string;
  label: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: `sidebar-${type}`,
    data: {
      type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px,${transform.y}px,0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-grab rounded-xl border bg-white p-4 shadow-sm hover:border-blue-500"
    >
      {label}
    </div>
  );
}

export default function BuilderSidebar() {
  return (
    <aside className="w-64 border-r p-5">
      <h2 className="mb-5 text-xl font-semibold">
        Components
      </h2>

      <div className="space-y-3">
        {blocks.map((block) => (
          <DraggableBlock
            key={block.type}
            {...block}
          />
        ))}
      </div>
    </aside>
  );
}