"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { sendEmailAction } from "@/app/actions/sendEmail";
import styles from "./page.module.css";

const TIER_OPTIONS = ["Brons", "Zilver", "Goud"] as const;

export default function SponsoringForm() {
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

  useEffect(() => {
    const tierParam = searchParams.get("tier");
    if (!tierParam) return;
    const normalized = tierParam.trim();
    if (!TIER_OPTIONS.includes(normalized as (typeof TIER_OPTIONS)[number])) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tier: normalized,
      message:
        prev.message || `Ik heb interesse in pakket ${normalized}.`,
    }));
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMessage(null);

    const tierLine = formData.tier
      ? `Gewenst pakket: ${formData.tier}\n`
      : "";
    const companyLine = formData.company
      ? `Bedrijf / organisatie: ${formData.company}\n`
      : "";
    const composedMessage = `${companyLine}${tierLine}\n${formData.message}`;

    try {
      const result = await sendEmailAction({
        name: formData.name,
        email: formData.email,
        subject: "sponsoring",
        message: composedMessage,
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
      } else {
        setErrorMessage(
          result.error ??
            "Verzenden mislukt. Probeer opnieuw of mail naar breatouch@outlook.com.",
        );
        setFormState("error");
      }
    } catch {
      setErrorMessage(
        "Verzenden mislukt. Probeer opnieuw of mail naar breatouch@outlook.com.",
      );
      setFormState("error");
    }
  };

  return (
    <div className={styles.formSection}>
      <div className={`card ${styles.formCard}`}>
        <h2>Sponsorovereenkomst</h2>
        <p className={styles.formDesc}>
          Laat je gegevens achter; we nemen contact met je op om de mogelijkheden
          te bespreken.
        </p>

        {formState === "sent" ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Bericht verzonden</h3>
            <p className={styles.formDesc}>
              Bedankt. We lezen je aanvraag en reageren zo snel mogelijk.
            </p>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setFormState("idle")}
            >
              Nieuw bericht
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="sponsor-name" className={styles.label}>
                  Naam *
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
                  Bedrijf / organisatie
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
                E-mail *
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
                Voorkeurspakket
              </label>
              <select
                id="sponsor-tier"
                className={styles.input}
                value={formData.tier}
                onChange={(e) =>
                  setFormData({ ...formData, tier: e.target.value })
                }
              >
                <option value="">Nog niet gekozen / in overleg</option>
                <option value="Brons">Brons</option>
                <option value="Zilver">Zilver</option>
                <option value="Goud">Goud</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sponsor-message" className={styles.label}>
                Bericht *
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

            {formState === "error" && errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={formState === "sending"}
              style={{ width: "100%" }}
            >
              {formState === "sending" ? (
                <>
                  <span className={styles.spinner} /> Verzenden…
                </>
              ) : (
                "Verstuur aanvraag"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
