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
  ClipboardList,
} from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
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

const timeSlots = [
  { value: "08:00", label: "08:00 AM" },
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "17:00", label: "05:00 PM" },
  { value: "18:00", label: "06:00 PM" },
];

function isSlotBusy(slotTimeStr: string, busySlots: { start: string; end: string }[]) {
  const [hours, minutes] = slotTimeStr.split(":").map(Number);
  const slotMinutes = hours * 60 + minutes;
  
  return busySlots.some(busy => {
    const [startH, startM] = busy.start.split(":").map(Number);
    const [endH, endM] = busy.end.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    
    return slotMinutes >= startMinutes && slotMinutes < endMinutes;
  });
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const [selectedFrequency, setSelectedFrequency] = useState("One-Time");
  const [busySlots, setBusySlots] = useState<{ start: string; end: string }[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  if (!open) {
    return null;
  }

  async function handleDateChange(date: string) {
    setSelectedDate(date);
    if (!date) {
      setBusySlots([]);
      return;
    }
    setLoadingAvailability(true);
    try {
      const response = await fetch(`/api/bookings?date=${date}`);
      const result = await response.json();
      if (result.success && result.busy) {
        setBusySlots(result.busy);
      } else {
        setBusySlots([]);
      }
    } catch (e) {
      console.error("Failed to fetch availability", e);
      setBusySlots([]);
    } finally {
      setLoadingAvailability(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const bookingData = {
      fullName: form.get("fullName")?.toString() ?? "",
      phoneNumber: form.get("phoneNumber")?.toString() ?? "",
      emailAddress: form.get("emailAddress")?.toString() ?? "",
      serviceNeeded: form.get("serviceNeeded")?.toString() ?? "",
      propertyType: form.get("propertyType")?.toString() ?? "",
      location: form.get("location")?.toString() ?? "",
      preferredDate: form.get("preferredDate")?.toString() ?? "",
      preferredTime: form.get("preferredTime")?.toString() ?? "",
      frequency: selectedFrequency,
      notes: form.get("notes")?.toString() ?? "",
    };

    // Send to API route to persist booking
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
    } catch (err) {
      console.error("Failed to save booking backend record", err);
    }

    const lines = [
      "Hello Super Way, I want to book a cleaning service.",
      `Name: ${bookingData.fullName}`,
      `Phone: ${bookingData.phoneNumber}`,
      `Email: ${bookingData.emailAddress}`,
      `Service: ${bookingData.serviceNeeded}`,
      `Property: ${bookingData.propertyType}`,
      `Location: ${bookingData.location}`,
      `Date: ${bookingData.preferredDate}`,
      `Time: ${bookingData.preferredTime}`,
      `Frequency: ${bookingData.frequency}`,
      `Notes: ${bookingData.notes}`,
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
            <Field
              icon={<CalendarDays size={19} />}
              label="Preferred Date"
              name="preferredDate"
              type="date"
              placeholder="Select date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
            <Field
              icon={<Clock3 size={19} />}
              label="Preferred Time"
              name="preferredTime"
              select
              placeholder={loadingAvailability ? "Loading availability..." : "Select time"}
              disabled={!selectedDate || loadingAvailability}
              required
            >
              {timeSlots.map((slot) => {
                const busy = isSlotBusy(slot.value, busySlots);
                return (
                  <option key={slot.value} value={slot.value} disabled={busy}>
                    {slot.label} {busy ? "(Booked)" : ""}
                  </option>
                );
              })}
            </Field>
          </div>

          <fieldset className="sw-frequency">
            <legend>Cleaning Frequency</legend>
            <div className="sw-frequency-options">
              {frequencies.map((frequency) => (
                <label key={frequency} className={`sw-freq-label ${selectedFrequency === frequency ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="frequency"
                    value={frequency}
                    checked={selectedFrequency === frequency}
                    onChange={() => setSelectedFrequency(frequency)}
                  />
                  <span>
                    {frequency}
                    {selectedFrequency === frequency ? <Check size={16} className="sw-freq-check" /> : null}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="sw-notes">
            <span>Additional Notes</span>
            <span className="sw-notes-shell">
              <ClipboardList size={19} className="sw-notes-icon" />
              <textarea name="notes" rows={3} placeholder="Tell us more about your space or any special requests..." />
            </span>
          </label>

          <div className="sw-checks">
            <label className="sw-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="sw-checkmark"></span>
              <span><strong>Request a free quote</strong>We&apos;ll provide a customized estimate.</span>
            </label>
            <label className="sw-checkbox-container">
              <input type="checkbox" defaultChecked />
              <span className="sw-checkmark"></span>
              <span><strong>I agree to be contacted</strong>By phone, email or WhatsApp.</span>
            </label>
          </div>

          <div className="sw-modal-actions">
            <button type="submit" className="sw-btn-book">Book Now <ArrowRight size={22} /></button>
            <a href={getPrimaryWhatsAppHref()} target="_blank" rel="noreferrer" className="sw-btn-quote">Get a Free Quote <ArrowRight size={22} /></a>
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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  min?: string;
  required?: boolean;
  disabled?: boolean;
};

function Field({ icon, label, name, placeholder, type = "text", select, children, onChange, ...rest }: FieldProps) {
  return (
    <label className="sw-field">
      <span>{label}</span>
      <span className="sw-input-shell">
        {icon}
        {select ? (
          <>
            <select name={name} defaultValue="" onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>} {...rest}>
              <option value="" disabled>{placeholder}</option>
              {children}
            </select>
            <ChevronDown className="sw-chevron" size={18} />
          </>
        ) : (
          <input name={name} type={type} placeholder={placeholder} onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} {...rest} />
        )}
      </span>
    </label>
  );
}

