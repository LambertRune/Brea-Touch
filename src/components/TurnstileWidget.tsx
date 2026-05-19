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

const TURNSTILE_LOAD_ERROR =
  "CAPTCHA kon niet laden. Voeg dit domein toe in Cloudflare Turnstile (bijv. breatouch.phiosk.be).";

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onTokenChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const tokenRef = useRef<string | null>(null);
    const onTokenChangeRef = useRef(onTokenChange);
    const [scriptReady, setScriptReady] = useState(false);
    const [widgetError, setWidgetError] = useState<string | null>(null);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

    onTokenChangeRef.current = onTokenChange;

    const notifyToken = useCallback((token: string | null) => {
      tokenRef.current = token;
      onTokenChangeRef.current?.(token);
    }, []);

    useImperativeHandle(ref, () => ({
      getToken: () => tokenRef.current,
      reset: () => {
        setWidgetError(null);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        notifyToken(null);
      },
    }));

    useEffect(() => {
      if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) {
        return;
      }

      if (widgetIdRef.current) {
        return;
      }

      setWidgetError(null);
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "auto",
        callback: (token) => {
          setWidgetError(null);
          notifyToken(token);
        },
        "expired-callback": () => notifyToken(null),
        "error-callback": () => {
          notifyToken(null);
          setWidgetError(TURNSTILE_LOAD_ERROR);
        },
      });

      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
        notifyToken(null);
      };
    }, [scriptReady, siteKey, notifyToken]);

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
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
        <div className={styles.wrap}>
          <div ref={containerRef} className={styles.widget} />
        </div>
        {widgetError && (
          <p className={styles.configError} role="alert">
            {widgetError}
          </p>
        )}
      </>
    );
  },
);

export default TurnstileWidget;
