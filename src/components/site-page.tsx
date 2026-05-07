"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleCheck,
  Home,
  Leaf,
  Mail,
  MapPin,
  Menu,
  PartyPopper,
  Phone,
  ShieldCheck,
  Shirt,
  Sparkles,
  Star,
  Users,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/booking-modal";
import { business, getEmailHref, getPhoneHref, getPrimaryWhatsAppHref } from "@/lib/contact";

type IconItem = readonly [string, LucideIcon];

const services: IconItem[] = [
  ["Residential Cleaning", Home],
  ["Commercial / Office Cleaning", Users],
  ["Deep Cleaning & Sanitation", Sparkles],
  ["Window Cleaning", CheckCircle2],
  ["Move In / Move Out Cleaning", Home],
  ["Post-Construction Cleaning", Shirt],
  ["Event & Party Clean-Up", PartyPopper],
  ["Fumigation & Pest Control", BadgeCheck],
  ["Laundry Services", WashingMachine],
  ["Custom Cleaning Plans", CalendarDays],
];

const trust: IconItem[] = [
  ["Reliable & Insured", ShieldCheck],
  ["Prompt & Trustworthy Service", Clock3],
  ["Professional & Trained Staff", Users],
  ["Customer Satisfaction Guaranteed", CheckCircle2],
  ["High-Quality Cleaning Materials & Equipment", Home],
  ["Available for One-Time or Regular Cleaning", CalendarDays],
  ["Affordable & Flexible Pricing", BadgeCheck],
  ["Eco-Friendly Products Safe for Your Family", Leaf],
];

const badges: IconItem[] = [
  ["Trusted by Homes & Businesses", ShieldCheck],
  ["5-Star Rated", Star],
  ["Satisfaction Guaranteed", CheckCircle2],
];

const stats: (readonly [string, string, LucideIcon])[] = [
  ["500+", "Happy Clients", Users],
  ["98%", "Customer Satisfaction", CheckCircle2],
  ["50+", "Trained Professionals", Users],
  ["100%", "Commitment to Excellence", ShieldCheck],
];

export function SitePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="sw-page">
      <header className="sw-header">
        <a href="#home" className="sw-brand" aria-label="Super Way home">
          <Image src="/superway/sw-logo.png" alt="" width={78} height={78} className="sw-logo" priority />
          <span>
            <strong>SUPER WAY</strong>
            <small>General Cleaning Services</small>
          </span>
        </a>

        <nav className="sw-nav" aria-label="Main navigation">
          {["Home", "About Us", "Services", "Why Choose Us", "Gallery", "Testimonials", "Contact Us"].map((item) => (
            <a key={item} href={item === "Home" ? "#home" : `#${item.toLowerCase().replaceAll(" ", "-")}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="sw-header-actions">
          <a href={getPhoneHref()} className="sw-call">
            <Phone size={22} /> {business.phoneDisplay}
          </a>
          <button type="button" className="sw-book-small" onClick={() => setBookingOpen(true)}>
            Book a Service <ArrowRight size={21} />
          </button>
          <button type="button" className="sw-menu" aria-label="Open menu">
            <Menu size={30} />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="sw-hero">
          <div className="sw-copy">
            <p className="sw-eyebrow"><Leaf size={22} /> Premium cleaning. Exceptional living.</p>
            <h1>
              A Clean Space.
              <span>A Better Place.</span>
            </h1>
            <p className="sw-lede">
              We deliver spotless, healthy, and inviting environments for your home and business with excellence you can trust.
            </p>
            <div className="sw-cta-row">
              <button type="button" className="sw-primary" onClick={() => setBookingOpen(true)}>
                Book a Service <ArrowRight size={22} />
              </button>
              <a href={getPrimaryWhatsAppHref()} className="sw-secondary" target="_blank" rel="noreferrer">
                Get a Free Quote <ArrowRight size={22} />
              </a>
            </div>
            <div className="sw-badges">
              {badges.map(([label, Icon]) => (
                <span key={label}>
                  <Icon size={28} />
                  {label}
                  {label === "5-Star Rated" ? <b>★★★★★</b> : null}
                </span>
              ))}
            </div>
          </div>

          <div className="sw-hero-visual">
            <Image src="/superway/hero-cleaning.png" alt="Super Way cleaner vacuuming a bright living room" fill sizes="(max-width: 900px) 100vw, 58vw\" priority />
            <svg className="sw-hero-top-wave" viewBox="0 0 1280 34" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 34 C230 12 470 4 724 8 C948 12 1128 8 1280 0 L1280 34 Z" />
            </svg>
            <svg className="sw-hero-wave" viewBox="0 0 1280 170" preserveAspectRatio="none" aria-hidden="true">
              <path className="sw-hero-wave-gold" d="M0 126 C250 138 526 138 780 104 C998 75 1152 30 1280 0 L1280 28 C1146 62 1000 104 782 132 C520 164 248 164 0 150 Z" />
              <path className="sw-hero-wave-navy" d="M0 150 C248 164 520 164 782 132 C1000 104 1146 62 1280 28 L1280 170 L0 170 Z" />
            </svg>
            <div className="sw-hero-card">
              <span><Leaf size={28} /> Eco-Friendly Products</span>
              <span><Users size={28} /> Background Checked Staff</span>
              <span><Clock3 size={28} /> On-Time, Every Time</span>
              <span><ShieldCheck size={28} /> 100% Satisfaction</span>
            </div>
            <div className="sw-client-pill">
              <Image src="/superway/client-avatars.png" alt="Happy Super Way clients" width={96} height={42} className="sw-client-avatars" />
              <strong>500+ Happy Clients <small>and counting!</small></strong>
              <CircleCheck size={22} />
            </div>
          </div>
        </section>

        <section id="services" className="sw-services">
          <div className="sw-title">
            <p>Our Services <Leaf size={17} /></p>
            <h2>Complete Cleaning Solutions</h2>
          </div>
          <div className="sw-service-grid">
            {services.map(([label, Icon]) => (
              <article key={label}>
                <Icon size={42} />
                <strong>{label}</strong>
              </article>
            ))}
          </div>
          <button type="button" className="sw-wide-button" onClick={() => setBookingOpen(true)}>
            View All Services <ArrowRight size={22} />
          </button>
        </section>

        <section id="why-choose-us" className="sw-midgrid">
          <div className="sw-why">
            <div className="sw-title">
              <p>Why Choose Us <Leaf size={17} /></p>
              <h2>Excellence You Can Trust</h2>
            </div>
            <div className="sw-trust-list">
              {trust.map(([label, Icon]) => (
                <span key={label}>
                  <Icon size={28} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <article className="sw-testimonial">
            <b className="sw-quote">“</b>
            <p>
              Super Way is by far the best cleaning service I’ve used in Ibadan. They are professional, thorough, and very reliable. <b>Highly recommended!</b>
            </p>
            <div>
              <span className="sw-avatar">AJ</span>
              <span>
                <strong>Mrs. A. Johnson</strong>
                <small>Ibadan Resident</small>
              </span>
            </div>
            <span><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /></span>
          </article>

          <article className="sw-gallery">
            <div className="sw-title">
              <p>See the transformation <Leaf size={15} /></p>
              <h2>Before & After</h2>
            </div>
            <div className="sw-before-after">
              <Image src="/superway/before-after.png" alt="Before and after cleaning comparison" fill />
              <span className="before">Before</span>
              <span className="after">After</span>
              <button type="button"><ArrowRight size={24} /></button>
            </div>
            <p>From dusty to dazzling. We bring every space back to life. <CircleCheck size={18} /></p>
          </article>
        </section>

        <section className="sw-stats">
          {stats.map(([val, label, Icon]) => (
            <div key={label}>
              <Icon size={34} />
              <strong>{val}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="sw-ready">
          <ShieldCheck size={52} />
          <div>
            <h2>Ready for a Cleaner, Healthier Space?</h2>
            <p>Book your service today and experience <strong>The Super Way</strong> difference.</p>
          </div>
          <span><CircleCheck /> 100% Satisfaction Guaranteed</span>
          <span><Leaf /> Eco-Friendly Products</span>
          <button type="button" onClick={() => setBookingOpen(true)}>Book Your Service Now <ArrowRight /></button>
        </section>
      </main>

      <footer id="contact-us" className="sw-footer">
        <div className="sw-footer-brand">
          <Image src="/superway/sw-logo.png" alt="" width={78} height={78} />
          <span>
            <strong>SUPER WAY</strong>
            <small>General Cleaning Services</small>
          </span>
        </div>
        <a href={getPhoneHref()}><Phone /> <span>Call Us<strong>{business.phoneDisplay}<br />{business.secondaryPhoneDisplay}</strong></span></a>
        <a href={getEmailHref()}><Mail /> <span>Email Us<strong>{business.email}<br />{business.secondaryEmail}</strong></span></a>
        <span><MapPin /> <span>Our Location<strong>Apata, Ibadan<br />{business.address}</strong></span></span>
        <div className="sw-social">
          <span>Follow Us</span>
          <b aria-label="Facebook">f</b>
          <b aria-label="Instagram">i</b>
          <b aria-label="WhatsApp">w</b>
        </div>
      </footer>

      <div className="sw-mobile-bar">
        <a href={getPhoneHref()}><Phone size={22} /> {business.phoneDisplay}</a>
        <button type="button" onClick={() => setBookingOpen(true)}>Book Now <ArrowRight size={22} /></button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
