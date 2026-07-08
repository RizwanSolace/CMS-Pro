import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-visible">
        <table className="min-w-full">
          {children}
        </table>
      </div>
  
  );
}