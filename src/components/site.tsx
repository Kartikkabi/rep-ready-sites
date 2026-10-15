import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Mail } from "lucide-react";
import { GYM } from "@/lib/gym";
import logo from "@/assets/paradise-logo.jpg.asset.json";

const NAV = [
  { to: "/membership", label: "Membership" },
  { to: "/classes", label: "Training" },
  { to: "/facilities", label: "Our Gym" },
  { to: "/trainers", label: "Trainers" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Placeholder({ children = "[PLACEHOLDER]" }: { children?: ReactNode }) {
  return <span className="placeholder-tag">{children}</span>;
}

export function CtaLink({ to = "/contact", children, variant = "primary" }: { to?: "/contact" | "/membership"; children: ReactNode; variant?: "primary" | "outline" }) {
  const base = "inline-flex items-center justify-center rounded-sm px-6 py-3 font-semibold uppercase tracking-wider text-sm transition-transform hover:-translate-y-0.5";
  const v = variant === "primary" ? "bg-primary text-primary-foreground" : "border border-foreground text-foreground hover:bg-foreground hover:text-background";
  return <Link to={to} {...(to === "/contact" ? { hash: "trial" } : {})} className={`${base} ${v}`}>{children}</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="Paradise Fitness Center home">
          <img src={logo.url} alt="Paradise Fitness Center logo" width={48} height={43} className="h-11 w-auto rounded-sm" />
          <span className="font-display text-2xl tracking-wide">PARADISE<span className="text-primary"> FITNESS</span></span>
        </Link>
        <nav className="hidden gap-6 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block"><CtaLink>Free Trial</CtaLink></div>
        <button className="md:hidden p-2" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t px-4 pb-4 md:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl">{n.label}</Link>
          ))}
          <div className="pt-2" onClick={() => setOpen(false)}><CtaLink>Book a Free Trial</CtaLink></div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-navy-deep pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="Paradise Fitness Center logo" width={160} height={143} loading="lazy" className="w-40 rounded-sm" />
          <p className="mt-2 text-sm text-muted-foreground">Train hard. Feel better.</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold uppercase tracking-wider">Visit</p>
          <p>Address: <Placeholder /></p>
          <p>Hours: <Placeholder /></p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold uppercase tracking-wider">Contact</p>
          <p><a className="underline hover:text-primary" href={`mailto:${GYM.email}`}>{GYM.email}</a></p>
          <p>Phone / WhatsApp: <Placeholder /></p>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Paradise Gym</p>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t bg-navy-deep p-3 md:hidden">
      <a href={`mailto:${GYM.email}`} className="flex flex-1 items-center justify-center gap-2 rounded-sm border py-3 text-sm font-semibold uppercase" aria-label="Email Paradise Gym">
        <Mail className="h-4 w-4" /> Email
      </a>
      <Link to="/contact" hash="trial" className="flex flex-[2] items-center justify-center rounded-sm bg-primary py-3 text-sm font-semibold uppercase text-primary-foreground">
        Book a Free Trial
      </Link>
    </div>
  );
}

export function PageHero({ eyebrow, title, img }: { eyebrow: string; title: string; img?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {img && <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28 fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-6xl md:text-8xl">{title}</h1>
      </div>
    </section>
  );
}

export function seo(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
