"use client";
import RoleGuard from "@/components/auth/RoleGuard";
import { Plus } from "lucide-react";
import UserFilters from "@/components/users/UserFilters";
import Button from "@/components/common/Button";
import AddUserModal from "@/components/users/AddUserModal";
import UserTable from "@/components/users/UserTable";
import useUsers from "@/hooks/useUsers";
import { mockUsers } from "@/data/mockUsers";
import { useMemo, useState } from "react";


export default function UsersPage() {
  const [search, setSearch] = useState("");
const [role, setRole] = useState("All Roles");
const [status, setStatus] = useState("All Status");
    const { users } = useUsers();
    const filteredUsers = useMemo(() => {
  return mockUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

  const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesRole =
      role === "All Roles" || user.role === role;

    const matchesStatus =
      status === "All Status" || user.status === status;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });
}, [search, role, status]);

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Users
          </h1>
 
          <p className="mt-2 text-slate-500">
            Manage all registered users.
          </p>
        </div>

       <AddUserModal />
       
      </div>
<UserFilters 
  search={search}
  role={role}
  status={status}
   onSearchChange={setSearch}
  onRoleChange={setRole}
  onStatusChange={setStatus}
  onReset={() => {
    setSearch("");
    setRole("All Roles");
    setStatus("All Status");
  }}
 
/>
      {/* Filters */}
<UserTable users={filteredUsers}/>
      {/* Table */}
    </div>
    </RoleGuard>
  );
}