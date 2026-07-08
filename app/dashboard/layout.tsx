import { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AuthGuard from "@/components/auth/AuthGuard";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <AuthGuard>
    <DashboardLayout>
      {children}
    </DashboardLayout>
    </AuthGuard>
  );
}