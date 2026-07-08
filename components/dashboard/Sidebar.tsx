"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";



const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "CMS Pages",
    href: "/dashboard/cms-pages",
    icon: FileText,
  },
  {
    title: "Roles",
    href: "/dashboard/roles",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  router.replace("/login");
};

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-bold text-blue-600">
          CMS Pro
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                pathname === menu.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50" onClick={handleLogout}>
          <LogOut size={20}  />
          Logout
        </button>
      </div>
    </aside>
  );
}