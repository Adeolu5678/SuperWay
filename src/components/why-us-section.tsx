import { BadgeCheck, Clock3, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";
import { trustPoints } from "@/lib/site-content";
import { business } from "@/lib/contact";

const icons = [ShieldCheck, Clock3, Sparkles, Leaf];

export function WhyUsSection() {
  return (
    <section id="why-choose-us" className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-white/90 px-5 py-8 shadow-[0_20px_70px_rgba(19,33,60,0.06)] md:px-8 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent)]">
          Why Choose Us
        </p>
        <h2 className="mt-2 font-[family:var(--font-display)] text-3xl font-bold text-[var(--foreground)] md:text-5xl">
          Excellence You Can Trust
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {trustPoints.map((point, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div key={point.title} className="flex gap-4 rounded-3xl border border-[var(--border)] bg-white p-4">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(40,95,32,0.08)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">{point.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{point.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(19,33,60,0.98),rgba(19,33,60,0.9))] px-5 py-8 text-white shadow-[0_20px_70px_rgba(19,33,60,0.18)] md:px-8 md:py-10">
          <div className="flex items-center gap-3 text-[var(--gold)]">
            <BadgeCheck className="h-6 w-6" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Operating model</p>
          </div>
          <p className="mt-4 font-[family:var(--font-display)] text-3xl font-bold md:text-4xl">
            Quote-based pricing with {business.paymentFlow.toLowerCase()}.
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
            Large, deep-clean, commercial, and unclear jobs follow the inspection-first path.
            Smaller standard jobs can be quoted quickly through WhatsApp or phone.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Hours</p>
              <p className="mt-1 text-sm font-semibold">{business.hoursLabel}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">Service area</p>
              <p className="mt-1 text-sm font-semibold">{business.serviceArea}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-white/90 px-5 py-6 shadow-[0_20px_70px_rgba(19,33,60,0.06)] md:px-8">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-[var(--gold)]" />
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Response promise
            </p>
          </div>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">
            New inquiries should be acknowledged fast during business hours. The site is set up
            to funnel users straight to WhatsApp or phone.
          </p>
        </div>
      </div>
    </section>
  );
}
