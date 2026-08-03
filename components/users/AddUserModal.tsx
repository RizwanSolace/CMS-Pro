"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import UserForm from "./UserForm";

interface AddUserModalProps {
  onRefresh?: () => Promise<void> | void;
}

export default function AddUserModal({ onRefresh }: AddUserModalProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleRefresh = async () => {
    await onRefresh?.();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Modal
        open={open}
        title="Add New User"
        onClose={() => setOpen(false)}
        size="lg"
      >
        <UserForm
          onCancel={handleClose}
          onRefresh={handleRefresh}
        />
      </Modal>
    </>
  );
}
