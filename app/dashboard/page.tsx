"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Shield,
  Sparkles,
  User,
  UserCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import DashboardCard from "@/components/dashboard/DashboardCard";
import useCmsPages from "@/hooks/useCms";
import useDashboard from "@/hooks/useDashboard";
import usePermission from "@/hooks/usePermission";
import { CmsPage } from "@/types/cms";

export default function DashboardPage() {
  const { pages } = useCmsPages();
  const { stats, loading } = useDashboard();
  const { role, can } = usePermission();

  const normalizedRole = role ?? "EDITOR";
  const canManageUsers =
    can("users:view") || can("users:update") || can("users:crud");
  const canManageRoles = can("roles:crud");
  const canManageCms =
    can("cms:crud") || can("cms:create") || can("cms:edit:own");
  const canApproveAdmins = can("approveAdmin");

  const cards = [
    canManageUsers && {
      title: normalizedRole === "ADMIN" ? "Active Users" : "Total Users",
      value:
        normalizedRole === "ADMIN"
          ? stats?.activeUsers ?? 0
          : stats?.totalUsers ?? 0,
      icon: Users,
      color: "bg-blue-600",
    },
    canManageCms && {
      title: "CMS Pages",
      value: stats?.totalCmsPages ?? 0,
      icon: FileText,
      color: "bg-green-600",
    },
    canManageRoles && {
      title: "Roles",
      value: stats?.totalRoles ?? 0,
      icon: Shield,
      color: "bg-orange-500",
    },
    canApproveAdmins && {
      title: "Admin Approvals",
      value: stats?.newSignups ?? 0,
      icon: UserPlus,
      color: "bg-purple-600",
    },
    normalizedRole === "EDITOR" && {
      title: "My Workspace",
      value: "CMS",
      icon: Edit3,
      color: "bg-indigo-600",
    },
  ].filter(Boolean) as Array<{
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
  }>;

  const quickActions = [
    canManageCms && {
      href: "/dashboard/cms-pages",
      icon: Edit3,
      title:
        normalizedRole === "EDITOR"
          ? "Create or update content"
          : "Manage CMS pages",
      description:
        normalizedRole === "EDITOR"
          ? "Work on drafts and keep assigned pages fresh."
          : "Review drafts, publish pages, and maintain content.",
    },
    canManageUsers && {
      href: "/dashboard/users",
      icon: Users,
      title: "Manage users",
      description: "Review accounts, roles, and user status.",
    },
    canManageRoles && {
      href: "/dashboard/roles",
      icon: Shield,
      title: "Audit permissions",
      description: "Keep access levels clean and intentional.",
    },
    {
      href: "/dashboard/profile",
      icon: User,
      title: "Update profile",
      description: "Manage your account details and password.",
    },
  ].filter(Boolean) as Array<{
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
  }>;

  const insights = [
    canManageCms && {
      icon: CheckCircle2,
      title: "Published Pages",
      value: stats?.publishedPages ?? 0,
      detail: "pages live on the site",
    },
    canManageCms && {
      icon: Clock3,
      title: "Pending Drafts",
      value: stats?.draftPages ?? 0,
      detail: "pages waiting for review",
    },
    canManageUsers && {
      icon: UserCheck,
      title: "Active Accounts",
      value: stats?.activeUsers ?? 0,
      detail: "users currently active",
    },
  ].filter(Boolean) as Array<{
    icon: LucideIcon;
    title: string;
    value: string | number;
    detail: string;
  }>;

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-slate-600">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              {getRoleLabel(normalizedRole)} workspace
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {getDashboardTitle(normalizedRole)}
            </h2>

            <p className="mt-2 max-w-2xl text-slate-500">
              {getDashboardDescription(normalizedRole)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {canManageUsers && (
              <FocusPill
                label="Active users"
                value={stats?.activeUsers ?? 0}
              />
            )}
            {canManageCms && (
              <FocusPill
                label="Published"
                value={stats?.publishedPages ?? 0}
              />
            )}
            {canManageCms && (
              <FocusPill
                label="Drafts"
                value={stats?.draftPages ?? 0}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {canManageCms && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Content
                </h2>
                <p className="text-sm text-slate-500">
                  Latest pages that may need attention.
                </p>
              </div>

              <Link
                href="/dashboard/cms-pages"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-slate-200">
              {pages.slice(0, 5).map((page: CmsPage) => (
                <div
                  key={page._id || page.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                      {page.title}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      /{page.slug} - Updated {formatDate(page.updatedAt)}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {formatStatus(page.status)}
                  </span>
                </div>
              ))}

              {pages.length === 0 && (
                <p className="py-6 text-sm text-slate-500">
                  No CMS pages found yet.
                </p>
              )}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-500">
              Jump into work allowed for your role.
            </p>
          </div>

          <div className="space-y-3">
            {quickActions.map((action) => (
              <QuickAction
                key={action.title}
                href={action.href}
                icon={action.icon}
                title={action.title}
                description={action.description}
              />
            ))}
          </div>
        </section>
      </div>

      {insights.length > 0 && (
        <section className="grid gap-6 md:grid-cols-3">
          {insights.map((insight) => (
            <Insight
              key={insight.title}
              icon={insight.icon}
              title={insight.title}
              value={insight.value}
              detail={insight.detail}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function getRoleLabel(role: string) {
  return role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
}

function getDashboardTitle(role: string) {
  if (role === "EDITOR") return "Focus on content that needs your attention";
  if (role === "ADMIN") return "Manage users and keep content moving";
  return "Keep content, users, and permissions organized";
}

function getDashboardDescription(role: string) {
  if (role === "EDITOR") {
    return "Create drafts, update assigned pages, and continue content work from one focused place.";
  }

  if (role === "ADMIN") {
    return "Review user activity, maintain CMS pages, and handle day-to-day admin operations.";
  }

  return "Review drafts, publish ready pages, monitor user activity, and audit access from one place.";
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
}

function FocusPill({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 px-4 py-3 text-center">
      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase text-slate-500">
        {label}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="rounded-lg bg-blue-600 p-2 text-white">
        <Icon size={18} />
      </div>

      <div>
        <p className="font-semibold text-slate-900">
          {title}
        </p>
        <p className="text-sm text-slate-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

function Insight({
  icon: Icon,
  title,
  value,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        <Icon size={20} />
      </div>

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">
        {detail}
      </p>
    </div>
  );
}
