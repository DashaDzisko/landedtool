import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Kanban board", href: "#waitlist" },
      { label: "AI co-pilot", href: "#waitlist" },
      { label: "Pipeline", href: "#waitlist" },
      { label: "Pricing", href: "#waitlist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#waitlist" },
      { label: "Blog", href: "#waitlist" },
      { label: "Contact", href: "#waitlist" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function PromoFooter() {
  return (
    <footer className="promo-footer">
      <div className="promo-footer__inner">
        <div className="promo-footer__brand">
          <Link href="/promo" className="promo-footer__logo">
            <Image src="/promo/Sun.png" alt="" width={32} height={32} />
            <span>Landed</span>
          </Link>
          <p className="promo-footer__tagline">
            The sun never sets on your career path.
          </p>
          <Link
            href="/sign-in"
            className="promo__btn promo__btn--primary promo-footer__cta"
          >
            Get started
          </Link>
        </div>

        <div className="promo-footer__cols">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="promo-footer__col">
              <p className="promo-footer__heading">{col.heading}</p>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="promo-footer__link"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="promo-footer__bar">
        <span>© 2026 Landed. All rights reserved.</span>
        <span>From applied to offer.</span>
      </div>
    </footer>
  );
}
