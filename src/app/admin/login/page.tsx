import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Beheer — inloggen",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl?: string }>;
}) {
  return (
    <div className="admin-login-page">
      <header className="admin-login-header">
        <Link href="/">← Terug naar website</Link>
      </header>
      <main className="admin-login-main">
        <LoginForm searchParams={searchParams} />
      </main>
      <footer className="admin-login-footer">
        Alleen voor beheerders van BréaTouch
      </footer>
    </div>
  );
}
