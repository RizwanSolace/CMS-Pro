import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useDashboard from "@/hooks/useDashboard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  //const { stats, loading } = useDashboard();
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}