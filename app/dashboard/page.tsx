import {
  Users,
  FileText,
  Shield,
  UserPlus,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back, Rizwan 👋
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Users"
          value={245}
          icon={Users}
          color="bg-blue-600"
        />

        <DashboardCard
          title="CMS Pages"
          value={18}
          icon={FileText}
          color="bg-green-600"
        />

        <DashboardCard
          title="Roles"
          value={5}
          icon={Shield}
          color="bg-orange-500"
        />

        <DashboardCard
          title="New Signups"
          value={12}
          icon={UserPlus}
          color="bg-purple-600"
        />
      </div>
    </div>
  );
}