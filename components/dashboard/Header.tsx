"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

export default function Header() {
  const { profile, loading } = useProfile();
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-2 transition hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {profile?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="hidden text-left lg:block">
            <h4 className="text-sm font-semibold text-slate-900">
             {loading ? "Loading..." : profile?.name}
            </h4>

            <p className="text-xs text-slate-500">
             {loading ? "" : profile?.role}
            </p>
          </div>

          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  );
}