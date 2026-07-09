"use client";

import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import {User} from "@/types/user";
import { useState } from "react";
import { userService } from "@/services/user.service";
import useUsers from "@/hooks/useUsers";

interface UserFormProps {
  isEdit?: boolean;
  onCancel: () => void;
   user?: User | null;
   onRefresh: () => void;
}


export default function UserForm({
  user=null,
  isEdit = false,
  onCancel,
 onRefresh,
}: UserFormProps)

 {
 
  const [formData, setFormData] = useState({
  
  name: user?.name ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  role: user?.role ?? "USER",
  isActive: user?.isActive ?? true,
  status: user?.status ?? "ACTIVE",
});
const handleSubmit = async (
    e: React.FormEvent
) => {

    e.preventDefault();
  if(!user){
    return;
  }

    try {
        await userService.updateUser(
            user.id,
            formData
        );
        console.log("Updating:", formData);
console.log("User Id:", user?._id);
await onRefresh();
        alert("User updated successfully");
//onSuccess?.();  
        onCancel();
    } catch (err) {
        console.error(err);
    }
};

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="Name"
          label="Name"
            value={formData.name}
          placeholder="John"
  onChange={(e) =>
        setFormData({
            ...formData,
            name: e.target.value,
        })
    }
          required
        />

       
      </div>

      {/* Email */}

      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
        defaultValue={user?.email??""}
         
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
        required
      />

      {/* Phone */}

      <Input
        id="phone"
        label="Phone Number"
        placeholder="9876543210"
        required
         
         value={formData.phone}
onChange={(e) =>
  setFormData({
    ...formData,
    phone: e.target.value,
  })
}
      />

      {/* Role & Status */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600" value={formData.role} onChange={(e) =>
        setFormData({
            ...formData,
            role: e.target.value,
        })
    }> 
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"  onChange={(e) =>
        setFormData({
            ...formData,
            status: e.target.value,
        })
    } value={formData.status}>
             
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
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