# SuperWay Asset System Design

Date: 2026-06-01
Topic: AI-assisted image and brand asset system for SuperWay Cleaning Services
Status: Draft approved in conversation, pending user review of written spec

## Objective

Define a reusable asset production system for SuperWay Cleaning Services that supports:

- WhatsApp Business catalog images
- Instagram and Facebook branded content
- website support visuals
- future ad creatives

The system should prioritize trust, realism, and consistency while avoiding misleading use of AI-generated imagery.

## Chosen Direction

### Brand Positioning

Use a realistic service-brand direction:

- trustworthy
- established
- clean
- practical
- locally relevant

This should feel like a real cleaning company serving homes and businesses in Ibadan, not a luxury fantasy brand and not a generic stock-image collage.

### Visual Emphasis

Use a mixed image strategy with light use of faces:

- mostly spaces
- occasional staff presence
- occasional hands-at-work details
- minimal reliance on close facial portraits

This keeps the brand human while reducing consistency problems common in photoreal AI people generation.

### Recommended Production Model

Use a hybrid brand system:

- AI-generated visuals are allowed for branded marketing assets, concept scenes, service visuals, catalog covers, and campaign creatives.
- Real photos should be used for anything presented as an actual SuperWay job, actual staff member, actual customer, or real physical location.

## Non-Negotiable Rules

### Allowed Uses of AI Images

- service concept visuals
- branded campaign images
- catalog cover images
- social post visuals
- website support imagery
- generic before/after-style concept compositions that are clearly promotional rather than documentary

### Disallowed Uses of AI Images

- presenting AI staff as actual SuperWay employees
- presenting AI homes as real customer homes
- presenting AI-generated before/after images as actual completed jobs
- using Google Maps house imagery and editing it into fake cleaning outcomes
- using AI imagery for Google Business Profile photos if those images imply real business operations

## Asset Structure

The first production batch should be limited to 10 core assets.

### 1. Brand Foundation

1. Profile/logo support visual
2. Facebook cover image

### 2. Service Presentation

3. Residential cleaning visual
4. Commercial cleaning visual
5. Deep cleaning visual
6. Move-in / move-out cleaning visual

### 3. Content Posts

7. Brand intro post visual
8. First-time discount post visual
9. Cleaning tips post visual
10. Booking CTA post visual

## Variation Strategy

Each asset should have:

- 4 separate prompt variations
- 1 generated image per variation
- no prompt that requests multiple layout options inside a single image

This creates 40 individually generated candidate assets in the first prompt library while keeping selection simple.

## Visual Language

All prompts should reinforce the following shared visual identity:

- bright residential and office environments relevant to Nigeria
- natural daylight or clean ambient commercial lighting
- fresh, hygienic atmosphere
- subtle premium polish without looking luxury-only
- green and blue brand accents where appropriate
- realistic cleaning tools and believable room layouts
- tidy but lived-in spaces rather than sterile showroom fiction
- no cartoon styling
- no exaggerated magic sparkle tropes
- no aggressive filters

## Prompt Design Standard

Each prompt should include the following components:

1. Subject
2. Environment
3. Lighting
4. Brand mood
5. Camera style
6. Composition
7. Negative constraints

### Base Prompt Framework

Use a structure like:

> Photorealistic brand image for a professional cleaning company in Ibadan, Nigeria, showing [subject] in [environment], bright natural daylight, clean and trustworthy atmosphere, realistic textures, subtle premium polish, green and blue brand accents, commercial lifestyle photography, balanced composition, high realism, no exaggerated glamour, no fake sparkles, no distorted hands, no extra limbs, no oversaturated colors, no text, no watermark, no logo overlay.

The actual prompt library will adapt this template for each asset type.

## Asset Intent By Category

### Brand Foundation Assets

These should establish credibility immediately.

- The profile support visual should be simple, bold, and legible at small sizes.
- The Facebook cover should communicate the service area, professionalism, and service breadth without clutter.

### Service Presentation Assets

These should help users quickly understand what SuperWay offers.

- Residential cleaning should feel domestic, warm, and orderly.
- Commercial cleaning should feel efficient, dependable, and work-ready.
- Deep cleaning should show more detail and transformation energy without becoming unrealistic.
- Move-in / move-out should suggest readiness, reset, and handover quality.

### Content Post Assets

These should support launch-phase marketing.

- Brand intro should introduce trust and local relevance.
- Discount should feel urgent but not cheap.
- Tips content should feel useful and easy to absorb.
- Booking CTA should emphasize convenience and speed.

## Success Criteria

The asset system is successful if:

- the outputs feel visually consistent as one brand
- the assets are usable across WhatsApp, Instagram, Facebook, and the website
- the images look realistic without pretending to be documentary truth
- selection can happen quickly from four variants per asset
- the first batch is sufficient to launch social and catalog presence without waiting for a larger campaign system

## Out of Scope

This spec does not yet include:

- final export dimensions per platform
- caption writing
- posting calendar execution
- actual image generation
- ad campaign structure
- video asset generation

Those can be handled after the prompt library is approved.
