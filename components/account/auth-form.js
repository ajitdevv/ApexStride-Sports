"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const defaultMessages = {
  login: {
    success: "Signed in successfully.",
    submit: "Sign in",
  },
  signup: {
    success: "Account created successfully. You can now sign in.",
    submit: "Create account",
  },
};

export function AuthForm({ mode }) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const messages = defaultMessages[mode];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!supabase) {
      setStatus({
        type: "error",
        message: "Supabase is not configured yet.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setStatus({ type: "error", message: error.message });
        setIsSubmitting(false);
        return;
      }

      setStatus({ type: "success", message: messages.success });
      setIsSubmitting(false);
      router.push("/login");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
      setIsSubmitting(false);
      return;
    }

    setStatus({ type: "success", message: messages.success });
    setIsSubmitting(false);
    router.push("/account");
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" ? (
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Full name
          <input
            className="h-12 rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Enter your full name"
            required
            type="text"
            value={fullName}
          />
        </label>
      ) : null}

      <label className="grid gap-2 text-sm font-medium text-foreground">
        Email
        <input
          className="h-12 rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-foreground">
        Password
        <input
          className="h-12 rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-ring"
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
          type="password"
          value={password}
        />
      </label>

      {status.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === "error"
              ? "border-danger/20 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Please wait..." : messages.submit}
      </Button>
    </form>
  );
}
