"use client"
import { mockRoles } from "@/components/roles/mockroles";
import RolesTable from "@/components/roles/RolesTable";
import Button from "@/components/common/Button";
import AddRoleModal from "@/components/roles/AddRoleModal";
import { useState } from "react";

export default function RolesPage() {
    const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-5xl font-bold">
            Roles
          </h1>

          <p className="mt-2 text-slate-500">
            Manage system roles and permissions.
          </p>
        </div>

        <Button
          onClick={() => setOpenAdd(true)}
        >
          Add Role
        </Button>
      </div>

      <RolesTable roles={mockRoles} />
      <AddRoleModal
  open={openAdd}
  onClose={() => setOpenAdd(false)}
/>
    </div>
  );
}