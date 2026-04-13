"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { label: "Team", href: "/team" },
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
    <header
      className={styles.header}
      id="site-header"
      style={{ backgroundColor: "#f5f2ee" }}
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="BréaTouch home">
          <Image
            src="/pictures/LOGO.svg"
            alt="BréaTouch Logo"
            width={500}
            height={200}
            className={styles.logoImage}
            priority
            unoptimized
          />
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
