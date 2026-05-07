"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Building2,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { type FormEvent, type ReactNode } from "react";
import { business, getPrimaryWhatsAppHref } from "@/lib/contact";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

const serviceOptions = [
  "Residential Cleaning",
  "Commercial / Office Cleaning",
  "Deep Cleaning & Sanitation",
  "Window Cleaning",
  "Move In / Move Out Cleaning",
  "Post-Construction Cleaning",
  "Event & Party Clean-Up",
  "Laundry Services",
  "Fumigation & Pest Control",
  "Custom Cleaning Plan",
];

const frequencies = ["One-Time", "Weekly", "Bi-Weekly", "Monthly"];

export function BookingModal({ open, onClose }: BookingModalProps) {
  if (!open) {
    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = [
      "Hello Super Way, I want to book a cleaning service.",
      `Name: ${form.get("fullName") ?? ""}`,
      `Phone: ${form.get("phoneNumber") ?? ""}`,
      `Email: ${form.get("emailAddress") ?? ""}`,
      `Service: ${form.get("serviceNeeded") ?? ""}`,
      `Property: ${form.get("propertyType") ?? ""}`,
      `Location: ${form.get("location") ?? ""}`,
      `Date: ${form.get("preferredDate") ?? ""}`,
      `Time: ${form.get("preferredTime") ?? ""}`,
      `Frequency: ${form.get("frequency") ?? "One-Time"}`,
      `Notes: ${form.get("notes") ?? ""}`,
    ];

    window.open(`${getPrimaryWhatsAppHref()}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div className="sw-modal-wrap" role="dialog" aria-modal="true" aria-label="Book a service form">
      <button type="button" className="sw-modal-backdrop" onClick={onClose} aria-label="Close booking form" />
      <div className="sw-modal">
        <button type="button" className="sw-modal-close" onClick={onClose} aria-label="Close booking form">
          <X size={30} />
        </button>

        <aside className="sw-modal-panel">
          <Image src="/superway/sw-logo.png" alt="" width={142} height={142} />
          <h2>SUPER WAY</h2>
          <p>General Cleaning Services</p>
          <hr />
          <h3>Book a <span>Service</span></h3>
          <p className="sw-modal-intro">Tell us what you need and we&apos;ll get back to you quickly.</p>

          <div className="sw-modal-perks">
            <span><Leaf /> <strong>Eco-Friendly Products<small>Safe for your family & pets</small></strong></span>
            <span><User /> <strong>Background Checked Staff<small>Trained, vetted & reliable</small></strong></span>
            <span><Clock3 /> <strong>On-Time Service<small>We respect your time</small></strong></span>
            <span><ShieldCheck /> <strong>100% Satisfaction<small>Quality you can count on</small></strong></span>
          </div>

          <a href={`tel:${business.phone}`} className="sw-modal-phone"><Phone /> <strong>{business.phoneDisplay}</strong><small>Serving homes and businesses in Ibadan.</small></a>
        </aside>

        <form className="sw-booking-form" onSubmit={handleSubmit}>
          <div className="sw-form-grid">
            <Field icon={<User size={19} />} label="Full Name" name="fullName" placeholder="Enter your full name" />
            <Field icon={<Phone size={19} />} label="Phone Number" name="phoneNumber" placeholder={business.phoneDisplay} />
            <Field icon={<Mail size={19} />} label="Email Address" name="emailAddress" placeholder="yourname@email.com" type="email" />
            <Field icon={<CalendarDays size={19} />} label="Service Needed" name="serviceNeeded" select placeholder="Select a service">
              {serviceOptions.map((service) => <option key={service}>{service}</option>)}
            </Field>
            <Field icon={<Building2 size={19} />} label="Property Type" name="propertyType" select placeholder="Select property type">
              {["Home", "Office", "Apartment", "Commercial Space"].map((type) => <option key={type}>{type}</option>)}
            </Field>
            <Field icon={<MapPin size={19} />} label="Address / Location" name="location" placeholder="Enter your address or area" />
            <Field icon={<CalendarDays size={19} />} label="Preferred Date" name="preferredDate" type="date" placeholder="Select date" />
            <Field icon={<Clock3 size={19} />} label="Preferred Time" name="preferredTime" type="time" placeholder="Select time" />
          </div>

          <fieldset className="sw-frequency">
            <legend>Cleaning Frequency</legend>
            {frequencies.map((frequency, index) => (
              <label key={frequency}>
                <input type="radio" name="frequency" value={frequency} defaultChecked={index === 0} />
                <span>{frequency}{index === 0 ? <Check size={16} /> : null}</span>
              </label>
            ))}
          </fieldset>

          <label className="sw-notes">
            <span>Additional Notes</span>
            <textarea name="notes" rows={3} placeholder="Tell us more about your space or any special requests..." />
          </label>

          <div className="sw-checks">
            <label><input type="checkbox" defaultChecked /> <span><strong>Request a free quote</strong>We&apos;ll provide a customized estimate.</span></label>
            <label><input type="checkbox" defaultChecked /> <span><strong>I agree to be contacted</strong>By phone, email or WhatsApp.</span></label>
          </div>

          <div className="sw-modal-actions">
            <button type="submit">Book Now <ArrowRight size={22} /></button>
            <a href={getPrimaryWhatsAppHref()} target="_blank" rel="noreferrer">Get a Free Quote <ArrowRight size={22} /></a>
          </div>
          <p className="sw-response"><ShieldCheck size={18} /> Response within <strong>24 hours</strong></p>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  icon: ReactNode;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  select?: boolean;
  children?: ReactNode;
};

function Field({ icon, label, name, placeholder, type = "text", select, children }: FieldProps) {
  return (
    <label className="sw-field">
      <span>{label}</span>
      <span className="sw-input-shell">
        {icon}
        {select ? (
          <>
            <select name={name} defaultValue="">
              <option value="" disabled>{placeholder}</option>
              {children}
            </select>
            <ChevronDown className="sw-chevron" size={18} />
          </>
        ) : (
          <input name={name} type={type} placeholder={placeholder} />
        )}
      </span>
    </label>
  );
}
