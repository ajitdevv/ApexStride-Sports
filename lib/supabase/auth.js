import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getProfileSnapshot(userId) {
  const client = await createSupabaseServerClient();

  if (!client || !userId) {
    return null;
  }

  const { data: profile } = await client.from("profiles").select("role, is_active").eq("id", userId).maybeSingle();
  return profile;
}

export async function getSessionSnapshot() {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      isConfigured: false,
      user: null,
      session: null,
      profile: null,
      isAdmin: false,
    };
  }

  const {
    data: { session },
  } = await client.auth.getSession();

  const profile = session?.user ? await getProfileSnapshot(session.user.id) : null;
  const isAdmin = Boolean(profile && profile.is_active !== false && ["admin", "staff"].includes(profile.role));

  return {
    isConfigured: true,
    user: session?.user ?? null,
    session,
    profile,
    isAdmin,
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
    redirect("/login");
  }

  if (!snapshot.profile) {
    redirect("/account");
  }

  if (snapshot.profile.is_active === false) {
    redirect("/account");
  }

  if (!["admin", "staff"].includes(snapshot.profile.role)) {
    redirect("/account");
  }

  return {
    allowed: true,
    message: `Authenticated as ${snapshot.user.email} with ${snapshot.profile.role} access.`,
    session: snapshot,
  };
}
