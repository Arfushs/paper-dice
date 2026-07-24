"use client";

import { useLocale } from "./LocaleProvider";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      className="locale-toggle"
      onClick={() => setLocale(locale === "en" ? "tr" : "en")}
      aria-label={locale === "en" ? "Türkçe'ye geç" : "Switch to English"}
      title={locale === "en" ? "Türkçe" : "English"}
    >
      <span className={locale === "en" ? "on" : ""}>EN</span>
      <span className="locale-toggle__sep">/</span>
      <span className={locale === "tr" ? "on" : ""}>TR</span>
    </button>
  );
}
