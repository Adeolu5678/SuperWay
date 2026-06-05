# SuperWay Daily Operator Checklist

Date: 2026-06-03

## Morning Startup

- [ ] Check WhatsApp Business inbox
- [ ] Check Instagram DMs and comments
- [ ] Check Facebook messages and comments
- [ ] Check website/email inquiries
- [ ] Check Google Business Profile messages, calls, and review notifications
- [ ] Review today’s scheduled jobs in `jobs.json`
- [ ] Confirm staff assignment and transport for today’s jobs

## Inquiry Response Script

Use this first response:

```text
Hello! Thank you for contacting SuperWay Cleaning Services.

Please send:
1. Your name
2. Your location in Ibadan
3. The type of cleaning you need
4. Preferred date and time
5. A short description of the space

We’ll review and send a quote.
```

## Quote Collection Questions

Ask only what is needed:

- What type of property is it?
- How many rooms or office areas?
- Is this standard cleaning or deep cleaning?
- Is there heavy dirt, post-construction dust, or move-in/move-out work?
- What date and time do you prefer?
- Are there photos or videos of the space?

## Follow-Up Rules

- Reply during business hours within 2 hours.
- If the customer does not respond, follow up once after 24 hours.
- If there is still no response after 72 hours, mark the customer as `lost`.

## Booking Confirmation Message

Use this after price, date, and time are agreed:

```text
Your SuperWay cleaning booking is confirmed.

Service: [Service]
Date: [Date]
Time: [Time]
Location: [Area]
Estimated price: ₦[Amount]

Please confirm if there are any access instructions before the team arrives.
```

## Completion Message

Use this after the job:

```text
Thank you for choosing SuperWay Cleaning Services.

We hope you’re satisfied with the cleaning. If you’re happy with the result, please leave us a review or refer someone who needs home or office cleaning in Ibadan.
```

## End-of-Day Closeout

- [ ] All new leads added to `customers.json`
- [ ] All booked jobs added to `jobs.json`
- [ ] `BOOKING_TRACKER.csv` updated
- [ ] Completed jobs added to `revenue_log.json`
- [ ] Payment statuses updated
- [ ] Tomorrow’s jobs reviewed
- [ ] Daily report written

## Escalate Immediately If

- A customer complains about service quality
- A team cannot meet the scheduled time
- Payment is delayed after completion
- A customer asks for a service outside the listed scope
- A lead appears to come from a duplicated or incorrect platform profile
