"use client";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { BuilderBlock } from "@/types/builder";

interface Props {
  block: BuilderBlock;
  selected: boolean;
  onClick: () => void;
}

export default function SortableBlock({
  block,
  selected,
  onClick,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      {...attributes}
      {...listeners}
      className={`rounded-xl bg-white p-5 shadow cursor-pointer border-2 ${
        selected
          ? "border-blue-600"
          : "border-transparent"
      }`}
    >
      {block.type === "heading" && (
        <h1
          style={{
            color: block.styles.color,
            fontSize: block.styles.fontSize,
            textAlign: block.styles.align,
          }}
          className="font-bold"
        >
          {block.content}
        </h1>
      )}

      {block.type === "paragraph" && (
        <p
          style={{
            color: block.styles.color,
            fontSize: block.styles.fontSize,
            textAlign: block.styles.align,
          }}
        >
          {block.content}
        </p>
      )}

      {block.type === "button" && (
        <button
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {block.content}
        </button>
      )}
      

     {block.type === "image" && (
  <div className="space-y-3">
    <img
      src={
        block.styles.image ||
        "https://placehold.co/600x300"
      }
      alt={block.content || "Image"}
      className="w-full rounded-lg object-cover"
    />

    {block.content && (
      <p
        style={{
          color: block.styles.color,
          fontSize: `${block.styles.fontSize ?? 16}px`,
          textAlign: block.styles.align,
        }}
        className="font-medium"
      >
        {block.content}
      </p>
    )}
  </div>
)}
       

      {block.type === "hero" && (
        <div className="rounded-xl bg-slate-100 p-12 text-center">
          <h1
            style={{
              fontSize: block.styles.fontSize,
              color: block.styles.color,
              textAlign: block.styles.align,
            }}
            className="font-bold"
          >
            {block.content || "Hero Section"}
          </h1>
        </div>
      )}
    </div>
    
  );
}