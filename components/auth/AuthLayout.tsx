import { ReactNode } from "react";
import { ShieldCheck, Users, LayoutDashboard, FileText } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description: "JWT based authentication with role-based access control.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Manage users, roles and permissions from one place.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description: "Monitor activities and manage your CMS efficiently.",
  },
  {
    icon: FileText,
    title: "Dynamic CMS",
    description: "Create and update website pages without writing code.",
  },
];

export default function AuthLayout({
  children,
  title = "Create Account",
  description = "Create your account to get started.",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-12 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold backdrop-blur">
                  C
                </div>

                <div>
                  <h2 className="text-2xl font-bold">CMS Pro</h2>
                  <p className="text-sm text-blue-100">
                    Content Management Platform
                  </p>
                </div>
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                {title}
              </h1>

              <p className="mt-5 max-w-md text-lg leading-8 text-blue-100">
                {description}
              </p>

              <div className="mt-12 space-y-6">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur"
                    >
                      <div className="rounded-lg bg-white/20 p-3">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm text-blue-100">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-blue-100">
              © 2026 CMS Pro. All rights reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center bg-white p-6 md:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}