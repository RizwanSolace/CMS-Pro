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
   const { users, loading, error, fetchUsers } = useUsers();

    const filteredUsers = useMemo(() => {
        console.log("Selected role:", role);
  return users.filter((user) => {
   const fullName = (user.name ?? "").toLowerCase();
    console.log("Comparing:", user.role, role);

  const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);

    const matchesRole =
      role === "All Roles" || user.role == role;

   const matchesStatus =
  status === "All Status" ||
  (status === "ACTIVE" && user.isActive) ||
  (status === "INACTIVE" && !user.isActive);

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );
  });
}, [users,search, role, status]);
if (loading) {
  return (
    <div className="flex justify-center py-20">
      Loading users...
    </div>
  );
}

if (error) {
  return (
    <div className="flex justify-center py-20 text-red-500">
      Failed to load users.
    </div>
  );
}

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

       <AddUserModal  />
       
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
<UserTable users={filteredUsers}     onRefresh={fetchUsers}
/>
      {/* Table */}
    </div>
    </RoleGuard>
  );
}