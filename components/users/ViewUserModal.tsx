"use client";

import Modal from "@/components/common/Modal";
import { User } from "@/types/user";
import UserStatusBadge from "./UserStatusBadge";

interface ViewUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export default function ViewUserModal({
  open,
  user,
  onClose,
}: ViewUserModalProps) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      title="User Details"
      onClose={onClose}
      size="md"
    >
      <div className="grid grid-cols-2 gap-6">
        <Info
          label="First Name"
          value={user.firstName}
        />

        <Info
          label="Last Name"
          value={user.lastName}
        />

        <Info
          label="Email"
          value={user.email}
        />

        <Info
          label="Phone"
          value={user.phone}
        />

        <Info
          label="Role"
          value={user.role}
        />

      <UserStatusBadge status={user.status} />

        <Info
          label="Created"
          value={user.createdAt}
        />
      </div>
    </Modal>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}