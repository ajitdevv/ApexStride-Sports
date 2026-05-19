import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminAccess } from "@/lib/supabase/auth";

export default async function AdminLayout({ children }) {
  const access = await requireAdminAccess();

  return <AdminShell accessMessage={access.message}>{children}</AdminShell>;
}
