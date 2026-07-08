"use client";

import { useState } from "react";

import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableBody from "@/components/common/table/Tablebody";

import { Role } from "@/types/role";

import RoleActionMenu from "./RoleActionMenu";
import ViewRoleModal from "./ViewRoleModal";
import EditRoleModal from "./EditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import RolePermissionBadge from "./RolePermissionBadge";

interface RolesTableProps {
  roles: Role[];
}

export default function RolesTable({
  roles,
}: RolesTableProps) {
  const [selectedRole, setSelectedRole] =
    useState<Role | null>(null);

  const [openView, setOpenView] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  return (
    <>
      <Table>
        <TableHead>
          <tr className="text-left">
            <th className="px-6 py-4">
              Role
            </th>

            <th>Description</th>

            <th>Permissions</th>

            <th>Users</th>

            <th>Created</th>

            <th className="text-center">
              Actions
            </th>
          </tr>
        </TableHead>

        <TableBody>
          {roles.map((role) => (
            <tr
              key={role.id}
              className="hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">
                {role.name}
              </td>

              <td>{role.description}</td>

              <td>
                <RolePermissionBadge
                  permissions={
                    role.permissions
                  }
                />
              </td>

              <td>{role.users}</td>

              <td>{role.createdAt}</td>

              <td className="text-center">
                <RoleActionMenu
                  onView={() => {
                    setSelectedRole(role);
                    setOpenView(true);
                  }}
                  onEdit={() => {
                    setSelectedRole(role);
                    setOpenEdit(true);
                  }}
                  onDelete={() => {
                    setSelectedRole(role);
                    setOpenDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <ViewRoleModal
        open={openView}
        role={selectedRole}
        onClose={() =>
          setOpenView(false)
        }
      />

      <EditRoleModal
        open={openEdit}
        role={selectedRole}
        onClose={() =>
          setOpenEdit(false)
        }
      />

      <DeleteRoleModal
        open={openDelete}
        role={selectedRole}
        onClose={() =>
          setOpenDelete(false)
        }
        onConfirm={() => {
          console.log(selectedRole);
          setOpenDelete(false);
        }}
      />
    </>
  );
}