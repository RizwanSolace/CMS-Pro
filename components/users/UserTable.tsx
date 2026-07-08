import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableBody from "@/components/common/table/Tablebody";
import ViewUserModal from "@/components/users/ViewUserModal";
import { useState} from 'react'
import UserStatusBadge from "./UserStatusBadge";
import UserActionMenu from "./UserActionMenu";
import { mockUsers } from "@/data/mockUsers";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

import { User } from "@/types/user";
interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

const [openView, setOpenView] =
    useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
  return (
    <Table>
      <TableHead>
        <tr className="text-left">
          <th className="px-6 py-4">Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created</th>
          <th className="text-center">Actions</th>
        </tr>
      </TableHead>

      <TableBody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-slate-50"
          >
            <td className="px-6 py-4 font-medium">
              {user.firstName}  {user.lastName}
            </td>

            <td>{user.email}</td>

            <td>{user.phone}</td>

            <td>{user.role}</td>

            <td>
              <UserStatusBadge
                status={user.status}
              />
            </td>

            <td>{user.createdAt}</td>

            <td>
              <UserActionMenu  onView={() => {
        setSelectedUser(user);
        setOpenView(true);
    }}

    onEdit={() => {
      setSelectedUser(user);
        setOpenEdit(true);
    }}

    onDelete={() => {
      setSelectedUser(user);
      setOpenDelete(true)
    }} />
            </td>
          </tr>
        ))}
      </TableBody>
  <ViewUserModal
    open={openView}
    user={selectedUser}
    onClose={() => setOpenView(false)}
/>
<EditUserModal
    open={openEdit}
    user={selectedUser}
    onClose={() => setOpenEdit(false)}
/>
<DeleteUserModal
    open={openDelete}
    user={selectedUser}
    onClose={() => setOpenDelete(false)}
    onConfirm={() => {
        console.log("Delete", selectedUser);
        setOpenDelete(false);
    }}
/>
    </Table>

  );
}