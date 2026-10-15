import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Placeholder, seo } from "@/components/site";
import { TrialForm } from "@/components/TrialForm";
import { GYM } from "@/lib/gym";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact & Free Trial | Paradise Fitness Center", "Request a free trial at Paradise Fitness Center or get in touch by email."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact & Location" />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_1.4fr]">
        <dl className="space-y-4">
          <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Email</dt><dd><a className="underline hover:text-primary" href={`mailto:${GYM.email}`}>{GYM.email}</a></dd></div>
          <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</dt><dd><Placeholder /></dd></div>
          <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Address</dt><dd><Placeholder /></dd></div>
          <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Opening hours</dt><dd><Placeholder /></dd></div>
          <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Map</dt><dd><Placeholder /></dd></div>
        </dl>
        <div id="trial" className="scroll-mt-24">
          <h2 className="text-5xl">Request a free trial</h2>
          <p className="mb-6 mt-2 text-muted-foreground">We'll contact you to confirm a time.</p>
          <TrialForm />
        </div>
      </section>
    </>
  );
}
