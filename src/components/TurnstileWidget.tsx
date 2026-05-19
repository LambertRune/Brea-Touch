"use client";

import Script from "next/script";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./TurnstileWidget.module.css";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

export type TurnstileWidgetHandle = {
  getToken: () => string | null;
  reset: () => void;
};

type TurnstileWidgetProps = {
  onTokenChange?: (token: string | null) => void;
};

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onTokenChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const tokenRef = useRef<string | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

    const setToken = useCallback(
      (token: string | null) => {
        tokenRef.current = token;
        onTokenChange?.(token);
      },
      [onTokenChange],
    );

    useImperativeHandle(ref, () => ({
      getToken: () => tokenRef.current,
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setToken(null);
      },
    }));

    useEffect(() => {
      if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) {
        return;
      }

      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      setToken(null);
      containerRef.current.replaceChildren();

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "auto",
        callback: (token) => setToken(token),
        "expired-callback": () => setToken(null),
        "error-callback": () => setToken(null),
      });

      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [scriptReady, siteKey, setToken]);

    if (!siteKey) {
      return (
        <p className={styles.configError} role="alert">
          CAPTCHA niet geconfigureerd (NEXT_PUBLIC_TURNSTILE_SITE_KEY).
        </p>
      );
    }

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => setScriptReady(true)}
        />
        <div className={styles.wrap}>
          <div ref={containerRef} className={styles.widget} />
        </div>
      </>
    );
  },
);

export default TurnstileWidget;
