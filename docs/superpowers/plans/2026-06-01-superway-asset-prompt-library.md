# SuperWay Asset Prompt Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a first-batch prompt library for SuperWay that covers 10 asset types with 4 separate image variations per asset, ready for AI generation and manual selection.

**Architecture:** Keep the work documentation-first. Write one focused prompt-library document containing shared visual rules, a reusable base prompt pattern, and 40 concrete prompts grouped by asset type. Add a lightweight QA rubric in the same document so image outputs can be judged consistently before use on WhatsApp, Instagram, Facebook, and the website.

**Tech Stack:** Markdown documentation in the repo, existing brand/spec context, manual AI image generation workflow

---

### Task 1: Create the Prompt Library Document

**Files:**
- Create: `docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md`

- [ ] **Step 1: Write the document skeleton**

Create the file with this exact starting structure:

```md
# SuperWay Asset Prompt Library

Date: 2026-06-01
Based on: `docs/superpowers/specs/2026-06-01-superway-asset-system-design.md`

## 1. Usage Rules

## 2. Shared Visual Direction

## 3. Shared Negative Prompt Constraints

## 4. Prompt Template

## 5. Asset Prompts

## 6. Output Review Checklist
```

- [ ] **Step 2: Verify the design-spec reference exists**

Run: `Test-Path 'C:\Projects\ApplicationDevelopment\Superway\SuperWay\docs\superpowers\specs\2026-06-01-superway-asset-system-design.md'`

Expected: `True`

- [ ] **Step 3: Commit the new skeleton**

```bash
git add docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md
git commit -m "docs: add superway asset prompt library skeleton"
```

### Task 2: Add Shared Prompt Rules and Style Controls

**Files:**
- Modify: `docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md`

- [ ] **Step 1: Fill the usage-rules section**

Insert this content under `## 1. Usage Rules`:

```md
- Use one prompt per generated image.
- Generate 4 separate prompt variations for each asset type.
- Do not request multiple layout concepts inside one image.
- Do not represent AI people as actual SuperWay staff.
- Do not represent AI interiors as real completed SuperWay jobs.
- Do not use these outputs as documentary business photos for Google Business Profile.
- Use these assets for marketing, catalog, website, and social media only unless later replaced with authentic photography.
```

- [ ] **Step 2: Fill the shared visual direction section**

Insert this content under `## 2. Shared Visual Direction`:

```md
- Realistic service brand
- Trustworthy and established, not flashy
- Mixed but light on faces
- Bright residential and office environments relevant to Nigeria
- Natural daylight or believable ambient lighting
- Fresh, hygienic atmosphere
- Subtle premium polish without luxury exaggeration
- Green and blue brand accents where appropriate
- Practical cleaning tools and believable room layouts
- No cartoon styling
- No sparkle clichés
```

- [ ] **Step 3: Fill the shared negative constraints section**

Insert this content under `## 3. Shared Negative Prompt Constraints`:

```md
No distorted anatomy, no extra fingers, no extra limbs, no warped furniture, no floating objects, no surreal reflections, no oversaturated colors, no luxury-mansion fantasy styling, no stiff stock-photo posing, no text, no watermark, no logo overlay, no fake glitter sparkle effects, no blurry faces in foreground, no messy composition, no duplicated tools, no impossible room geometry.
```

- [ ] **Step 4: Add the base prompt template**

Insert this content under `## 4. Prompt Template`:

```md
Photorealistic brand image for a professional cleaning company in Ibadan, Nigeria, showing [subject] in [environment], bright natural daylight or clean ambient interior light, clean and trustworthy atmosphere, realistic textures, subtle premium polish, green and blue brand accents, commercial lifestyle photography, balanced composition, high realism. [scene-specific details]. Negative constraints: [shared negatives].
```

- [ ] **Step 5: Commit the shared prompt rules**

```bash
git add docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md
git commit -m "docs: add superway shared prompt rules"
```

### Task 3: Write the 40 Asset Prompts

**Files:**
- Modify: `docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md`

- [ ] **Step 1: Add the 10 asset headings**

Under `## 5. Asset Prompts`, add these exact subsections:

```md
### Asset 1: Profile / Logo Support Visual
### Asset 2: Facebook Cover Image
### Asset 3: Residential Cleaning Visual
### Asset 4: Commercial Cleaning Visual
### Asset 5: Deep Cleaning Visual
### Asset 6: Move-in / Move-out Cleaning Visual
### Asset 7: Brand Intro Post Visual
### Asset 8: First-Time Discount Post Visual
### Asset 9: Cleaning Tips Post Visual
### Asset 10: Booking CTA Post Visual
```

- [ ] **Step 2: Write 4 prompt variations for each asset**

For each asset section, include:

```md
Variation 1:
[full prompt]

Variation 2:
[full prompt]

Variation 3:
[full prompt]

Variation 4:
[full prompt]
```

Prompt writing requirements:

- Every prompt must be fully written out, not templated shorthand.
- Each variation must change composition, environment emphasis, or camera framing.
- Keep the same brand language across all 4 variations for one asset.
- Avoid introducing text rendering requirements inside the image unless the model is specifically good at text.
- For offer and CTA assets, favor layout-friendly compositions with clean negative space.

- [ ] **Step 3: Sanity-check total prompt count**

Run: `(Select-String -Path 'C:\Projects\ApplicationDevelopment\Superway\SuperWay\docs\superpowers\specs\2026-06-01-superway-asset-prompt-library.md' -Pattern '^Variation [1-4]:').Count`

Expected: `40`

- [ ] **Step 4: Commit the prompt body**

```bash
git add docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md
git commit -m "docs: add superway asset prompt library"
```

### Task 4: Add a Review Rubric for Image Selection

**Files:**
- Modify: `docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md`

- [ ] **Step 1: Fill the output review checklist**

Insert this content under `## 6. Output Review Checklist`:

```md
Use this checklist on every generated image:

- Does it feel like a real, trustworthy cleaning brand?
- Does the room layout look believable?
- Are tools, hands, and surfaces anatomically and physically plausible?
- Does it avoid looking like a luxury-hotel ad when it should feel practical?
- Is there enough clean space for cropping or adding copy later?
- Does it avoid fake “actual client job” implications?
- Is the lighting natural and the color balance stable?
- Would this look credible on WhatsApp, Instagram, Facebook, or the website?

Reject immediately if:

- anatomy is distorted
- furniture geometry is broken
- the room looks unreal or too synthetic
- the image includes accidental text artifacts
- the image feels generic or unrelated to cleaning
- the tone drifts away from a realistic Nigerian service brand
```

- [ ] **Step 2: Run a placeholder scan**

Run: `Select-String -Path 'C:\Projects\ApplicationDevelopment\Superway\SuperWay\docs\superpowers\specs\2026-06-01-superway-asset-prompt-library.md' -Pattern 'TBD|TODO|\[full prompt\]|\[scene-specific details\]|\[shared negatives\]'`

Expected: no matches in the final document

- [ ] **Step 3: Commit the review rubric**

```bash
git add docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md
git commit -m "docs: add superway image review checklist"
```

### Task 5: Final Review and Handoff

**Files:**
- Review: `docs/superpowers/specs/2026-06-01-superway-asset-system-design.md`
- Review: `docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md`

- [ ] **Step 1: Verify spec coverage**

Check that the prompt-library doc covers:

- 10 core assets
- 4 variations per asset
- realistic service-brand direction
- mixed but light-on-faces approach
- safe usage boundaries
- reusable review rubric

Expected: all items present

- [ ] **Step 2: Verify final file paths**

Run:

```bash
Test-Path 'C:\Projects\ApplicationDevelopment\Superway\SuperWay\docs\superpowers\specs\2026-06-01-superway-asset-system-design.md'
Test-Path 'C:\Projects\ApplicationDevelopment\Superway\SuperWay\docs\superpowers\specs\2026-06-01-superway-asset-prompt-library.md'
```

Expected:

```text
True
True
```

- [ ] **Step 3: Commit the final reviewed plan outputs**

```bash
git add docs/superpowers/specs/2026-06-01-superway-asset-system-design.md docs/superpowers/specs/2026-06-01-superway-asset-prompt-library.md
git commit -m "docs: finalize superway asset prompt docs"
```
