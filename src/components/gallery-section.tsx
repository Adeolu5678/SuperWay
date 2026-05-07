import { galleryFrames } from "@/lib/site-content";

export function GallerySection() {
  return (
    <section id="gallery" className="mt-6 rounded-[2rem] border border-[var(--border)] bg-white/85 px-5 py-8 shadow-[0_20px_70px_rgba(19,33,60,0.06)] md:px-8 md:py-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[var(--accent)]">
          See The Transformation
        </p>
        <h2 className="mt-2 font-[family:var(--font-display)] text-3xl font-bold text-[var(--foreground)] md:text-5xl">
          Before & After
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(245,241,232,0.96))] p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            {galleryFrames.map((frame) => (
              <article
                key={frame.label}
                className={`relative min-h-64 overflow-hidden rounded-[1.5rem] border p-4 ${
                  frame.tone === "clean"
                    ? "border-[rgba(40,95,32,0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(229,242,223,0.72))]"
                    : "border-[rgba(19,33,60,0.14)] bg-[linear-gradient(180deg,rgba(220,210,196,0.58),rgba(182,171,155,0.35))]"
                }`}
              >
                <div
                  className={`absolute inset-0 ${
                    frame.tone === "clean"
                      ? "bg-[radial-gradient(circle_at_top_right,rgba(40,95,32,0.14),transparent_35%)]"
                      : "bg-[radial-gradient(circle_at_top_left,rgba(19,33,60,0.22),transparent_32%)]"
                  }`}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${
                      frame.tone === "clean"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--foreground)] text-white"
                    }`}
                  >
                    {frame.label}
                  </span>
                  <span className="text-xs font-medium text-[var(--muted)]">Illustrative preview</span>
                </div>
                <div
                  className={`absolute inset-x-6 bottom-6 h-28 rounded-[1.5rem] ${
                    frame.tone === "clean"
                      ? "bg-white/85 shadow-[0_16px_30px_rgba(40,95,32,0.12)]"
                      : "bg-[rgba(19,33,60,0.28)] shadow-[0_16px_30px_rgba(19,33,60,0.12)]"
                  }`}
                />
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Real job photos can replace the illustrative gallery once approved before/after shots
            are collected.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(19,33,60,0.96),rgba(19,33,60,0.88))] px-5 py-8 text-white shadow-[0_20px_70px_rgba(19,33,60,0.16)] md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[rgba(255,255,255,0.68)]">
            Transformation notes
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
              <p className="text-lg font-semibold">Great for first impressions</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                This section demonstrates the cleaner result without pretending to show real
                client work before the portfolio is ready.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
              <p className="text-lg font-semibold">Matches the mockup rhythm</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Two-panel comparison, label chips, and a strong visual finish keep the layout
                aligned with the approved design direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

