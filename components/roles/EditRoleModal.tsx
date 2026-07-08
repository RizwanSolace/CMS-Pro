"use client";

import Modal from "@/components/common/Modal";
import RoleForm from "./RoleForm";

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  role: any;
}

export default function EditRoleModal({
  open,
  onClose,
  role,
}: EditRoleModalProps) {
  if (!role) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit CMS Page"
    >
    <RoleForm
    initialData={{
        name: role.name,
        description: role.description,
        permissions: role.permissions,
    }}
    onSubmit={(data)=>{
        console.log(data);
        onClose();
    }}
/>
      
    </Modal>

  );
}