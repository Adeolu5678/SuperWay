import { testimonialNotes } from "@/lib/site-content";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mt-6 rounded-[2rem] border border-[var(--border)] bg-white/85 px-5 py-8 shadow-[0_20px_70px_rgba(19,33,60,0.06)] md:px-8 md:py-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent)]">
          Testimonials
        </p>
        <h2 className="mt-2 font-[family:var(--font-display)] text-3xl font-bold text-[var(--foreground)] md:text-5xl">
          Feedback And Review Flow
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {testimonialNotes.map((note) => (
          <article
            key={note.title}
            className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,243,236,0.92))] p-5 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {note.title}
            </p>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">{note.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

