import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Placeholder, seo } from "@/components/site";
import { PROGRAMS } from "@/lib/gym";
import img from "@/assets/classes.jpg";

export const Route = createFileRoute("/classes")({
  head: () => seo("Training & Classes | Paradise Fitness Center", "Strength training, fat loss, group classes and personal training at Paradise Fitness Center."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Programs" title="Training & Classes" img={img} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <div key={p.title} className="border-l-4 border-primary bg-card p-6">
              <h2 className="text-4xl">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-card p-6">
          <h2 className="text-4xl">Weekly schedule</h2>
          <p className="mt-2 text-muted-foreground">Class timetable <Placeholder /></p>
        </div>
        <div className="mt-10"><CtaLink>Try a session free</CtaLink></div>
      </section>
    </>
  );
}
