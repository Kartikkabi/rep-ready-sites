import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Placeholder, seo } from "@/components/site";

export const Route = createFileRoute("/trainers")({
  head: () => seo("Trainers | Paradise Fitness Center", "Meet the coaching team at Paradise Fitness Center."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Coaches" title="Trainers" />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-card p-6">
              <div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">Photo <Placeholder /></div>
              <h2 className="mt-4 text-3xl">Trainer {n}</h2>
              <p className="text-sm text-muted-foreground">Name, specialty & qualifications <Placeholder /></p>
            </div>
          ))}
        </div>
        <div className="mt-10"><CtaLink>Train with us</CtaLink></div>
      </section>
    </>
  );
}
