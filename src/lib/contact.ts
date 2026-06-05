export const business = {
  name: "SuperWay Cleaning Services",
  shortName: "SuperWay",
  phoneDisplay: "0703 829 6178",
  secondaryPhoneDisplay: "0802 135 2593",
  phone: "07038296178",
  secondaryPhone: "08021352593",
  email: "superwaycleaningservice@gmail.com",
  address: "7, Olorunlogbon Quarters, Apata, Ibadan, Oyo State, Nigeria",
  serviceArea: "Ibadan, Oyo State",
  website: "https://superway.nuelbuilds.dev",
  hoursLabel: "8:00 AM to 8:00 PM, Monday to Saturday",
  paymentFlow: "50% upfront, 50% after service completion",
};

function normalizeNigeriaPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("234")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `234${digits.slice(1)}`;
  }

  return digits;
}

export function getPrimaryWhatsAppHref(phone: string = business.phone) {
  return `https://wa.me/${normalizeNigeriaPhone(phone)}`;
}

export function getWhatsAppBookingHref(message: string = "Hello SuperWay, I need a cleaning service.") {
  return `${getPrimaryWhatsAppHref()}?text=${encodeURIComponent(message)}`;
}

export function getPhoneHref(phone: string = business.phone) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function getEmailHref(email: string = business.email) {
  return `mailto:${email}`;
}

export function getBookingMailtoHref(subject: string = "New Booking Request") {
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}`;
}

export function getBusinessHoursLabel() {
  return business.hoursLabel;
}
