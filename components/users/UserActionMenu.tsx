"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import usePermission from "@/hooks/usePermission";

interface UserActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  targetUserRole?: string;
}

export default function UserActionMenu( { onView, onEdit, onDelete, targetUserRole }: UserActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { can, role } = usePermission();


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
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
          {can("users:view") && (
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={onView}>
              <Eye size={16} />
              View
            </button>
          )}

          {can("users:update") && (
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={onEdit} >
              <Pencil size={16} />
              Edit
            </button>
          )}

          {can("users:crud") && !(role !== "SUPER_ADMIN" && targetUserRole === "SUPER_ADMIN") && (
            <button className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50" onClick={onDelete}>
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
