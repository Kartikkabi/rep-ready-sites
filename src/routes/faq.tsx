import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, seo } from "@/components/site";
import { FAQS } from "@/lib/gym";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQs | Paradise Fitness Center", "Answers about membership, free trials and visiting Paradise Fitness Center."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Questions" title="FAQs" />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="divide-y">
          {FAQS.map((f) => (
            <details key={f.q} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{f.q}</summary><p className="mt-2 text-muted-foreground">{f.a}</p></details>
          ))}
        </div>
        <div className="mt-10"><CtaLink>Book a Free Trial</CtaLink></div>
      </section>
    </>
  );
}
