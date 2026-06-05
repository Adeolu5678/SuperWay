# SuperWay Hosting and DNS Setup Guide

Date: 2026-06-01
Status: Requires access to the hosting/DNS panel for `nuelbuilds.dev`.

## Goal

Make the SuperWay website available at:

```text
https://superway.nuelbuilds.dev
```

## Required Access

Use the hosting control panel where `nuelbuilds.dev` is managed. This may be cPanel, Plesk, Vercel, Cloudflare, or a VPS/DNS provider.

## Subdomain Setup

Create:

- Subdomain: `superway`
- Domain: `nuelbuilds.dev`
- Full URL: `superway.nuelbuilds.dev`
- Document root if using cPanel-style hosting: `/public_html/superway`

## SSL

Enable SSL for:

```text
superway.nuelbuilds.dev
```

If using cPanel:

- Use AutoSSL or Let’s Encrypt.
- Confirm HTTPS loads without browser warnings.

If using VPS:

- Use Certbot or the host’s SSL panel.
- Redirect HTTP to HTTPS.

## Placeholder Page

If the full site is not ready to deploy yet, create a temporary page with:

```text
SuperWay Coming Soon — SuperWay Cleaning Services launching soon at superway.nuelbuilds.dev
```

## Deployment Notes

The current website code is a Next.js app in:

```text
C:\Projects\ApplicationDevelopment\Superway\SuperWay
```

Before deployment, run:

```powershell
pnpm build
```

Expected result:

```text
Build succeeds with route /
```

## Verification

After DNS and hosting are set:

```powershell
curl -I https://superway.nuelbuilds.dev
```

Expected:

- HTTP status is `200`, `301`, or `302`
- No SSL certificate error
- Browser opens with HTTPS lock

## Completion Checklist

- [ ] Subdomain created
- [ ] DNS resolves
- [ ] SSL enabled
- [ ] HTTPS works
- [ ] Site or placeholder loads
- [ ] `https://superway.nuelbuilds.dev` added to Google Business Profile, Instagram, Facebook, and WhatsApp Business
