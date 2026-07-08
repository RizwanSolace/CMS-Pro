"use client";

import { BuilderBlock } from "@/types/builder";
import { useState} from 'react'

interface Props {
  block: BuilderBlock | null;
  onChange: (block: BuilderBlock) => void;
}
const handleSave = async () => {
  try {
  //  console.log(block);

    // later
    // await cmsBuilderService.savePage(pageId, blocks);

    alert("Page saved");
  } catch (err) {
    console.error(err);
  }
}; 

export default function BuilderProperties({
  block,
  onChange,
}: Props)

{ 
    const [preview, setPreview] =
useState(false);  
  if (!block) {
    return (
      <aside className="w-80 border-l bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Properties
        </h2>

        <div className="flex h-64 items-center justify-center text-center text-slate-400">
          Select a block to edit its properties.
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 overflow-y-auto border-l bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Properties
      </h2>

      {/* Block Type */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Block Type
        </label>

        <input
          value={block.type}
          disabled
          className="w-full rounded-lg border bg-slate-100 px-4 py-2"
        />
      </div>

      {/* Content */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Content
        </label>

        <textarea
          rows={4}
          value={block.content}
          onChange={(e) =>
            onChange({
              ...block,
              content: e.target.value,
            })
          }
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Font Size */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Font Size
        </label>

        <input
          type="number"
          value={block.styles.fontSize ?? 16}
          onChange={(e) =>
            onChange({
              ...block,
              styles: {
                ...block.styles,
                fontSize: Number(e.target.value),
              },
            })
          }
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      {/* Text Color */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Text Color
        </label>

        <input
          type="color"
          value={block.styles.color ?? "#111827"}
          onChange={(e) => {
              console.log(e.target.value)

            onChange({
              ...block,
              styles: {
                ...block.styles,
                color: e.target.value,
              },
            })
          }
          }
          className="h-12 w-full cursor-pointer rounded-lg border"
        />
      </div>

      {/* Alignment */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Alignment
        </label>

        <select
          value={block.styles.align ?? "left"}
          onChange={(e) =>
            onChange({
              ...block,
              styles: {
                ...block.styles,
                align: e.target.value as
                  | "left"
                  | "center"
                  | "right",
              },
            })
          }
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* Image URL */}

      {block.type === "image" && (
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">
            Image URL
          </label>

          <input
            type="text"
            value={block.styles.image ?? ""}
            onChange={(e) =>
              onChange({
                ...block,
                styles: {
                  ...block.styles,
                  image: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            placeholder="https://..."
          />
        </div>
      )}

      {/* Button Link */}

      {block.type === "button" && (
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">
            Button Link
          </label>

          <input
            type="text"
            value={block.styles.buttonLink ?? ""}
            onChange={(e) =>
              onChange({
                ...block,
                styles: {
                  ...block.styles,
                  buttonLink: e.target.value,
                },
              })
            }
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            placeholder="/about"
          />
        </div>
      )}
    </aside>
  );
}