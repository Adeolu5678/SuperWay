import { ArrowRight, Clock3, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { business, getEmailHref, getPhoneHref, getPrimaryWhatsAppHref } from "@/lib/contact";
import { contactChannels } from "@/lib/site-content";

type ContactSectionProps = {
  onBookService: () => void;
};

export function ContactSection({ onBookService }: ContactSectionProps) {
  return (
    <section id="contact" className="mt-6 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(40,95,32,0.96),rgba(19,33,60,0.98))] px-5 py-8 text-white shadow-[0_24px_70px_rgba(19,33,60,0.18)] md:px-8 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[rgba(255,255,255,0.7)]">
            Ready for a cleaner, healthier space?
          </p>
          <h2 className="mt-3 max-w-xl font-[family:var(--font-display)] text-4xl font-bold leading-tight md:text-6xl">
            Book your service today and experience the SuperWay difference.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
            The site is intentionally built to move visitors from search to WhatsApp or phone in
            as few taps as possible.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBookService}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] shadow-lg shadow-[rgba(214,164,73,0.22)] transition hover:-translate-y-0.5"
            >
              Book Your Service Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={getPrimaryWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp First
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {contactChannels.map((channel) => {
              const Icon = channel.title === "Call Us" ? Phone : channel.title === "Email Us" ? Mail : MapPin;

              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="rounded-3xl border border-white/10 bg-white/6 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
                      {channel.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{channel.detail}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/12 bg-white/6 p-5 shadow-[0_20px_50px_rgba(19,33,60,0.18)] md:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
              <Clock3 className="h-5 w-5 text-[var(--gold)]" />
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/60">Hours</p>
              <p className="mt-1 text-lg font-semibold">{business.hoursLabel}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
              <Phone className="h-5 w-5 text-[var(--gold)]" />
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/60">Phone</p>
              <a href={getPhoneHref()} className="mt-1 block text-lg font-semibold">
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/6 p-4">
            <Mail className="h-5 w-5 text-[var(--gold)]" />
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/60">Email</p>
            <a href={getEmailHref()} className="mt-1 block text-lg font-semibold">
              {business.email}
            </a>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/6 p-4">
            <MapPin className="h-5 w-5 text-[var(--gold)]" />
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/60">Location</p>
            <p className="mt-1 text-lg font-semibold leading-7">{business.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

