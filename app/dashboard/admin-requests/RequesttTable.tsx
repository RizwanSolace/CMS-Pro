"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import RejectModal from "./RejectModal";
import ApproveModal from "./ApproveModal";
import toast from "react-hot-toast";

interface Props {
  requests: any[];
  refresh: () => void;
}

export default function RequestTable({
  requests,
  refresh,
}: Props) {
  const [approveId, setApproveId] = useState("");
  const [rejectId, setRejectId] = useState("");

  return (
    <>
      <table className="w-full rounded-xl border">

        <thead className="bg-slate-100">

          <tr>

            <th>User</th>

            <th>Email</th>

            <th>Reason</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {requests.map((item: any) => (

            <tr key={item._id}>

              <td>{item.userId.name}</td>

              <td>{item.userId.email}</td>

              <td>{item.reason}</td>

              <td>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">

                  {item.status}

                </span>

              </td>

              <td className="space-x-2">

                <button
                  onClick={() => setApproveId(item._id)}
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => setRejectId(item._id)}
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {approveId && (
        <ApproveModal
          id={approveId}
          onClose={() => setApproveId("")}
          refresh={refresh}
        />
      )}

      {rejectId && (
        <RejectModal
          id={rejectId}
          onClose={() => setRejectId("")}
          refresh={refresh}
        />
      )}
    </>
  );
}