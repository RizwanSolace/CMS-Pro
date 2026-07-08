"use client";

import { useState } from "react";

interface RoleFormProps {
  initialData?: {
    name: string;
    description: string;
    permissions: string[];
     
  };

  onSubmit: (data: {
    name: string;
    description: string;
    permissions: string[];
  }) => void;
}

const ALL_PERMISSIONS = [
  "users.read",
  "users.write",
  "roles.read",
  "roles.write",
  "cms.read",
  "cms.write",
];
const ROLE_OPTIONS = [
  "Super Admin",
  "Admin",
  "Editor",
  "Viewer",
];


export default function RoleForm({
  initialData,
  onSubmit,
}: RoleFormProps) {
  const [name, setName] = useState(
    initialData?.name ?? ""
  );

  const [description, setDescription] =
    useState(initialData?.description ?? "");

  const [permissions, setPermissions] =
    useState<string[]>(
      initialData?.permissions ?? []
    );

  const togglePermission = (
    permission: string
  ) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit({
          name,
          description,
          permissions,
        });
      }}
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Role Name
        </label>

    <select
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full rounded-lg border border-slate-300 p-3"
>
  {ROLE_OPTIONS.map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ))}
</select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Permissions
        </label>

        <div className="grid grid-cols-2 gap-3">
          {ALL_PERMISSIONS.map((permission) => (
            <label
              key={permission}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={permissions.includes(
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

      <button
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Save Role
      </button>
    </form>
  );
}