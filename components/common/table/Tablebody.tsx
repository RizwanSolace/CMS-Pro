import { ReactNode } from "react";

interface TableBodyProps {
  children: ReactNode;
}

export default function TableBody({
  children,
}: TableBodyProps) {
  return (
    <tbody className="divide-y divide-slate-200">
      {children}
    </tbody>
  );
}