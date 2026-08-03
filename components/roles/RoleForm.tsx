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
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          required
        >
          <option value="" disabled>
            Select a role
          </option>
          {ROLE_OPTIONS.map((roleOption) => (
            <option key={roleOption} value={roleOption}>
              {roleOption}
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

        <div className="grid gap-3 sm:grid-cols-2">
          {ALL_PERMISSIONS.map((permission) => {
            const isSelected = permissions.includes(permission);

            return (
              <label
                key={permission}
                className={`inline-flex cursor-pointer items-center justify-between rounded-full border px-3 py-2 text-sm font-medium transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <span>{permission}</span>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => togglePermission(permission)}
                  className="hidden"
                />
              </label>
            );
          })}
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