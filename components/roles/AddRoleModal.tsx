"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import RoleForm from "./RoleForm"; 

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
}

const permissions = [
  "Users",
  "Roles",
  "CMS",
  "Settings",
];

export default function AddRoleModal({
  open,
  onClose,
}: AddRoleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [selectedPermissions, setSelectedPermissions] =
    useState<string[]>([]);

  const togglePermission = (
    permission: string
  ) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    console.log({
      name,
      description,
      permissions: selectedPermissions,
    });

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Role"
    >
      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Role Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Enter role"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-2"
            placeholder="Description"
          />
        </div>

        <div>
          <label className="mb-3 block font-medium">
            Permissions
          </label>

          <div className="grid grid-cols-2 gap-3">
            {permissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(
                    permission
                  )}
                  onChange={() =>
                    togglePermission(permission)
                  }
                />

                {permission}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Save Role
          </Button>

        </div>

      </div>
       <RoleForm
    onSubmit={(data)=>{
        console.log(data);
        onClose();
    }}
/>
    </Modal>
   
  );
}