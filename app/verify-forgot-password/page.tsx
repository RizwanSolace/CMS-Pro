import VerifyForgotPasswordForm from "@/components/auth/VerifyForgotPasswordForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Suspense } from 'react';
export default function VerifyForgotPasswordPage() {

  return(
    <AuthLayout>
       <Suspense fallback={<div>Loading...</div>}>
        <VerifyForgotPasswordForm />
      </Suspense>
    </AuthLayout>
  )
}