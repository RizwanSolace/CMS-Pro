import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="max-h-[calc(100vh-24rem)] overflow-y-auto overflow-x-auto rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm">
      <table className="min-w-full">
        {children}
      </table>
    </div>
  );
}
