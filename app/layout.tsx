import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--f-display",
  display: "swap",
});

const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--f-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paper & Dice",
  description:
    "A simplified tabletop RPG for playing with friends over the web. Fourteen classes, no spell list, one Story God.",
};

/** Applied before paint so the chosen theme never flashes. */
const THEME_BOOT = `
(function () {
  try {
    var saved = localStorage.getItem("pd-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The boot script sets data-theme before paint, so the attribute intentionally
    // differs from the server's default. suppressHydrationWarning silences the
    // expected mismatch on this element only.
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <header className="site-header">
          <div className="shell site-header__inner">
            <Link href="/" className="wordmark">
              Paper <span className="wordmark__amp">&amp;</span> Dice
            </Link>
            <nav className="site-nav">
              <Link href="/classes" className="navlink">
                Classes
              </Link>
              <Link href="/characters" className="navlink">
                Characters
              </Link>
              <Link href="/play" className="navlink">
                Dice
              </Link>
              <Link href="/table" className="navlink">
                Tables
              </Link>
              <Link href="/rules" className="navlink">
                Rules
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="shell">
            <p>Paper &amp; Dice — 14 classes · 51 subclasses · no spell list</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
