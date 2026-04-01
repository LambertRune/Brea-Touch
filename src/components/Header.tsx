"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Missie & Visie", href: "/missie-visie" },
  { label: "Doe Mee", href: "/doe-mee" },
  { label: "Contact", href: "/contact" },
  // {
  //   label: "Webshop",
  //   href: "https://breatouch.shop",
  //   external: true,
  // },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header} id="site-header">
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="BréaTouch home">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoIcon}
          >
            <rect width="18" height="18" rx="9" fill="#715b52" />
            <rect x="22" width="18" height="18" rx="5" fill="#b2a952" />
            <rect y="22" width="18" height="18" rx="5" fill="#a3b0ad" />
            <circle cx="31" cy="31" r="9" fill="#d8ad9b" />
          </svg>
          <span className={styles.logoText}>
            Bréa<span className={styles.logoAccent}>Touch</span>
          </span>
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          id="main-navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                pathname === item.href ? styles.navLinkActive : ""
              }`}
              onClick={() => setMenuOpen(false)}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
              {item.external && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={styles.externalIcon}
                >
                  <path
                    d="M3.5 1H11V8.5M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Menu openen"
          aria-expanded={menuOpen}
          id="menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
