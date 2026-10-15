import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Placeholder, seo } from "@/components/site";
import floor from "@/assets/gym-floor.jpg.asset.json";

export const Route = createFileRoute("/facilities")({
  head: () => seo("Our Gym & Facilities | Paradise Fitness Center", "Take a look inside Paradise Fitness Center — power racks, free weights and a spacious training floor."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Inside" title="Our Gym" img={floor.url} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <img src={floor.url} alt="Paradise Fitness Center gym floor with power racks" width={1080} height={820} className="w-full rounded-sm" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Power racks & free weights", "Cardio area", "Changing rooms, lockers, parking"].map((t, i) => (
            <div key={t} className="bg-card p-6">
              <h2 className="text-3xl">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{i === 0 ? "Visible on our training floor." : <>Details to be confirmed <Placeholder /></>}</p>
            </div>
          ))}
        </div>
        <div className="mt-10"><CtaLink>Come see it — free trial</CtaLink></div>
      </section>
    </>
  );
}
