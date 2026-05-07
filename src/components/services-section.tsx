import { Building2, House, Paintbrush, Sparkles, Truck } from "lucide-react";
import { services } from "@/lib/site-content";

const iconMap = {
  Home: House,
  Office: Building2,
  Sparkles,
  Move: Truck,
  Construction: Paintbrush,
} as const;

export function ServicesSection() {
  return (
    <section id="services" className="mt-6 rounded-[2rem] border border-[var(--border)] bg-white/85 px-5 py-8 shadow-[0_20px_70px_rgba(19,33,60,0.06)] md:px-8 md:py-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent)]">
          Our Services
        </p>
        <h2 className="mt-2 font-[family:var(--font-display)] text-3xl font-bold text-[var(--foreground)] md:text-5xl">
          Complete Cleaning Solutions
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = iconMap[service.iconLabel as keyof typeof iconMap];

          return (
            <article
              key={service.title}
              className="rounded-3xl border border-[var(--border)] bg-[rgba(255,255,255,0.92)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(40,95,32,0.08)] text-[var(--accent)]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{service.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

