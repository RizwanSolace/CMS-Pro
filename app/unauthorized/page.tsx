import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-4 text-slate-600">You do not have permission to view this page.</p>
        <div className="mt-6">
          <Link href="/dashboard" className="text-blue-600 font-semibold">Go back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
