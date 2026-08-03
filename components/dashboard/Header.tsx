"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { logout } from "@/lib/auth";

const pageTitles: Array<{ match: string; title: string }> = [
  { match: "/dashboard/cms-pages", title: "CMS Pages" },
  { match: "/dashboard/media", title: "Media Library" },
  { match: "/dashboard/users", title: "Users" },
  { match: "/dashboard/roles", title: "Roles" },
  { match: "/dashboard/settings", title: "Settings" },
  { match: "/dashboard/profile", title: "Profile" },
  { match: "/dashboard/admin-requests", title: "Admin Requests" },
];

export default function Header() {
  const { profile, loading } = useProfile();
  const router = useRouter();
  const pathname = usePathname();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pageTitle =
    pageTitles.find((page) => pathname.startsWith(page.match))?.title ??
    "Dashboard";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (href: string) => {
    setOpenUserMenu(false);
    router.push(href);
  };

  const handleLogout = () => {
    setOpenUserMenu(false);
    logout();
    router.replace("/login");
  };

  return (
    <header className="flex min-h-20 items-center justify-between gap-5 border-b border-slate-200 bg-white px-6 py-3">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight text-slate-950">
          {pageTitle}
        </h1>
        <p className="mt-1 truncate text-sm text-slate-500">
          Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}
        </p>
      </div>

      <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
        <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 md:flex md:items-center md:gap-2">
          <Sparkles size={16} className="text-blue-600" />
          <span>
            {loading
              ? "Loading workspace insights..."
              : `Hello ${profile?.name?.split(" ")[0] ?? "there"}, all systems are operating normally.`}
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 md:flex">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            <Bell size={14} />
            Operational status: good
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            <User size={14} />
            {loading
              ? "Loading role..."
              : profile?.role
              ? `Role: ${profile.role}`
              : "Role unavailable"}
          </span>
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setOpenUserMenu((prev) => !prev)}
            className="flex h-12 items-center gap-3 rounded-xl border border-transparent px-2 py-1 transition hover:border-slate-200 hover:bg-slate-50"
            aria-expanded={openUserMenu}
            aria-haspopup="menu"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {profile?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div className="hidden max-w-36 text-left md:block">
              <h4 className="truncate text-sm font-semibold text-slate-900">
                {loading ? "Loading..." : profile?.name ?? "User"}
              </h4>
              <p className="truncate text-xs text-slate-500">
                {loading ? "" : profile?.email ?? profile?.role}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-500 transition ${
                openUserMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {openUserMenu && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {profile?.name ?? "User"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {profile?.email ?? profile?.role ?? ""}
                </p>
              </div>

              <button
                type="button"
                role="menuitem"
                onClick={() => handleNavigate("/dashboard/profile")}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                <User size={16} />
                Profile
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => handleNavigate("/dashboard/settings")}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                <Settings size={16} />
                Settings
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
