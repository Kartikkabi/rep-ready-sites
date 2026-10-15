import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Dumbbell, Users, HeartPulse, Clock } from "lucide-react";
import hero from "@/assets/hero.jpg";
import classesImg from "@/assets/classes.jpg";
import floor from "@/assets/gym-floor.jpg.asset.json";
import { CtaLink, Placeholder, seo } from "@/components/site";
import { TrialForm } from "@/components/TrialForm";
import { FAQS, GYM, PLANS, PROGRAMS } from "@/lib/gym";

export const Route = createFileRoute("/")({
  head: () => seo("Paradise Fitness Center | Gym, Strength Training & Free Trial", "Train at Paradise Fitness Center. 6-month membership ₹6,000, rated 4.7★ on Google. Request your free trial today."),
  component: Index,
});

export function Rating() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex text-primary" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
      <p className="text-sm"><strong className="text-lg">4.7</strong> on Google · 71 reviews</p>
    </div>
  );
}

function Index() {
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-navy-deep">
        <img src={hero} alt="Athlete lifting a heavy barbell" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Paradise Fitness Center</p>
          <h1 className="mt-3 max-w-3xl text-7xl md:text-[9rem]">Built here.<br />Stronger every day.</h1>
          <div className="mt-6"><Rating /></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink>Book a Free Trial</CtaLink>
            <CtaLink to="/membership" variant="outline">See Membership</CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-5xl md:text-6xl">More than a gym floor.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Paradise Fitness Center gives you the equipment, space and support to train with purpose — whether you're starting out or chasing a new personal best.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[{ i: Dumbbell, t: "Racks & free weights" }, { i: HeartPulse, t: "Cardio & conditioning" }, { i: Users, t: "Supportive community" }, { i: Clock, t: "Hours [PLACEHOLDER]" }].map(({ i: I, t }) => (
              <li key={t} className="flex items-center gap-3"><I className="h-5 w-5 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
        <img src={floor.url} alt="Paradise Fitness Center training floor with squat racks" loading="lazy" width={1080} height={820} className="rounded-sm" />
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-5xl md:text-6xl">Membership</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.name} className="rounded-sm border-2 border-primary bg-background p-8 text-foreground">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{p.name}</p>
                <p className="mt-2 font-display text-7xl">{p.price}</p>
                <p className="mt-1 text-muted-foreground">{p.note}</p>
                <div className="mt-6"><CtaLink>Enquire</CtaLink></div>
              </div>
            ))}
            <div className="rounded-sm border border-dashed border-primary p-8">
              <p className="font-semibold">Other plans</p>
              <p className="mt-2 text-sm"><Placeholder /> Monthly / annual options to be confirmed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-5xl md:text-6xl">Training & Classes</h2>
          <Link to="/classes" className="font-semibold uppercase tracking-wider text-primary">All programs →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <img src={classesImg} alt="Group kettlebell training" loading="lazy" width={1200} height={800} className="rounded-sm" />
          <div className="grid gap-4">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="border-l-4 border-primary bg-card p-5">
                <h3 className="text-3xl">{p.title}</h3>
                <p className="text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-5xl md:text-6xl">Trainers</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card p-6">
                <div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">Photo <Placeholder /></div>
                <p className="mt-4 font-display text-3xl">Trainer name</p>
                <p className="text-sm text-muted-foreground">Specialty & qualifications <Placeholder /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl">Loved by members</h2>
        <div className="mt-6 flex justify-center"><Rating /></div>
        <p className="mt-4 text-muted-foreground">Written member testimonials <Placeholder /> — share a few real quotes to show here.</p>
      </section>

      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-5xl md:text-6xl">Visit us</h2>
            <dl className="mt-6 space-y-3">
              <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Address</dt><dd><Placeholder /></dd></div>
              <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Hours</dt><dd><Placeholder /></dd></div>
              <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</dt><dd><Placeholder /></dd></div>
              <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Email</dt><dd><a className="underline" href={`mailto:${GYM.email}`}>{GYM.email}</a></dd></div>
              <div><dt className="text-sm uppercase tracking-wider text-muted-foreground">Map</dt><dd><Placeholder /></dd></div>
            </dl>
          </div>
          <div id="trial">
            <h2 className="text-5xl md:text-6xl">Request a free trial</h2>
            <p className="mb-6 mt-2 text-muted-foreground">Tell us when you'd like to visit — we'll get back to you to confirm.</p>
            <TrialForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-5xl md:text-6xl">FAQs</h2>
        <div className="mt-6 divide-y">
          {FAQS.slice(0, 3).map((f) => (
            <details key={f.q} className="py-4"><summary className="cursor-pointer text-lg font-semibold">{f.q}</summary><p className="mt-2 text-muted-foreground">{f.a}</p></details>
          ))}
        </div>
        <Link to="/faq" className="mt-6 inline-block font-semibold uppercase tracking-wider text-primary">All FAQs →</Link>
      </section>
    </>
  );
}
