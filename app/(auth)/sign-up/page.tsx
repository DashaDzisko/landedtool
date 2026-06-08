"use client";

import {
  AuthLayout,
  CheckEmailMessage,
  MagicLinkForm,
} from "@/components/organisms/auth";
import { Text } from "@/components/atoms/text";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
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
      title="Create account"
      description="Start tracking your job search with AI"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <MagicLinkForm
          submitLabel="Create account"
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
        <Text variant="xs" as="p" className="text-center">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            privacy policy
          </Link>
          .
        </Text>
      </div>
    </AuthLayout>
  );
}
