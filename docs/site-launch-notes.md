# SuperWay Site Launch Notes

## Confirmed launch data

- Business name: SuperWay Cleaning Services
- Public phone: 0802 135 2593
- Business email: superwaycleaningservice@gmail.com
- Operating hours: 7:00 AM to 7:00 PM, Monday to Saturday
- Service area: Ibadan
- Pricing: quote-based
- Payment flow: 50% upfront, 50% after completion

## Website behavior

- Primary CTA: Book a Service
- Secondary CTA: Get a Free Quote
- Booking form opens a WhatsApp-ready modal
- Mobile and desktop layouts share the same conversion-first structure

## Deployment notes

- Deploy as a Vercel Next.js app.
- Point Google Business to the live production URL once it is live.
- If a separate WhatsApp number is provided later, update the WhatsApp link in `src/lib/contact.ts`.
- If a domain is purchased later, update the production URL in Google Business and the README.

