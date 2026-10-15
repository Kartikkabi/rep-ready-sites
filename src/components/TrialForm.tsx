import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { INTERESTS, TIMES } from "@/lib/gym";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+0-9\s-]{6,20}$/, "Enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(255)]),
  preferred_time: z.string().min(1, "Choose a preferred time"),
  interest: z.string().min(1, "Choose a fitness interest"),
  message: z.string().trim().max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;
const field = "w-full rounded-sm border border-input bg-background px-3 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function TrialForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as keyof Errors] ??= i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    const { error } = await supabase.from("trial_requests").insert({
      name: d.name, phone: d.phone, email: d.email || null,
      preferred_time: d.preferred_time, interest: d.interest, message: d.message || null,
    });
    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-sm border border-primary bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-4xl">Request received</h3>
        <p className="mt-2 text-muted-foreground">Thanks! Your free-trial <strong>request</strong> has been sent. The Paradise Gym team will contact you to confirm a time — your visit isn't booked until they confirm.</p>
      </div>
    );
  }

  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-sm bg-card p-6 md:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">Name *</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-err" />
        {err("name")}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-semibold">Phone *</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby="phone-err" />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="preferred_time" className="mb-1 block text-sm font-semibold">Preferred visit time *</label>
        <select id="preferred_time" name="preferred_time" defaultValue="" className={field} aria-invalid={!!errors.preferred_time}>
          <option value="" disabled>Select a time</option>
          {TIMES.map((t) => <option key={t}>{t}</option>)}
        </select>
        {err("preferred_time")}
      </div>
      <div>
        <label htmlFor="interest" className="mb-1 block text-sm font-semibold">Fitness interest *</label>
        <select id="interest" name="interest" defaultValue="" className={field} aria-invalid={!!errors.interest}>
          <option value="" disabled>Select an interest</option>
          {INTERESTS.map((t) => <option key={t}>{t}</option>)}
        </select>
        {err("interest")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email (optional)</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
        {err("email")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm font-semibold">Anything else? (optional)</label>
        <textarea id="message" name="message" rows={3} maxLength={1000} className={field} />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={status === "sending"} className="w-full rounded-sm bg-primary px-6 py-4 font-semibold uppercase tracking-wider text-primary-foreground disabled:opacity-60 md:w-auto">
          {status === "sending" ? "Sending…" : "Request a Free Trial"}
        </button>
        {status === "error" && <p role="alert" className="mt-2 text-sm text-destructive">Something went wrong. Please try again or email us.</p>}
        <p className="mt-2 text-xs text-muted-foreground">This is a request, not a confirmed booking.</p>
      </div>
    </form>
  );
}
