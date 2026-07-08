"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

import CmsForm from "./CmsForm";

export default function AddCmsModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Page
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add CMS Page"
      >
        <CmsForm
          mode="add"
          onSubmit={(e) => {
            e.preventDefault();

            console.log("Create Page");

            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}