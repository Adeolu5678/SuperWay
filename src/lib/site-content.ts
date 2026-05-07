import { business } from "@/lib/contact";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const heroFacts = [
  "Trusted by homes and businesses",
  "Quote-based pricing",
  "Ibadan-only launch",
];

export const services = [
  {
    title: "Residential Cleaning",
    description: "Reliable cleaning for homes, apartments, and family spaces.",
    iconLabel: "Home",
  },
  {
    title: "Commercial Cleaning",
    description: "Offices, shops, and client-facing spaces kept presentable.",
    iconLabel: "Office",
  },
  {
    title: "Deep Cleaning",
    description: "A detailed reset for built-up grime and neglected spaces.",
    iconLabel: "Sparkles",
  },
  {
    title: "Move In / Move Out Cleaning",
    description: "Move-ready turnover cleaning before or after relocation.",
    iconLabel: "Move",
  },
  {
    title: "Post-Construction Cleaning",
    description: "Dust, debris, and finishing cleanup after construction work.",
    iconLabel: "Construction",
  },
];

export const trustPoints = [
  {
    title: "Reliable & Insured",
    detail: "Work is handled with professionalism and accountability.",
  },
  {
    title: "Prompt & Trustworthy Service",
    detail: "The intake flow is designed to keep response times low.",
  },
  {
    title: "High-Quality Cleaning Materials",
    detail: "Tools and products are chosen for practical, visible results.",
  },
  {
    title: "Eco-Friendly Products",
    detail: "Safe, respectful cleaning choices for homes and workplaces.",
  },
];

export const galleryFrames = [
  {
    label: "Before",
    tone: "dull",
    caption: "A space that needs dust removal and a proper reset.",
  },
  {
    label: "After",
    tone: "clean",
    caption: "Bright, organised, and ready for use again.",
  },
];

export const testimonialNotes = [
  {
    title: "Verified reviews",
    detail:
      "The site is ready to collect real customer feedback after each completed job.",
  },
  {
    title: "Review request flow",
    detail:
      "Google reviews are requested within 24 hours of a successful cleaning session.",
  },
];

export const contactChannels = [
  {
    title: "Call Us",
    detail: business.phoneDisplay,
    href: `tel:${business.phone}`,
  },
  {
    title: "Email Us",
    detail: business.email,
    href: `mailto:${business.email}`,
  },
  {
    title: "Service Area",
    detail: business.serviceArea,
    href: "#contact",
  },
];

