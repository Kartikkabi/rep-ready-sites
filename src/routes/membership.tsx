import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Placeholder, seo } from "@/components/site";
import { PLANS } from "@/lib/gym";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/membership")({
  head: () => seo("Membership Plans | Paradise Fitness Center", "Paradise Fitness Center membership: ₹6,000 for 6 months. Enquire or request a free trial."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Join" title="Membership" img={hero} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-sm border-2 border-primary bg-card p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{p.name}</p>
              <p className="mt-2 font-display text-8xl">{p.price}</p>
              <p className="text-muted-foreground">{p.note}. What's included: <Placeholder /></p>
              <div className="mt-6"><CtaLink>Enquire about this plan</CtaLink></div>
            </div>
          ))}
          <div className="rounded-sm border border-dashed border-primary p-8">
            <p className="font-display text-4xl">Other plans</p>
            <p className="mt-2 text-muted-foreground">Monthly, quarterly, annual or student pricing <Placeholder /></p>
            <p className="mt-2 text-muted-foreground">Joining fee & terms <Placeholder /></p>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Payments are made at the gym. Online payment isn't available.</p>
      </section>
    </>
  );
}
