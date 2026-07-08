"use client";

import Modal from "@/components/common/Modal";
import UserForm from "./UserForm";
import { User } from "@/types/user";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export default function EditUserModal({
  open,
  user,
  onClose,
}: EditUserModalProps) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      title="Edit User"
      onClose={onClose}
      size="lg"
    >
      <UserForm
        isEdit
        user={user}
        onCancel={onClose}
      />
    </Modal>
  );
}