import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/Registerform";

export default function SignupPage() {
  return (
    <AuthLayout
     title="Create Account"
      description="Create your account to get started."
    >
      <SignupForm />
    </AuthLayout>
  );
}