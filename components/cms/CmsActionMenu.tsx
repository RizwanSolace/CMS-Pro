
"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { CmsPage } from "@/types/cms";

// import { PenSquare } from "lucide-react";
// import Link from "next/link";
  
interface UserActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
   onPreview: () => void;
  
}
interface Props {
  page: CmsPage;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPreview: () => void;
}

export default function CmsActionMenu( { onView, onEdit, onDelete ,onPreview,}: UserActionMenuProps) {
  const [open, setOpen] = useState(false);
 
 
  const menuRef = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
      <div className="absolute right-0 top-full mt-2 z-[9999] w-44 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
        <button
  onClick={onPreview}
  className="w-full px-4 py-2 text-left hover:bg-slate-100"
>
    <Eye size={16} />
    Preview
</button>
          <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={onView}>
            <Eye size={16} />
            View
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={onEdit} >
            <Pencil size={16} />
            Edit
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50" onClick={onDelete}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}