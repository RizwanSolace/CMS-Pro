"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import UserForm from "./UserForm";

export default function AddUserModal() {
  const [open, setOpen] = useState(false);

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
          onCancel={() => setOpen(false)}
          onRefresh={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}