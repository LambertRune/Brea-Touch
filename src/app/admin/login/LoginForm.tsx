"use client";

import { useActionState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { AdminLoadingGate } from "@/components/admin/AdminLoadingGate";

export function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl?: string }>;
}) {
  const { returnUrl } = use(searchParams);
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.ok) {
      router.replace(state.returnUrl);
    }
  }, [state, router]);

  return (
    <AdminLoadingGate loading={pending} label="Inloggen…">
    <div className="card admin-login-card">
      <div className="admin-login-icon">
        <Lock size={26} strokeWidth={2} aria-hidden />
      </div>
      <h1>BréaTouch beheer</h1>
      <p>Log in met je Directus-account om inhoud te bewerken.</p>
      <form action={formAction}>
        <input type="hidden" name="returnUrl" value={returnUrl || "/admin"} />
        <div className="admin-field">
          <label className="admin-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="admin-input"
            autoComplete="email"
            required
          />
        </div>
        <div className="admin-field">
          <label className="admin-label" htmlFor="password">
            Wachtwoord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="admin-input"
            autoComplete="current-password"
            required
          />
        </div>
        {state?.error && (
          <p className="admin-error" role="alert">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          className="btn btn--primary"
          style={{ width: "100%", marginTop: "var(--space-md)" }}
          disabled={pending}
        >
          Inloggen
        </button>
      </form>
    </div>
    </AdminLoadingGate>
  );
}
