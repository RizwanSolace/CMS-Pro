
"use client";

import { Eye } from "lucide-react";

interface RoleActionMenuProps {
  onView: () => void;
}

export default function RoleActionMenu({ onView }: RoleActionMenuProps) {
  return (
    <button
      type="button"
      onClick={onView}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-slate-50"
    >
      <Eye size={16} />
      View
    </button>
  );
}