"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SOCIAL_LINK_LIST } from "@/lib/socialLinks";
import { SocialIcon } from "@/components/SocialIcon";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.mission, href: "/missie-visie" },
    { label: t.nav.selfExam, href: "/zelfonderzoek" },
    { label: t.nav.join, href: "/doe-mee" },
    { label: t.nav.sponsor, href: "/sponsoring-contact" },
    { label: t.nav.contact, href: "/contact" },
  ];

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
        <Link href="/" className={styles.logo} aria-label={t.common.homeAria}>
          <Image
            src="/pictures/logo.webp"
            alt="BréaTouch"
            width={1100}
            height={600}
            className={styles.logoImage}
            priority
            unoptimized
          />
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          id="main-navigation"
        >
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.navLang}>
            <LanguageSwitcher />
          </div>
          <div className={styles.navSocials} aria-label={t.common.followUs}>
            {SOCIAL_LINK_LIST.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navSocialLink}
                aria-label={social.ariaLabel}
                onClick={() => setMenuOpen(false)}
              >
                <SocialIcon network={social.network} size={24} />
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.headerLangDesktop}>
            <LanguageSwitcher />
          </div>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={toggleMenu}
            aria-label={t.common.menuOpen}
            aria-expanded={menuOpen}
            id="menu-toggle"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
