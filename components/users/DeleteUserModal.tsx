"use client";

import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { User } from "@/types/user";
import { TriangleAlert } from "lucide-react";

interface DeleteUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserModal({
  open,
  user,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      title="Delete User"
      onClose={onClose}
      size="sm"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <TriangleAlert
            size={32}
            className="text-red-600"
          />
        </div>

        <h3 className="mt-5 text-xl font-semibold">
          Delete "{user.firstName} {user.lastName}"?
        </h3>

        <p className="mt-3 text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
          >
            Delete User
          </Button>
        </div>
      </div>
    </Modal>
  );
}