"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
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
  Sun,
  Users,
  WashingMachine,
  Building2,
  HardHat,
  Bug,
  Truck,
  AppWindow,
  ChevronLeft,
  ChevronRight,
  Smile,
  ChevronDown,
  User,
  type LucideIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BookingModal } from "@/components/booking-modal";
import {
  business,
  getBookingMailtoHref,
  getBusinessHoursLabel,
  getEmailHref,
  getPhoneHref,
  getWhatsAppBookingHref,
} from "@/lib/contact";

type IconItem = readonly [string, LucideIcon];

const services: IconItem[] = [
  ["Residential Cleaning", Home],
  ["Commercial / Office Cleaning", Building2],
  ["Deep Cleaning & Sanitation", Sparkles],
  ["Window Cleaning", AppWindow],
  ["Move In / Move Out Cleaning", Truck],
  ["Post-Construction Cleaning", HardHat],
  ["Event & Party Clean-Up", PartyPopper],
  ["Fumigation & Pest Control", Bug],
  ["Laundry Services", WashingMachine],
  ["Custom Cleaning Plans", ClipboardList],
];

const trust: IconItem[] = [
  ["Reliable & Insured", ShieldCheck],
  ["Prompt & Trustworthy Service", Clock3],
  ["Professional & Trained Staff", Users],
  ["Customer Satisfaction Guaranteed", CheckCircle2],
  ["High-Quality Cleaning Materials & Equipment", Sparkles],
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
  ["500+", "Happy Clients", Leaf],
  ["98%", "Customer Satisfaction", Smile],
  ["50+", "Trained Professionals", Users],
  ["100%", "Commitment to Excellence", ShieldCheck],
];

const serviceDetails = [
  {
    title: "Residential Cleaning",
    description:
      "Routine home cleaning for flats, duplexes, and family spaces across Ibadan. Kitchens, bathrooms, living areas, bedrooms, and floors are covered.",
  },
  {
    title: "Commercial Cleaning",
    description:
      "Offices, retail spaces, schools, and client-facing environments kept presentable with dependable recurring or one-off cleaning support.",
  },
  {
    title: "Deep Cleaning",
    description:
      "A full reset for neglected spaces, move-ins, post-renovation work, and heavy build-up that standard cleaning will not resolve.",
  },
];

const galleryHighlights = [
  "Bright living rooms restored after deep cleaning",
  "Office floors, desks, and washrooms reset for daily operations",
  "Kitchen and bathroom detail-cleaning with before/after results",
  "Move-in and move-out cleanups prepared for handover",
];

const testimonials = [
  {
    avatarIndex: 3,
    name: "Mrs. A. Johnson",
    role: "Ibadan resident",
    quote:
      "Super Way transformed our home! The team was professional, thorough, and respectful. It truly feels like a 5-star experience.",
  },
  {
    avatarIndex: 2,
    name: "T. Oladipo",
    role: "Office manager",
    quote:
      "We needed a reliable cleaning partner for our workspace and they delivered exactly that. The process was smooth from quote to completion.",
  },
  {
    avatarIndex: 1,
    name: "K. Eniola",
    role: "Deep cleaning client",
    quote:
      "The deep clean made a visible difference in one visit. Communication was clear and the team handled the details properly.",
  },
];

export function SitePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [testIndex, setTestIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e);

    if (isDragging) {
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchend", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isDragging]);

  const getNavHref = (item: string) => {
    switch (item) {
      case "Home": return "#home";
      case "About Us": return "#why-choose-us";
      case "Services": return "#services";
      case "Why Choose Us": return "#why-choose-us";
      case "Gallery": return "#gallery";
      case "Testimonials": return "#testimonial-slider";
      case "Contact Us": return "#contact";
      default: return `#${item.toLowerCase().replaceAll(" ", "-")}`;
    }
  };

  return (
    <div className="sw-page">
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <clipPath id="sw-hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M 1,0 C 0.8,0.06, 0.4,0.06, 0.15,0.18 C 0.12,0.24, 0.12,0.36, 0.12,1 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="sw-header-bg" />
      <DecoTopLeaves />
      <DecoGoldCurve />
      <header className="sw-header">
        <a href="#home" className="sw-brand" aria-label="Super Way home">
          <Image src="/superway/sw-logo.png" alt="Super Way Logo" width={58} height={58} className="sw-logo" />
          <span>
            <strong>SUPER WAY</strong>
            <small>General Cleaning Services</small>
          </span>
        </a>

        <nav className="sw-nav" aria-label="Main navigation">
          {["Home", "About Us", "Services", "Why Choose Us", "Gallery", "Testimonials", "Contact Us"].map((item) => (
            <a key={item} href={getNavHref(item)} className={item === "Home" ? "active" : ""}>
              {item}
              {item === "Services" && <ChevronDown size={14} style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }} />}
            </a>
          ))}
        </nav>

        <div className="sw-header-actions">
          <a href={getPhoneHref()} className="sw-call">
            <Phone size={20} /> {business.phoneDisplay}
          </a>
          <button type="button" className="sw-book-small" onClick={() => setBookingOpen(true)}>
            Book a Service <ArrowRight size={21} />
          </button>
          <button type="button" className="sw-menu" aria-label="Open menu" onClick={() => setBookingOpen(true)}>
            <Menu size={30} />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="sw-hero">
          <div className="sw-copy">
            <p className="sw-eyebrow"><Leaf size={22} /> PREMIUM CLEANING. EXCEPTIONAL LIVING.</p>
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
              <a href={getWhatsAppBookingHref()} className="sw-secondary" target="_blank" rel="noreferrer">
                Get a Free Quote <ClipboardList size={22} />
              </a>
            </div>
            <div className="sw-badges-pill">
              {badges.map(([label, Icon]) => (
                <span key={label} className="sw-badge-item">
                  <Icon size={28} />
                  <span>
                    <strong>{label}</strong>
                    {label === "5-Star Rated" ? <span className="sw-badge-stars">★★★★★</span> : null}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="sw-hero-visual">
            <div className="sw-hero-img-wrap">
              <Image src="/superway/hero-cleaning.png" alt="Super Way cleaner vacuuming a bright living room" fill sizes="(max-width: 900px) 100vw, 58vw" priority />
            </div>
            <svg className="sw-hero-wave" viewBox="0 0 1280 170" preserveAspectRatio="none" aria-hidden="true">
              <path className="sw-hero-wave-gold" d="M0 126 C250 138 526 138 780 104 C998 75 1152 30 1280 0 L1280 28 C1146 62 1000 104 782 132 C520 164 248 164 0 150 Z" />
              <path className="sw-hero-wave-navy" d="M0 150 C248 164 520 164 782 132 C1000 104 1146 62 1280 28 L1280 170 L0 170 Z" />
            </svg>
            <div className="sw-hero-card">
              <span><Leaf size={28} /> Eco-Friendly Products</span>
              <span><User size={28} /> Background Checked Staff</span>
              <span><Clock3 size={28} /> On-Time, Every Time</span>
              <span><ShieldCheck size={28} /> 100% Satisfaction</span>
            </div>
            
            <div className="sw-mobile-badge">
              <div className="sw-mb-icon"><ShieldCheck size={24} /></div>
              <div className="sw-mb-text">
                <strong>CLEAN TODAY. BETTER TOMORROW.</strong>
                <span>★★★★★</span>
              </div>
            </div>

            <div className="sw-client-pill">
              <div className="sw-avatar-stack">
                <div className="sw-avatar-stack-item">
                  <img src="/superway/client-avatars.png" alt="" style={{ left: "0%" }} />
                </div>
                <div className="sw-avatar-stack-item">
                  <img src="/superway/client-avatars.png" alt="" style={{ left: "-100%" }} />
                </div>
                <div className="sw-avatar-stack-item">
                  <img src="/superway/client-avatars.png" alt="" style={{ left: "-200%" }} />
                </div>
                <div className="sw-avatar-stack-item">
                  <img src="/superway/client-avatars.png" alt="" style={{ left: "-300%" }} />
                </div>
              </div>
              <strong>500+ Happy Clients <small>and counting!</small></strong>
              <div className="sw-client-pill-star">
                <Star size={16} fill="white" color="white" />
              </div>
            </div>
          </div>
        </section>

        <section className="sw-content-grid">
          <div id="services" className="sw-column-services">
            <div className="sw-title">
              <p>Our Services <Leaf size={17} /></p>
              <h2>Complete Cleaning Solutions</h2>
            </div>
            <div className="sw-service-grid">
              {services.map(([label, Icon]) => (
                <article key={label} className="sw-service-card">
                  <Icon size={24} />
                  <strong>{label}</strong>
                </article>
              ))}
            </div>
          </div>

          <div id="why-choose-us" className="sw-column-why-testimonials">
            <div className="sw-why-section">
              <div className="sw-title">
                <p>Why Choose Us <Leaf size={17} /></p>
                <h2>Excellence You Can Trust</h2>
              </div>
              <div className="sw-trust-grid">
                {trust.map(([label, Icon]) => (
                  <div key={label} className="sw-trust-item">
                    <Icon size={22} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <article id="testimonial-slider" className="sw-testimonial">
              <b className="sw-quote">“</b>
              <p>{testimonials[testIndex].quote}</p>
              <div className="sw-testimonial-profile">
                <div className="sw-testimonial-avatar">
                  <img
                    src="/superway/client-avatars.png"
                    alt={testimonials[testIndex].name}
                    style={{ left: `-${testimonials[testIndex].avatarIndex * 100}%` }}
                  />
                </div>
                <div className="sw-testimonial-meta">
                  <strong>{testimonials[testIndex].name}</strong>
                  <small>{testimonials[testIndex].role}</small>
                </div>
              </div>
              <div className="sw-testimonial-stars">
                <Star size={16} fill="var(--gold)" color="var(--gold)" />
                <Star size={16} fill="var(--gold)" color="var(--gold)" />
                <Star size={16} fill="var(--gold)" color="var(--gold)" />
                <Star size={16} fill="var(--gold)" color="var(--gold)" />
                <Star size={16} fill="var(--gold)" color="var(--gold)" />
              </div>
              <div className="sw-testimonial-dots">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTestIndex(idx)}
                    className={`sw-dot ${idx === testIndex ? "active" : ""}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </article>
          </div>

          <div id="gallery" className="sw-column-gallery">
            <div className="sw-gallery-section">
              <div className="sw-title">
                <p>See the transformation <Leaf size={15} /></p>
                <h2>Before & After</h2>
              </div>
              <div
                className="sw-slider-container"
                ref={sliderRef}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onTouchStart={() => setIsDragging(true)}
              >
                <img src="/superway/before.png" alt="Before cleaning" className="sw-slider-img" />
                <img
                  src="/superway/after.png"
                  alt="After cleaning"
                  className="sw-slider-img sw-slider-after-img"
                  style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                />
                <span className="sw-slider-label before">Before</span>
                <span className="sw-slider-label after">After</span>
                <div className="sw-slider-handle" style={{ left: `${sliderPos}%` }}>
                  <button type="button" aria-label="Drag to compare before and after">
                    <ChevronLeft size={16} />
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <p className="sw-gallery-lede">From dusty to dazzling. We bring every space back to life. <Leaf size={18} /></p>
            </div>

            <div className="sw-gallery-highlights">
              {galleryHighlights.map((item) => (
                <article key={item} className="sw-gallery-tile">
                  <Leaf size={18} />
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </div>
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
          <Leaf size={52} className="sw-ready-leaf" />
          <div>
            <h2>Ready for a Cleaner, Healthier Space?</h2>
            <p>Book your service today and experience <strong>The Super Way</strong> difference.</p>
          </div>
          <div className="sw-ready-perks">
            <span><BadgeCheck size={20} className="text-gold" /> 100% Satisfaction Guaranteed</span>
            <span><Leaf size={20} className="text-gold" /> Eco-Friendly Cleaning Products</span>
          </div>
          <button type="button" onClick={() => setBookingOpen(true)}>Book Your Service Now <ArrowRight /></button>
        </section>
      </main>

      <footer className="sw-footer" id="contact">
        <div className="sw-footer-brand">
          <Image src="/superway/sw-logo.png" alt="Super Way Logo" width={58} height={58} className="sw-logo" />
          <span>
            <strong>SUPER WAY</strong>
            <small>General Cleaning Services</small>
          </span>
        </div>
        <a href={getPhoneHref()}><Phone /> <span>Call Us<strong>{business.phoneDisplay}<br />{business.secondaryPhoneDisplay}</strong></span></a>
        <a href={getEmailHref()}><Mail /> <span>Email Us<strong>{business.email}</strong></span></a>
        <span><MapPin /> <span>Our Location<strong>Apata, Ibadan<br />{business.address}</strong></span></span>
        <div className="sw-social">
          <span>Follow Us</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
        </div>
      </footer>

      <a
        href={getWhatsAppBookingHref()}
        className="sw-whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircleIcon />
      </a>

      <div className="sw-mobile-bar">
        <a href={getPhoneHref()}><Phone size={22} /> {business.phoneDisplay}</a>
        <button type="button" onClick={() => setBookingOpen(true)}>Book Now <ArrowRight size={22} /></button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

function MessageCircleIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.42c-.28-.14-1.64-.81-1.89-.91-.25-.09-.43-.14-.61.14-.18.28-.7.91-.86 1.1-.16.18-.32.21-.6.07-.28-.14-1.16-.43-2.2-1.37-.81-.72-1.35-1.61-1.51-1.88-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.46.07-.7.35-.24.28-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.14.18 1.85 2.82 4.48 3.95.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.11.5-.07 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.11-.25-.18-.53-.32Z"
      />
      <path
        fill="currentColor"
        d="M16.02 4.8c-6.08 0-11.02 4.85-11.02 10.82 0 1.9.51 3.76 1.48 5.39L4.9 27.2l6.4-1.65a11.1 11.1 0 0 0 4.72 1.05h.01c6.08 0 11.02-4.85 11.02-10.82 0-2.9-1.14-5.63-3.21-7.67a11.1 11.1 0 0 0-7.82-3.3Zm0 19.96h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.8.98 1.01-3.68-.22-.37a8.86 8.86 0 0 1-1.4-4.74c0-4.92 4.07-8.92 9.08-8.92 2.42 0 4.7.94 6.42 2.64a8.9 8.9 0 0 1 2.66 6.28c0 4.92-4.08 8.92-9.08 8.92Z"
      />
    </svg>
  );
}

function DecoTopLeaves() {
  return (
    <svg className="sw-deco-top-leaves" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8cc63f" />
          <stop offset="100%" stopColor="#1b5c20" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66b032" />
          <stop offset="100%" stopColor="#0d3c13" />
        </linearGradient>
        <linearGradient id="leafGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b2d666" />
          <stop offset="100%" stopColor="#2e6930" />
        </linearGradient>
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" floodOpacity="0.15" />
        </filter>
      </defs>
      <g filter="url(#dropShadow)">
        <path d="M 0,0 C 30,20 80,40 120,45" stroke="#4c3410" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0,0 C 20,40 40,70 30,100 C 20,130 5,140 0,140 C -5,110 5,60 0,0 Z" fill="url(#leafGrad1)" />
        <path d="M 0,0 Q 20,70 15,120" stroke="#a3e34b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M 15,10 C 60,30 90,80 85,120 C 80,160 50,180 35,190 C 20,150 30,90 15,10 Z" fill="url(#leafGrad2)" />
        <path d="M 15,10 Q 55,90 60,155" stroke="#84cd29" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M 40,20 C 90,25 130,45 140,75 C 150,105 120,120 100,125 C 80,95 70,55 40,20 Z" fill="url(#leafGrad3)" />
        <path d="M 40,20 Q 95,50 120,95" stroke="#d5f296" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M 60,28 C 95,30 115,20 125,25 C 135,30 120,50 110,55 C 90,45 80,35 60,28 Z" fill="url(#leafGrad1)" opacity="0.9" />
      </g>
    </svg>
  );
}

function DecoGoldCurve() {
  return (
    <svg className="sw-deco-gold-curve" viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e4aa35" />
          <stop offset="50%" stopColor="#f3c862" />
          <stop offset="100%" stopColor="#b88314" />
        </linearGradient>
      </defs>
      <path d="M -20,250 C 60,260 140,240 180,180 C 220,120 190,40 150,-10" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <g stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 60,253 C 70,225 95,215 110,220 C 95,240 85,252 60,253 Z" />
        <path d="M 60,253 C 75,238 95,230 110,220" opacity="0.6" />
        <path d="M 120,246 C 145,225 155,195 150,180 C 135,198 130,225 120,246 Z" />
        <path d="M 120,246 C 138,220 142,205 150,180" opacity="0.6" />
        <path d="M 175,188 C 205,178 215,150 210,135 C 190,150 185,175 175,188 Z" />
        <path d="M 175,188 C 192,170 198,158 210,135" opacity="0.6" />
        <path d="M 152,140 C 130,120 110,125 100,135 C 120,140 140,142 152,140 Z" />
        <path d="M 152,140 C 132,132 120,132 100,135" opacity="0.6" />
        <path d="M 183,100 C 175,70 150,60 135,65 C 150,80 168,90 183,100 Z" />
        <path d="M 183,100 C 168,85 158,78 135,65" opacity="0.6" />
      </g>
    </svg>
  );
}

function Facebook({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
