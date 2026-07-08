import { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

export default function TableHead({
  children,
}: TableHeadProps) {
  return (
    <thead className="bg-slate-50">
      {children}
    </thead>
  );
}