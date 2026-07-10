"use client";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Shield,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import DashboardCard from "@/components/dashboard/DashboardCard";
import { mockCmsPages } from "@/data/mockCmsPages";
import { mockUsers } from "@/data/mockUsers";
import useDashboard from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();
  if (loading) {
  return (
    <div className="flex justify-center py-20">
      Loading Dashboard...
    </div>
  );  

   }
  const activeUsers = mockUsers.filter(
    (user) => user.status === "Active"
  ).length;
  const publishedPages = mockCmsPages.filter(
    (page) => page.status === "Published"
  ).length;
  const draftPages = mockCmsPages.filter(
    (page) => page.status === "Draft"
  ).length;
   
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              Today&apos;s focus
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Keep content fresh and users organized
            </h2>

            <p className="mt-2 max-w-2xl text-slate-500">
              Review drafts, publish ready pages, and check recent user
              activity from one place.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <FocusPill
              label="Active users"
              value={stats?.activeUsers ?? 0}
            />
            <FocusPill
              label="Published"
              value={stats?.publishedPages ?? 0}
            />
            <FocusPill
              label="Drafts"
              value={stats?.draftPages ?? 0}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={Users}
          color="bg-blue-600"
        />

        <DashboardCard
          title="CMS Pages"
          value={stats?.totalCmsPages ?? 0}
          icon={FileText}
          color="bg-green-600"
        />

        <DashboardCard
          title="Roles"
          value={stats?.totalRoles ?? 0}
          icon={Shield}
          color="bg-orange-500"
        />

        <DashboardCard
          title="New Signups"
          value={stats?.newSignups ?? 0}
          icon={UserPlus}
          color="bg-purple-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
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
            {mockCmsPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {page.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    /{page.slug} - Updated {page.updatedAt}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {page.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-500">
              Jump into common admin work.
            </p>
          </div>

          <div className="space-y-3">
            <QuickAction
              href="/dashboard/cms-pages"
              icon={Edit3}
              title="Update CMS pages"
              description="Review drafts and publish content."
            />
            <QuickAction
              href="/dashboard/users"
              icon={Users}
              title="Manage users"
              description="Check roles, status, and profiles."
            />
            <QuickAction
              href="/dashboard/roles"
              icon={Shield}
              title="Audit permissions"
              description="Keep access levels clean."
            />
          </div>
        </section>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <Insight
          icon={CheckCircle2}
          title="Content Health"
          value={stats?.publishedPages ?? 0}
          detail="pages are published"
        />
        <Insight
          icon={Clock3}
          title="Pending Drafts"
          value={stats?.draftPages ?? 0}
          detail="pages waiting for review"
        />
        <Insight
          icon={Users}
          title="User Activity"
          value={stats?.activeUsers ?? 0}
          detail="accounts currently active"
        />
      </section>
    </div>
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
