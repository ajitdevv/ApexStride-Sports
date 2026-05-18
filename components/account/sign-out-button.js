"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setIsSubmitting(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button disabled={isSubmitting} onClick={handleSignOut} variant="outline">
      {isSubmitting ? "Signing out..." : "Sign out"}
    </Button>
  );
}
