import AuthLayout from "@/components/auth/AuthLayout";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify Email"
      description="Enter the verification code sent to your email address."
    >
      <VerifyOtpForm />
    </AuthLayout>
  );
}