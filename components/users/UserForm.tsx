"use client";

import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import {User} from "@/types/user";

interface UserFormProps {
  isEdit?: boolean;
  onCancel: () => void;
   user?: User | null;
}

export default function UserForm({
  user=null,
  isEdit = false,
  onCancel,
}: UserFormProps) {
  return (
    <form className="space-y-6">
      {/* Name */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="firstName"
          label="First Name"
          placeholder="John"
           defaultValue={user?.firstName ?? ""}
          required
        />

        <Input
          id="lastName"
          label="Last Name"
          placeholder="Doe"
          required
          defaultValue={user?.lastName?? ""}
        />
      </div>

      {/* Email */}

      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        defaultValue={user?.email??""}
        required
      />

      {/* Phone */}

      <Input
        id="phone"
        label="Phone Number"
        placeholder="9876543210"
        required
         defaultValue={user?.phone??""}
      />

      {/* Role & Status */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" defaultValue={user?.role??""}> 
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>User</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" defaultValue={user?.status?? "Active"}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Password */}

      {!isEdit && (
        <>
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            required
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            required
          />
        </>
      )}

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {isEdit ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}