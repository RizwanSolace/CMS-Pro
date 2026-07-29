"use client";

import { useState } from "react";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";

interface Props {
  id: string;
  onClose: () => void;
  refresh: () => void;
}

export default function RejectModal({
  id,
  onClose,
  refresh,
}: Props) {

  const [reason, setReason] = useState("");

  const handleReject = async () => {

    await authService.rejectAdminRequest(
      id,
      reason
    );

    toast.success("Request Rejected");

    refresh();

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="w-96 rounded-xl bg-white p-6">

        <h2 className="text-xl font-bold">
          Reject Request
        </h2>

        <textarea
          rows={5}
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="mt-4 w-full rounded border p-3"
          placeholder="Reason..."
        />

        <div className="mt-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleReject}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  );
}