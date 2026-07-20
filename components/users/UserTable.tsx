import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableBody from "@/components/common/table/Tablebody";
import ViewUserModal from "@/components/users/ViewUserModal";
import { useState } from "react";
import UserStatusBadge from "./UserStatusBadge";
import UserActionMenu from "./UserActionMenu";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

import { User } from "@/types/user";
//import useUsers from "@/hooks/useUsers";
interface UserTableProps {
  users: User[];
  onRefresh: () => void;
}

export default function UserTable({ users, onRefresh, }: UserTableProps) {
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);
    
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const formatRole = (role: string) =>
    role
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Table>
        <TableHead>
          <tr className="text-left">
            <th className="w-[17%] px-6 py-4">Name</th>
            <th className="w-[25%] px-6 py-4">Email</th>
            <th className="w-[15%] px-6 py-4">Phone</th>
            <th className="w-[14%] px-6 py-4">Role</th>
            <th className="w-[11%] px-6 py-4">Status</th>
            <th className="w-[12%] px-6 py-4">Created</th>
            <th className="w-[6%] px-6 py-4 text-center">Actions</th>
          </tr>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <tr
              key={user._id || user.id}
              className="hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {user.name}
              </td>

              <td className="max-w-72 px-6 py-4">
                <span className="block truncate" title={user.email}>
                  {user.email}
                </span>
              </td>

              <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>

              <td className="px-6 py-4">
                <span className="inline-flex whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {formatRole(user.role)}
                </span>
              </td>
               
              <td className="px-6 py-4">
                <UserStatusBadge
                  status={user.isActive ? "Active" : "Inactive"}
                />
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                {formatDate(user.createdAt)}
              </td>

              <td className="px-6 py-4 text-center">
                <UserActionMenu
                  targetUserRole={user.role}
                  onView={() => {
                    setSelectedUser(user);
                    setOpenView(true);
                  }}
                  onEdit={() => {
                    setSelectedUser(user);
                    setOpenEdit(true);
                  }}
                  onDelete={() => {
                    setSelectedUser(user);
                    setOpenDelete(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <ViewUserModal
        open={openView}
        user={selectedUser}
        onClose={() => setOpenView(false)}
      />
      <EditUserModal
        open={openEdit}
        user={selectedUser}
        onClose={() => setOpenEdit(false)}
        onRefresh={onRefresh}
      />
      <DeleteUserModal
        open={openDelete}
        user={selectedUser}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await onRefresh();
          setOpenDelete(false);
        }}
      />
    </>
  );
}
