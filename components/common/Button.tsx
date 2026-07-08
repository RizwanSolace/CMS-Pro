import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",

        {
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",

          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400":
            variant === "secondary",

          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400":
            variant === "outline",

          "px-3 py-2 text-sm": size === "sm",

          "px-4 py-2.5 text-base": size === "md",

          "px-5 py-3 text-lg": size === "lg",

          "w-full": fullWidth,
        },

        className
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}