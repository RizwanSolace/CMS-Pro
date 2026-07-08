import AuthLayout from "@/components/auth/AuthLayout";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
        

    <AuthLayout
      title="Verify Email"
      description="Enter the verification code sent to your email address."
    >
     <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
      </Suspense> 
    </AuthLayout>

  );
}