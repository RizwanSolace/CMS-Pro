"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import RequestTable from "./RequesttTable";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await authService.getAdminRequests({
        page: 1,
        limit: 20,
        status: "PENDING",
      });
      console.log("Response:", res);
console.log("res.data:", res.data);
console.log("res.data.data:", res.data.data);

      setRequests(res.data.data.requests);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Admin Requests
      </h1>
      {requests.length === 0 ? (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Admin Requests
          </h2>

          <p className="mt-2 text-slate-500">
            There are currently no pending admin requests.
          </p>
        </div>
      </div>
    ) :(

      <RequestTable
        requests={requests}
        refresh={fetchRequests}
      />
   )}   
    </div>
   
    
  );
}
