import { ArrowRight, Check, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";
import { business, getPrimaryWhatsAppHref } from "@/lib/contact";
import { heroFacts } from "@/lib/site-content";

type HeroSectionProps = {
  onBookService: () => void;
  quoteHref?: string;
};

export function HeroSection({ onBookService, quoteHref = getPrimaryWhatsAppHref() }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="section-shell relative overflow-hidden rounded-[2rem] px-5 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-stretch">
        <div className="flex flex-col justify-center gap-6 py-2 md:py-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(40,95,32,0.18)] bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            <Sparkles className="h-4 w-4" />
            Premium cleaning. Exceptional living.
          </div>

          <div className="space-y-4">
            <h1 className="max-w-[12ch] font-[family:var(--font-display)] text-5xl font-bold leading-[0.95] text-[var(--foreground)] md:text-7xl">
              A Clean Space.
              <span className="block text-[var(--accent)]">A Better Place.</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
              We deliver spotless, healthy, and inviting environments for your home and business
              with excellence you can trust. Service is focused on Ibadan and built around fast
              WhatsApp response.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBookService}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--foreground)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(19,33,60,0.18)] transition hover:-translate-y-0.5"
            >
              Book a Service
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={quoteHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(40,95,32,0.28)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--accent)] shadow-sm transition hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroFacts.map((fact) => (
              <div
                key={fact}
                className="rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-sm font-medium text-[var(--foreground)] shadow-sm"
              >
                {fact}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--foreground)]/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
              Trusted by homes & businesses
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <Star className="h-4 w-4 text-[var(--gold)]" />
              Quote-based pricing
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
              <Leaf className="h-4 w-4 text-[var(--accent)]" />
              Eco-aware cleaning choices
            </span>
          </div>
        </div>

        <div className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-[rgba(19,33,60,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(241,235,224,0.96))] shadow-[0_30px_80px_rgba(19,33,60,0.14)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,95,32,0.14),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(214,164,73,0.18),transparent_25%)]" />
          <div className="absolute left-6 top-6 rounded-3xl border border-[rgba(40,95,32,0.18)] bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[rgba(40,95,32,0.08)] text-[var(--accent)]">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Clean today
                </p>
                <p className="text-sm text-[var(--muted)]">Better tomorrow.</p>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[6%] h-[88%] w-[62%] -translate-x-1/2 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(255,255,255,0.05))]" />

          <div className="absolute left-[13%] top-[15%] h-[58%] w-[44%] rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.12))] shadow-[0_20px_45px_rgba(19,33,60,0.08)]">
            <div className="absolute left-6 top-6 h-24 w-32 rounded-3xl bg-[rgba(40,95,32,0.14)] blur-xl" />
            <div className="absolute bottom-6 left-8 right-8 h-24 rounded-[2rem] bg-[linear-gradient(135deg,rgba(19,33,60,0.22),rgba(19,33,60,0.04))]" />
          </div>

          <div className="absolute right-[5%] bottom-[10%] h-[66%] w-[34%] rounded-[2.5rem] bg-[linear-gradient(180deg,rgba(19,33,60,0.95),rgba(19,33,60,0.78))] shadow-[0_30px_60px_rgba(19,33,60,0.18)]">
            <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full border border-white/20 bg-white/10" />
            <div className="absolute bottom-8 left-1/2 h-[60%] w-6 -translate-x-1/2 rounded-full bg-[rgba(40,95,32,0.92)]" />
            <div className="absolute bottom-16 right-7 h-28 w-10 rounded-[1.5rem] bg-black/60" />
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-[rgba(40,95,32,0.2)] bg-[rgba(19,33,60,0.9)] px-5 py-4 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(255,255,255,0.7)]">
                  {business.shortName}
                </p>
                <p className="mt-1 text-lg font-semibold">Service that feels polished from first tap.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.8)]">
                <ShieldCheck className="h-4 w-4 text-[var(--gold)]" />
                <span>{business.paymentFlow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

