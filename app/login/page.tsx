import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import GuestGuard  from "@/components/auth/GuestGuard";

export default function LoginPage() {
  return (
    <GuestGuard>
    <AuthLayout
      title="Welcome Back"
      description="Sign in to continue to your dashboard."
    >
      <LoginForm />
    </AuthLayout>
    </GuestGuard>
  );
}