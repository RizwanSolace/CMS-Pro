"use client";

import { Search, RotateCcw } from "lucide-react";
import Button from "@/components/common/Button";
interface UserFiltersProps {
  search: string;
  role: string;
  status: string;

  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

 const filter =()=>{
  console.log("filter")
      
}

export default function UserFilters({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onReset,
}: UserFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}

            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Role */}
        <select 
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-600">
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>User</option>
        </select>

        {/* Status */}
        <select 
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-600">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Blocked</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw size={16} className="mr-2"  />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}