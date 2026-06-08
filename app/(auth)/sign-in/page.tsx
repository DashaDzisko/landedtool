"use client";

import {
  AuthLayout,
  CheckEmailMessage,
  MagicLinkForm,
} from "@/components/organisms/auth";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (email) {
    return (
      <AuthLayout title="Check your email">
        <CheckEmailMessage email={email} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Sign in"
      description="Enter your email to receive a magic link"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <MagicLinkForm
        loading={loading}
        onSubmit={async (value) => {
          setLoading(true);
          const supabase = createClient();
          const { error } = await supabase.auth.signInWithOtp({
            email: value,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          });
          setLoading(false);
          if (error) {
            toast({
              title: "Could not send magic link",
              description: error.message,
              variant: "error",
            });
            return;
          }
          setEmail(value);
          toast({
            title: "Magic link sent",
            description: "Check your inbox to continue.",
            variant: "success",
          });
        }}
      />
    </AuthLayout>
  );
}
