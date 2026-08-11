"use client";

import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Button from "@/components/common/Button";
import { User } from "@/types/user";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { userService } from "@/services/user.service";

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
    password: "",
  confirmPassword: "",
});


const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const focusField = (field: string) => {
  const element = document.getElementById(field);

  if (element) {
    element.focus();
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const updateField = (field: string, value: string | boolean) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  setFieldErrors((prev) => {
    if (!prev[field]) return prev;

    const next = { ...prev };
    delete next[field];
    return next;
  });
};

const validateForm = () => {
  const errors: Record<string, string> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(formData.phone.trim())) {
    errors.phone = "Phone number must be 10 digits.";
  }

  if (!["ADMIN", "EDITOR"].includes(formData.role)) {
    errors.role = "Please select a role.";
  }

  if (!isEdit) {
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm the password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
};

const getBackendFieldErrors = (data: any) => {
  const errors: Record<string, string> = {};

  if (Array.isArray(data?.errors)) {
    data.errors.forEach((error: any) => {
      const rawField = error.field || error.path || error.param;
      const message = error.message || error.msg;

      if (rawField && message) {
        const field = rawField.replace(/^body\./, "");
        errors[field] = message;
      }
    });
  } else if (data?.errors && typeof data.errors === "object") {
    Object.entries(data.errors).forEach(([rawField, value]) => {
      const field = rawField.replace(/^body\./, "");
      const message = Array.isArray(value) ? value[0] : value;

      if (typeof message === "string") {
        errors[field] = message;
      }
    });
  }

  return errors;
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];

      setFieldErrors(validationErrors);
      focusField(firstField);
      toast.error(validationErrors[firstField]);
      return;
    }

    setFieldErrors({});

    if (isEdit) {
      if (!user) return;

      await userService.updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.isActive,
      });

      toast.success("User updated successfully.");
    } else {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      let response: any;

      switch (formData.role) {
        case "ADMIN":
          response = await userService.createAdmin(payload);
          break;

        case "EDITOR":
          response = await userService.createEditor(payload);
          break;

        default:
          throw new Error("Please select a valid role to create the user.");
      }

      const successMessage =
        response?.message ||
        (formData.role === "ADMIN"
          ? "Admin created successfully."
          : formData.role === "EDITOR"
          ? "Editor created successfully."
          : "User created successfully.");

      toast.success(successMessage);
    }

    await onRefresh();
    onCancel();
  } catch (err: any) {
  console.error(err);

  const data = err?.response?.data;

  setFieldErrors({});

  const errors = getBackendFieldErrors(data);

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);

    const firstField = Object.keys(errors)[0];

    if (firstField) {
      focusField(firstField);
      toast.error(errors[firstField]);
      return;
    }
  }

  toast.error(
    data?.message ||
    err?.message ||
    "Failed to save user."
  );
}
 }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          label="Name"
            value={formData.name}
          placeholder="John"
  onChange={(e) =>
    updateField(
      "name",
      e.target.value.replace(/[^a-zA-Z\s]/g, "")
    )
  }
          error={fieldErrors.name}
          required
        />

       
      </div>

      {/* Email */}

      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="john@example.com"
       value={formData.email}

         
  onChange={(e) => updateField("email", e.target.value)}
        error={fieldErrors.email}
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
    updateField(
      "phone",
      e.target.value.replace(/\D/g, "").slice(0, 10)
    )
  }
        error={fieldErrors.phone}
        maxLength={10}
        
      />
      {/* Role & Status */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role <span className="text-red-500">*</span>
          </label>

          <select id="role" className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600 ${
            fieldErrors.role ? "border-red-500" : "border-slate-300"
          }`} value={formData.role} onChange={(e) => updateField("role", e.target.value)} required>
             <option value="DEFAULT">Select Role</option>       
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
           
          </select>
          {fieldErrors.role && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.role}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"  onChange={(e) => updateField("status", e.target.value)} value={formData.status}>
             
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
            value={formData.password}
  onChange={(e) => updateField("password", e.target.value)}
            error={fieldErrors.password}
          />
            <p className="mt-2 text-xs text-slate-500">
    Password must contain at least 8 characters, including
    uppercase and lowercase letters, a number, and a special
    character.
  </p>


          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            required
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            error={fieldErrors.confirmPassword}
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
