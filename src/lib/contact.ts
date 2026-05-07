export const business = {
  name: "SuperWay Cleaning Services",
  shortName: "SuperWay",
  phoneDisplay: "0703 829 6178",
  secondaryPhoneDisplay: "0802 135 2593",
  phone: "07038296178",
  secondaryPhone: "08021352593",
  email: "adawa366@gmail.com",
  secondaryEmail: "SuperWay247@gmail.com",
  address: "Harmony Estate, Aba Paanu, Kuola Area, Apata, Ibadan",
  serviceArea: "Ibadan",
  hoursLabel: "7:00 AM to 7:00 PM, Monday to Saturday",
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

export function getPhoneHref(phone: string = business.phone) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function getEmailHref(email: string = business.email) {
  return `mailto:${email}`;
}

export function getBusinessHoursLabel() {
  return business.hoursLabel;
}
