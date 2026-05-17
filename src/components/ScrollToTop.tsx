"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Force window to exact y=0 after route change (smooth, then snap). */
function snapScrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToTopSmooth() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;

  // Global `scroll-behavior: smooth` on <html> often stops a few px above 0.
  root.style.scrollBehavior = "auto";

  if (window.scrollY === 0) {
    snapScrollToTop();
    root.style.scrollBehavior = previousBehavior;
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const finish = () => {
    snapScrollToTop();
    root.style.scrollBehavior = previousBehavior;
  };

  if ("onscrollend" in window) {
    const onScrollEnd = () => finish();
    window.addEventListener("scrollend", onScrollEnd, { once: true });
    setTimeout(() => {
      window.removeEventListener("scrollend", onScrollEnd);
      if (window.scrollY > 0) finish();
    }, 500);
  } else {
    setTimeout(finish, 450);
  }
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    scrollToTopSmooth();
  }, [pathname]);

  return null;
}
