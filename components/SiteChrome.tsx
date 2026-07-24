"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";
import ThemeToggle from "./ThemeToggle";
import LocaleToggle from "./LocaleToggle";

/** Header nav and footer — client-side so they follow the language toggle. */
export function SiteHeader() {
  const { tk } = useLocale();
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="wordmark">
          Paper <span className="wordmark__amp">&amp;</span> Dice
        </Link>
        <nav className="site-nav">
          <Link href="/classes" className="navlink">
            {tk("nav.classes")}
          </Link>
          <Link href="/characters" className="navlink">
            {tk("nav.characters")}
          </Link>
          <Link href="/play" className="navlink">
            {tk("nav.dice")}
          </Link>
          <Link href="/table" className="navlink">
            {tk("nav.tables")}
          </Link>
          <Link href="/rules" className="navlink">
            {tk("nav.rules")}
          </Link>
          <LocaleToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { tk } = useLocale();
  return (
    <footer className="site-footer">
      <div className="shell">
        <p>Paper &amp; Dice — {tk("footer.tagline")}</p>
      </div>
    </footer>
  );
}
