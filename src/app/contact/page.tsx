"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./page.module.css";
import { sendEmailAction } from "../actions/sendEmail";

export default function Contact() {
  const [formState, setFormState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const result = await sendEmailAction(formData);

      if (result.success) {
        setFormState("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Failed to send email:", result.error);
        setFormState("error");
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setFormState("error");
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--rose">Contact</span>
          <h1>Neem contact op</h1>
          <p className={styles.headerDesc}>
            Heb je een vraag, wil je samenwerken of wil je meer weten over
            BréaTouch? We horen graag van je!
          </p>
        </div>
      </section>

      <section className="section" id="contact-info">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
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
                    <h4>E-mail</h4>
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

            {/* Contact Form */}
            <div className={styles.formWrapper}>
              <div className={`card ${styles.formCard}`}>
                <h3>Stuur ons een bericht</h3>
                <p className={styles.formDesc}>
                  Vul het formulier in en we nemen zo snel mogelijk contact met
                  je op.
                </p>

                {formState === "sent" ? (
                  <div className={styles.successMessage} id="form-success">
                    <div className={styles.successIcon}>✓</div>
                    <h4>Bericht verzonden!</h4>
                    <p>
                      Bedankt voor je bericht. We nemen zo snel mogelijk contact
                      met je op.
                    </p>
                    <button
                      className="btn btn--secondary"
                      onClick={() => setFormState("idle")}
                    >
                      Nieuw bericht
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
                          Naam
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          className={styles.input}
                          placeholder="Jouw naam"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="contact-email" className={styles.label}>
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          className={styles.input}
                          placeholder="jouw@email.com"
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
                        Onderwerp
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
                        <option value="">Kies een onderwerp</option>
                        <option value="algemeen">Algemene vraag</option>
                        <option value="samenwerking">Samenwerking</option>
                        <option value="sponsoring">Sponsoring</option>
                        <option value="media">Media & pers</option>
                        <option value="anders">Anders</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-message" className={styles.label}>
                        Bericht
                      </label>
                      <textarea
                        id="contact-message"
                        className={`${styles.input} ${styles.textarea}`}
                        placeholder="Schrijf je bericht hier..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    {formState === "error" && (
                      <div className={styles.errorMessage}>
                        Er is iets misgegaan. Probeer het opnieuw of stuur een
                        e-mail naar breatouch@outlook.com.
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn--primary btn--lg"
                      disabled={formState === "sending"}
                      id="contact-submit"
                      style={{ width: "100%" }}
                    >
                      {formState === "sending" ? (
                        <>
                          <span className={styles.spinner} />
                          Verzenden...
                        </>
                      ) : (
                        "Verstuur bericht"
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
