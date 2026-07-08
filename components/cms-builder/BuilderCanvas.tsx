"use client";

import { useDroppable } from "@dnd-kit/core";
import { BuilderBlock } from "@/types/builder";
import SortableBlock from "./SortableBlock";
import Button from "../common/Button";

interface Props {
  blocks: BuilderBlock[];
  selectedBlock: BuilderBlock | null;
  onSelect: (block: BuilderBlock) => void;
}

export default function BuilderCanvas({
  blocks,selectedBlock,
  onSelect,

}: Props) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 overflow-y-auto bg-slate-100 p-6"
    >
      {blocks.length === 0 ? (
        <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed">
          Drop Components Here
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block) => (
             <SortableBlock
        key={block.id}
        block={block}
       selected={selectedBlock?.id === block.id}
    onClick={() => onSelect(block)}

    />
          ))}
        </div>
      )}
     
    </div>
  );
}