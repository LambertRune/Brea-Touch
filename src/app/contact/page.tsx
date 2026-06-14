"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/components/LocaleProvider";
import styles from "./page.module.css";
import { sendEmailAction } from "../actions/sendEmail";
import TurnstileWidget, {
  type TurnstileWidgetHandle,
} from "@/components/TurnstileWidget";

export default function Contact() {
  const { t } = useLocale();
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaReady, setCaptchaReady] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

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

    try {
      const result = await sendEmailAction({ ...formData, turnstileToken });

      if (result.success) {
        setFormState("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        turnstileRef.current?.reset();
        setCaptchaReady(false);
      } else {
        setErrorMessage(result.error ?? t.contact.submitError);
        setFormState("error");
        turnstileRef.current?.reset();
        setCaptchaReady(false);
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setErrorMessage(t.contact.submitError);
      setFormState("error");
      turnstileRef.current?.reset();
      setCaptchaReady(false);
    }
  };

  return (
    <>
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--rose">{t.contact.badge}</span>
          <h1>{t.contact.title}</h1>
          <p className={styles.headerDesc}>{t.contact.headerDesc}</p>
        </div>
      </section>

      <section className="section" id="contact-info">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCards}>
                <div className={`card ${styles.infoCard} ${styles.infoCardGreen}`}>
                  <div className={styles.infoIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h4>{t.common.email}</h4>
                    <a href="mailto:breatouch@outlook.com">
                      breatouch@outlook.com
                    </a>
                  </div>
                </div>

                <div className={`card ${styles.infoCard} ${styles.infoCardOlive}`}>
                  <div className={styles.infoIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div>
                    <h4>Instagram</h4>
                    <a
                      href="https://www.instagram.com/breatouch"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @breatouch
                    </a>
                  </div>
                </div>

                <div className={`card ${styles.infoCard} ${styles.infoCardRose}`}>
                  <div className={styles.infoIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
                    </svg>
                  </div>
                  <div>
                    <h4>TikTok</h4>
                    <a
                      href="https://www.tiktok.com/@breatouch?_r=1&_t=ZG-957Tpu0syAq"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @breatouch
                    </a>
                  </div>
                </div>

                <div className={`card ${styles.infoCard} ${styles.infoCardBrown}`}>
                  <div className={styles.infoIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </div>
                  <div>
                    <h4>LinkedIn</h4>
                    <a
                      href="https://www.linkedin.com/in/bréatouch-borstkankerpreventie-8797093b9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BréaTouch
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <div className={`card ${styles.formCard}`}>
                <h3>{t.contact.formTitle}</h3>
                <p className={styles.formDesc}>{t.contact.formDesc}</p>

                {formState === "sent" ? (
                  <div className={styles.successMessage} id="form-success">
                    <div className={styles.successIcon}>✓</div>
                    <h4>{t.contact.successTitle}</h4>
                    <p>{t.contact.successDesc}</p>
                    <button
                      className="btn btn--secondary"
                      onClick={() => setFormState("idle")}
                    >
                      {t.common.newMessage}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    id="contact-form"
                  >
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="contact-name" className={styles.label}>
                          {t.common.name}
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          className={styles.input}
                          placeholder={t.contact.namePlaceholder}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="contact-email" className={styles.label}>
                          {t.common.email}
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          className={styles.input}
                          placeholder={t.contact.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-subject" className={styles.label}>
                        {t.contact.subject}
                      </label>
                      <select
                        id="contact-subject"
                        className={styles.input}
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                      >
                        <option value="">{t.contact.subjectPlaceholder}</option>
                        <option value="algemeen">{t.contact.subjectGeneral}</option>
                        <option value="samenwerking">
                          {t.contact.subjectPartnership}
                        </option>
                        <option value="sponsoring">
                          {t.contact.subjectSponsoring}
                        </option>
                        <option value="media">{t.contact.subjectMedia}</option>
                        <option value="anders">{t.contact.subjectOther}</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-message" className={styles.label}>
                        {t.common.message}
                      </label>
                      <textarea
                        id="contact-message"
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder={t.contact.messagePlaceholder}
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
                      id="contact-submit"
                      style={{ width: "100%" }}
                    >
                      {formState === "sending" ? (
                        <>
                          <span className={styles.spinner} />
                          {t.common.sending}
                        </>
                      ) : (
                        t.common.sendMessage
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
