"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { sendEmailAction } from "@/app/actions/sendEmail";
import TurnstileWidget, {
  type TurnstileWidgetHandle,
} from "@/components/TurnstileWidget";
import styles from "./page.module.css";

const TIER_FORM_VALUES = ["Brons", "Zilver", "Goud"] as const;

export default function SponsoringForm() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    tier: "",
    message: "",
  });
  const [captchaReady, setCaptchaReady] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const tierOptions = [
    { value: "Brons", label: t.sponsor.tiers.brons.title },
    { value: "Zilver", label: t.sponsor.tiers.zilver.title },
    { value: "Goud", label: t.sponsor.tiers.goud.title },
  ];

  useEffect(() => {
    const tierParam = searchParams.get("tier");
    if (!tierParam) return;
    const normalized = tierParam.trim();
    if (
      !TIER_FORM_VALUES.includes(normalized as (typeof TIER_FORM_VALUES)[number])
    ) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tier: normalized,
      message: prev.message || t.sponsor.tierInterest(normalized),
    }));
  }, [searchParams, t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const turnstileToken = turnstileRef.current?.getToken();
    if (!turnstileToken) {
      setErrorMessage(t.turnstile.missing);
      setFormState("error");
      return;
    }

    setFormState("sending");

    const tierLine = formData.tier
      ? `${t.sponsor.tierLine(formData.tier)}\n`
      : "";
    const companyLine = formData.company
      ? `${t.sponsor.companyLine(formData.company)}\n`
      : "";
    const composedMessage = `${companyLine}${tierLine}\n${formData.message}`;

    try {
      const result = await sendEmailAction({
        name: formData.name,
        email: formData.email,
        subject: "sponsoring",
        message: composedMessage,
        turnstileToken,
      });

      if (result.success) {
        setFormState("sent");
        setFormData({
          name: "",
          company: "",
          email: "",
          tier: "",
          message: "",
        });
        turnstileRef.current?.reset();
        setCaptchaReady(false);
      } else {
        setErrorMessage(result.error ?? t.sponsor.submitError);
        setFormState("error");
        turnstileRef.current?.reset();
        setCaptchaReady(false);
      }
    } catch {
      setErrorMessage(t.sponsor.submitError);
      setFormState("error");
      turnstileRef.current?.reset();
      setCaptchaReady(false);
    }
  };

  return (
    <div className={styles.formSection}>
      <div className={`card ${styles.formCard}`}>
        <h2>{t.sponsor.formTitle}</h2>
        <p className={styles.formDesc}>{t.sponsor.formDesc}</p>

        {formState === "sent" ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>{t.sponsor.successTitle}</h3>
            <p className={styles.formDesc}>{t.sponsor.successDesc}</p>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setFormState("idle")}
            >
              {t.common.newMessage}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="sponsor-name" className={styles.label}>
                  {t.common.name} *
                </label>
                <input
                  id="sponsor-name"
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  autoComplete="name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sponsor-company" className={styles.label}>
                  {t.sponsor.company}
                </label>
                <input
                  id="sponsor-company"
                  type="text"
                  className={styles.input}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sponsor-email" className={styles.label}>
                {t.common.email} *
              </label>
              <input
                id="sponsor-email"
                type="email"
                className={styles.input}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sponsor-tier" className={styles.label}>
                {t.sponsor.preferredTier}
              </label>
              <select
                id="sponsor-tier"
                className={styles.input}
                value={formData.tier}
                onChange={(e) =>
                  setFormData({ ...formData, tier: e.target.value })
                }
              >
                <option value="">{t.sponsor.tierUndecided}</option>
                {tierOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sponsor-message" className={styles.label}>
                {t.common.message} *
              </label>
              <textarea
                id="sponsor-message"
                className={`${styles.input} ${styles.textarea}`}
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />
            </div>

            <TurnstileWidget
              ref={turnstileRef}
              onTokenChange={(token) => setCaptchaReady(Boolean(token))}
            />

            {formState === "error" && errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={formState === "sending" || !captchaReady}
              style={{ width: "100%" }}
            >
              {formState === "sending" ? (
                <>
                  <span className={styles.spinner} /> {t.common.sending}
                </>
              ) : (
                t.common.sendRequest
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
