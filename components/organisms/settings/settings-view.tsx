"use client";

import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { ProfileForm } from "@/components/organisms/settings/profile-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  deleteUserData,
  exportUserData,
  fetchProfile,
  updateProfile,
} from "@/lib/db/profile";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Download, SignOut, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

function SettingsCard({
  title,
  children,
  danger,
}: {
  title: string;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={cn(
        "bento-card flex flex-col gap-3 p-5",
        danger && "border-red-500/20"
      )}
    >
      <Heading level="h3" className={danger ? "text-red-400" : undefined}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

/** Single-view settings — no tabs; everything visible in two columns. */
export function SettingsView() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [cv, setCv] = useState("");
  const [targetRoles, setTargetRoles] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (cancelled) return;

        setEmail(user?.email ?? null);

        const profile = await fetchProfile();
        if (cancelled || !profile) return;

        setDisplayName(profile.displayName ?? "");
        setCv(profile.cv ?? "");
        setTargetRoles(profile.targetRoles ?? "");
      } catch (err) {
        if (!cancelled) {
          toast({
            title: "Could not load settings",
            description:
              err instanceof Error ? err.message : "Something went wrong",
            variant: "error",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once on mount
  }, []);

  const handleSave = async (data: {
    name: string;
    cv: string;
    targetRoles: string;
  }) => {
    setSaving(true);
    try {
      const profile = await updateProfile({
        displayName: data.name,
        cv: data.cv,
        targetRoles: data.targetRoles,
      });
      setDisplayName(profile.displayName ?? "");
      setCv(profile.cv ?? "");
      setTargetRoles(profile.targetRoles ?? "");
      toast({ title: "Profile saved", variant: "success" });
      router.refresh();
    } catch (err) {
      toast({
        title: "Could not save profile",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Could not sign out",
        description: error.message,
        variant: "error",
      });
      return;
    }
    router.push("/sign-in");
    router.refresh();
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportUserData();
      toast({
        title: "Export complete",
        description: "Your data download has started.",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Export failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteUserData();
      const supabase = createClient();
      await supabase.auth.signOut();
      toast({ title: "Account data deleted" });
      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast({
        title: "Could not delete account",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="anim-stagger flex flex-col gap-5">
          <SettingsCard title="Profile">
            <ProfileForm
              initialName={displayName}
              initialCv={cv}
              initialTargetRoles={targetRoles}
              loading={loading}
              saving={saving}
              onSave={handleSave}
            />
          </SettingsCard>
        </div>

        <div className="anim-stagger flex flex-col gap-5">
          <SettingsCard title="Account">
            <Text variant="small" className="text-muted">
              Signed in as{" "}
              <span className="text-foreground">
                {loading ? "…" : (email ?? "Unknown")}
              </span>
            </Text>
            <Button
              variant="secondary"
              size="sm"
              className="w-fit"
              onClick={handleSignOut}
            >
              <SignOut size={16} />
              Sign out
            </Button>
          </SettingsCard>

          <SettingsCard title="Data & privacy">
            <Text variant="small" className="text-muted">
              Download all applications and profile data as JSON.
            </Text>
            <Button
              variant="secondary"
              size="sm"
              className="w-fit"
              disabled={exporting || loading}
              onClick={handleExport}
            >
              <Download size={16} />
              {exporting ? "Exporting…" : "Export data"}
            </Button>
          </SettingsCard>

          <SettingsCard title="Danger zone" danger>
            <Text variant="small" className="text-muted">
              Permanently delete your applications, chats, and profile. This
              cannot be undone.
            </Text>
            <Button
              variant="secondary"
              size="sm"
              className="w-fit border-red-500/30 text-red-400 hover:bg-red-500/10"
              disabled={loading}
              onClick={() => setDeleteOpen(true)}
            >
              <Trash size={16} />
              Delete account
            </Button>
          </SettingsCard>
        </div>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete all account data?</DialogTitle>
            <DialogDescription>
              This removes your profile, applications, and chat history from
              Landed. You will be signed out immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete everything"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
