"use client";

import Modal from "@/components/common/Modal";
import UserForm from "./UserForm";
import { User } from "@/types/user";
import { useState } from "react";
import useUsers from "@/hooks/useUsers";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
   onRefresh: () => void;
}

export default function EditUserModal({
  open,
  user,
  onClose,
  onRefresh,
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
        onRefresh={onRefresh}
      />
    </Modal>
  );
}