"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Locale } from "@/data/types";
import { tk, tl, type UIKey } from "@/lib/i18n";
import type { L } from "@/data/types";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** UI chrome string by key, with optional {placeholder} vars. */
  tk: (key: UIKey, vars?: Record<string, string | number>) => string;
  /** Data `{en, tr}` pair. */
  tl: (value: L | undefined) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

const KEY = "pd-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read the saved choice after mount (localStorage is client-only). A brief
  // English-first flash is fine — locale doesn't repaint the layout the way a
  // theme does.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "tr" || saved === "en") setLocaleState(saved);
    } catch {
      /* private mode */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* private mode */
    }
    document.documentElement.setAttribute("lang", l);
  }, []);

  const value: LocaleCtx = {
    locale,
    setLocale,
    tk: (key, vars) => tk(key, locale, vars),
    tl: (v) => tl(v, locale),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback so a component rendered outside the provider still works.
    return {
      locale: "en",
      setLocale: () => {},
      tk: (key, vars) => tk(key, "en", vars),
      tl: (v) => tl(v, "en"),
    };
  }
  return ctx;
}
