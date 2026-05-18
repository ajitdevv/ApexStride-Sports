import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getSessionSnapshot() {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      isConfigured: false,
      user: null,
      session: null,
    };
  }

  const {
    data: { session },
  } = await client.auth.getSession();

  return {
    isConfigured: true,
    user: session?.user ?? null,
    session,
  };
}

export async function requireAuthenticatedUser() {
  const snapshot = await getSessionSnapshot();

  if (!snapshot.isConfigured) {
    return {
      allowed: false,
      reason: "Supabase credentials are not configured yet.",
      session: snapshot,
    };
  }

  if (!snapshot.user) {
    redirect("/login");
  }

  return {
    allowed: true,
    reason: "Authenticated customer session found.",
    session: snapshot,
  };
}

export async function requireAdminAccess() {
  const snapshot = await getSessionSnapshot();

  if (!snapshot.isConfigured) {
    return {
      allowed: false,
      message: "Supabase credentials are not configured yet.",
      session: snapshot,
    };
  }

  if (!snapshot.user) {
    return {
      allowed: false,
      message: "No authenticated admin session detected.",
      session: snapshot,
    };
  }

  const client = await createSupabaseServerClient();
  const { data: profile } = client
    ? await client.from("profiles").select("role, is_active").eq("id", snapshot.user.id).maybeSingle()
    : { data: null };

  if (!profile) {
    return {
      allowed: false,
      message: `Authenticated as ${snapshot.user.email}, but no profile row is available yet.`,
      session: snapshot,
    };
  }

  if (profile.is_active === false) {
    return {
      allowed: false,
      message: `Authenticated as ${snapshot.user.email}, but this profile is inactive.`,
      session: snapshot,
    };
  }

  if (!["admin", "staff"].includes(profile.role)) {
    return {
      allowed: false,
      message: `Authenticated as ${snapshot.user.email}, but this account does not have admin access.`,
      session: snapshot,
    };
  }

  return {
    allowed: true,
    message: `Authenticated as ${snapshot.user.email} with ${profile.role} access.`,
    session: snapshot,
  };
}
