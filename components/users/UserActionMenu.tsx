"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 0,
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { can, role } = usePermission();

  const updateMenuPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const menuHeight = 152;
    const gap = 8;
    const hasRoomBelow =
      window.innerHeight - buttonRect.bottom >= menuHeight + gap;

    setMenuPosition({
      top: hasRoomBelow
        ? buttonRect.bottom + gap
        : Math.max(gap, buttonRect.top - menuHeight - gap),
      right: window.innerWidth - buttonRect.right,
    });
  }, []);

  const handleAction = (action: () => void) => {
    setOpen(false);
    action();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !dropdownRef.current?.contains(target)
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

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open, updateMenuPosition]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          updateMenuPosition();
          setOpen(!open);
        }}
        className="rounded-lg p-2 hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] w-44 rounded-xl border border-slate-200 bg-white py-2 shadow-xl"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
            }}
          >
            {can("users:view") && (
              <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={() => handleAction(onView)}>
                <Eye size={16} />
                View
              </button>
            )}

            {can("users:update") && (
              <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-slate-100" onClick={() => handleAction(onEdit)} >
                <Pencil size={16} />
                Edit
              </button>
            )}

            {can("users:crud") && !(role !== "SUPER_ADMIN" && targetUserRole === "SUPER_ADMIN") && (
              <button className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50" onClick={() => handleAction(onDelete)}>
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
