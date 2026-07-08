"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import BuilderSidebar from "@/components/cms-builder/BuilderSidebar";
import BuilderCanvas from "@/components/cms-builder/BuilderCanvas";
import {
    arrayMove,
} from "@dnd-kit/sortable";

import {
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BuilderBlock } from "@/types/builder";
import BuilderProperties from "@/components/cms-builder/BuilderProperties";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button";
export default function BuilderPage() {
    const [blocks, setBlocks] = useState<BuilderBlock[]>([]);
const params = useParams();

const pageId = params.id;
    const [selectedBlock, setSelectedBlock] =
        useState<BuilderBlock | null>(null);

    const handleDragEnd = (
        event: DragEndEvent
    ) => {
        const { active, over } = event;

        if (!over) return;

        // Sidebar → Canvas
        if (
            active.id.toString().startsWith("sidebar") &&
            over.id === "canvas"
        ) {
            const type =
                active.data.current?.type;

            setBlocks((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    type,

                    content:
                        type === "heading"
                            ? "New Heading"
                            : type === "paragraph"
                                ? "Write something..."
                                : type === "button"
                                    ? "Click Me"
                                    : "",

                    styles: {
                        fontSize: 32,
                        color: "#111827",
                        align: "left",
                    },
                },
            ]);

            return;
        }

        // Canvas → Canvas (reorder)

        if (active.id !== over.id) {
            setBlocks((items) => {
                const oldIndex = items.findIndex(
                    (i) => i.id === active.id
                );

                const newIndex = items.findIndex(
                    (i) => i.id === over.id
                );

                return arrayMove(
                    items,
                    oldIndex,
                    newIndex
                );
            });
        }
    };

    return (
        <>
        <div className="mb-6 flex items-center justify-between">
    <div>
        <h1 className="text-3xl font-bold">
            Home Page
        </h1>

        <p className="text-slate-500">
            Editing page # {pageId}
        </p>
    </div>

    <div className="flex gap-3">
        <Button variant="secondary">
            Preview
        </Button>

        <Button>
            Save Draft
        </Button>

        <Button>
            Publish
        </Button>
    </div>
</div>
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex h-full">

                <BuilderSidebar />

                <SortableContext
                    items={blocks}
                    strategy={verticalListSortingStrategy}
                >
                    <BuilderCanvas blocks={blocks}
                        selectedBlock={selectedBlock}
                        onSelect={setSelectedBlock} />
                </SortableContext>
                <BuilderProperties
                    block={selectedBlock}
                    onChange={(updatedBlock) => {
                        setBlocks((prev) =>
                            prev.map((block) =>
                                block.id === updatedBlock.id
                                    ? updatedBlock
                                    : block
                            )
                        );

                        setSelectedBlock(updatedBlock);
                    }}
                />
            </div>
        </DndContext>
        </>
    );
}