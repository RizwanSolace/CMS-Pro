"use client";

import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";

interface Props {
  id: string;
  onClose: () => void;
  refresh: () => void;
}

export default function ApproveModal({
  id,
  onClose,
  refresh,
}: Props) {

  const handleApprove = async () => {

    await authService.approveAdminRequest(id);

    toast.success("Request Approved");

    refresh();

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="rounded-xl bg-white p-6">

        <h2 className="text-xl font-bold">
          Approve Request?
        </h2>

        <div className="mt-5 flex gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleApprove}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Approve
          </button>

        </div>

      </div>

    </div>
  );
}