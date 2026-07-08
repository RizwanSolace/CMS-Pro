"use client";

import Modal from "@/components/common/Modal";
import { Role } from "@/types/role";

interface ViewRoleModalProps {
  open: boolean;
  onClose: () => void;
  role: Role | null;
}

export default function ViewRoleModal({
  open,
  onClose,
  role,
}: ViewRoleModalProps) {
  if (!role) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Role Details"
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm text-slate-500">Role Name</p>
          <p className="font-semibold">{role.name}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Description</p>
          <p>{role.description}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Permissions</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {role.permissions.map((permission) => (
              <span
                key={permission}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-slate-500">Assigned Users</p>
            <p>{role.users}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Created</p>
            <p>{role.createdAt}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}