# SuperWay Booking and Tracking Workflow

Date: 2026-06-03

## Purpose

Use this workflow whenever a lead comes from WhatsApp, Instagram, Facebook, website, Google Business Profile, or referral.

The goal is to keep every NuelBuilds-sourced inquiry traceable from first message to completed job and revenue share.

## Files

- Customer database: `\\wsl.localhost\Ubuntu\home\emman\.hermes\agents\superway\customers.json`
- Job schedule: `\\wsl.localhost\Ubuntu\home\emman\.hermes\agents\superway\jobs.json`
- Manual tracker: `\\wsl.localhost\Ubuntu\home\emman\.hermes\agents\superway\BOOKING_TRACKER.csv`
- Revenue log: `\\wsl.localhost\Ubuntu\home\emman\.hermes\agents\superway\revenue_log.json`

## Source Channels

Use exactly one of these values:

- `WhatsApp`
- `Instagram`
- `Facebook`
- `Website`
- `Google Business`
- `Referral`

## Customer Status Values

- `new`: inquiry received, no reply yet
- `contacted`: customer has received a reply
- `booked`: job date and price agreed
- `completed`: job finished
- `lost`: customer declined, stopped replying, or request is not serviceable

## Job Status Values

- `scheduled`: job booked and pending
- `in_progress`: team is currently working
- `completed`: job finished
- `cancelled`: booking cancelled before completion

## Payment Status Values

- `unpaid`
- `pending`
- `paid`
- `cancelled`

## ID Format

Use date-based IDs.

Customer ID:

```text
CUST-YYYYMMDD-NNN
```

Job ID:

```text
JOB-YYYYMMDD-NNN
```

Examples:

```text
CUST-20260603-001
JOB-20260605-001
```

## Intake Workflow

1. Reply to the customer within 2 business hours.
2. Ask for name, phone, service needed, location, preferred date, and property details.
3. Add the lead to `customers.json`.
4. Add the same lead to `BOOKING_TRACKER.csv`.
5. Set customer status to `new` or `contacted`.
6. Set `nuelbuilds_channel` to `true` if the customer came from any NuelBuilds-created channel.

## Booking Workflow

When a customer confirms:

1. Update the customer status to `booked`.
2. Fill `booking_date`, `booking_price`, and `direct_cost` in `customers.json`.
3. Create a linked job in `jobs.json`.
4. Update `BOOKING_TRACKER.csv`.
5. Calculate NuelBuilds share fee.

Formula:

```text
nuelbuilds_share_fee = (booking_price - direct_cost) * 0.5
```

Example:

```text
booking_price = 30000
direct_cost = 12000
net_profit = 18000
nuelbuilds_share_fee = 9000
```

## Completion Workflow

When the cleaning is finished:

1. Set the job status to `completed`.
2. Set `completed_at` in `jobs.json`.
3. Set customer status to `completed`.
4. Update `payment_status` in `BOOKING_TRACKER.csv`.
5. Add an entry to `revenue_log.json`.
6. Ask the customer for a review and permission to use real job photos.

## Lost Lead Workflow

Use `lost` when:

- customer declines price
- customer stops replying after follow-up
- location is outside service area
- service request is not covered

Still keep the customer record. Do not delete lost leads; they are useful for conversion tracking.

## Required Fields Per New Lead

Minimum fields:

- customer name
- phone
- service requested
- source channel
- inquiry date
- status
- notes

Optional but useful:

- email
- booking date
- booking price
- direct cost
- assigned staff

## Daily Closeout

At the end of each day:

1. Confirm every new inquiry is in `customers.json`.
2. Confirm every booked job is in `jobs.json`.
3. Confirm `BOOKING_TRACKER.csv` matches the customer/job files.
4. Confirm completed paid jobs are in `revenue_log.json`.
5. Write a daily report in:

```text
\\wsl.localhost\Ubuntu\home\emman\.hermes\agents\superway\daily_reports\YYYY-MM-DD.md
```

## Quality Rule

If a lead came from the website, WhatsApp Business link, Instagram, Facebook, Google Business Profile, or NuelBuilds-run campaign, mark it as a NuelBuilds channel unless there is clear evidence it came independently.
