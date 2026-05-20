# Dentium — Design System

Dentium is a **dental practice management web app** for Indian clinics. It's the system the front-desk admin, the dentist, and the practice owner all log into to run the day — from the morning's appointment list, through the chair, to recording the payment and reading next quarter's collection-rate report.

It's dense, calm, and clinical. The visual language sits on **deep teal + warm maroon**, set on a cool off-white page. It uses Inter at small sizes, lots of soft-tinted shadows, and a glassmorphic frosting on cards and modals.

This skill packages everything you need to design **for or alongside** Dentium — tokens, type, components, screen recreations, and brand voice.

---

## Sources

- **CSS source-of-truth** — mounted at `css/` (read-only). Imported into `source_css/` in this project:
  - `source_css/tokens.css` — every color, font, space, radius, shadow var
  - `source_css/base.css` — reset, layout shell (sidebar / top-header / outlet)
  - `source_css/components.css` — 1,660 lines of component CSS
  - `source_css/animations.css` — keyframes + utility classes
- **Screenshots reference** — mounted at `screenshots/v1/` (read-only). Copied into `_research/` for quick lookup.
- No Figma, no slide template, no separate brand book was provided.

---

## What's in this skill

| Path | What it is |
|---|---|
| `colors_and_type.css` | **Start here.** All design tokens + semantic type classes. Single import for any new design. |
| `assets/` | Brand mark, glyph, status icons, decorative artwork |
| `preview/` | Per-token cards that populate the Design System tab |
| `ui_kits/dentium/` | React recreation of the Dentium web app — sidebar, header, KPI grid, tables, the works. Open `index.html` for a click-thru. |
| `source_css/` | Imported copies of the production CSS |
| `_research/` | Screenshots used as visual reference |
| `SKILL.md` | Agent-Skill-compatible manifest |

---

## Product context

- **Audience**: clinic admin (super admin), dentists (5 visible: General, Ortho, Endo, Perio, Oral Surgery), and front-desk staff. The role chip in the top-right swaps roles.
- **Currency & locale**: ₹ (INR), Indian-English copy, Indian names everywhere ("Karan Malhotra", "Dr. Arjun Mehta", "Venkat Subramanian"). Indian Lakh formatting on big sums (`₹1,86,500`).
- **Surfaces** (top-level nav): Dashboard, Live Clinic, Appointments, Patients, Billing, Reports, Settings.
- **Core nouns**: Patient (PAT-00009), Appointment, Treatment Plan, Prescription, Invoice (INV-2026-0001), Chair, Doctor, Department.

---

## Content fundamentals

The voice is **calm, factual, and respectful** — the way a good clinic admin speaks. Never marketing-y, never slangy. Copy assumes the user is a professional doing their job.

### Tone & POV

- **Second-person "you" is rare.** Most copy is third-person about the patient ("Aspirin — bronchospasm", "10 invoices pending"). System messages are short imperatives ("Fill in the details below").
- **The one place "you" shows up: greetings.** The dashboard opens with **"Good evening, Karan"** — first name only, time-of-day appropriate.
- **Doctors are always titled.** `Dr. Arjun Mehta`, never `Arjun`. The `Dr.` prefix is part of the name in every list, table, and detail view.
- **Patients are bare-name + ID.** `Venkat Subramanian · PAT-00009`. The PAT-ID is shown as a chip next to the name.

### Casing

- **Sentence case everywhere.** Page titles, button labels, modal titles. ("New appointment", "Visit timeline", "View invoices", "Record payment".)
- **UPPERCASE for micro-labels only** — table column headers, info-row labels, section eyebrows ("KNOWN ALLERGIES", "MEDICAL CONDITIONS", "TODAY'S COLLECTIONS"). 11px, weight 600, letter-spacing 0.5px. Never use uppercase on anything bigger than 12px.
- **Title Case is forbidden** except for proper nouns (drug names like "Salbutamol", department names like "Oral Surgery").

### Length & punctuation

- **Headlines are short.** "Dashboard". "Appointments". "Invoices". No taglines under page titles — instead, a date subtitle ("Sunday, 17 May 2026").
- **No em dashes in body copy** except as separators between metadata clusters: `Root canal — molar 36`, `22 May 2026 · 11:00 AM · Dr. Vikram Nair · Oral Surgery`. Use `·` (middle dot) for inline metadata separation.
- **No periods at the end of short labels, badges, or hint text** ("Cash ₹2,000", "1 missed slot", "Pending collection"). Full sentences in body and toasts get periods.
- **No exclamation marks. Ever.** This is healthcare data.
- **No emoji.** None observed in the product, none used in the system.

### Specific patterns

| Pattern | Example |
|---|---|
| Status pill | `Scheduled`, `Completed`, `In Progress`, `Billing Pending`, `Missed`, `Checked In` — single word or short phrase, sentence case |
| KPI label | `TODAY'S COLLECTIONS`, `PENDING PAYMENTS`, `OCCUPANCY` — uppercase micro-label, weight 600 |
| KPI value | `₹2,000` / `11` / `3 /5` — large display number, optional faint denominator |
| KPI sub | `Cash ₹2,000` / `10 Returning · +1 New` / `1 missed slot` |
| Empty state | "No invoices to show" + 1-line explanation + primary action |
| Confirm copy | "Complete the full antibiotic course." — declarative, not "please" |
| Alert banner | "10 invoices pending · ₹56,200 outstanding" + right-side "View invoices →" |

### Numbers & dates

- **Currency**: `₹` glyph, no space, comma-separated (`₹56,200`). Big sums use Indian Lakh: `₹1,86,500`. `₹0` is written out, never as `—`.
- **Outstanding/zero balance**: shown as `—` (em dash) in tables.
- **Dates**: `17 May` / `Sunday, 17 May 2026` / `2026` as a year heading on timelines.
- **Times**: 12-hour with AM/PM, no leading zero (`8:30 AM`, `11:00 AM`).
- **IDs**: prefixed and zero-padded — `PAT-00009`, `INV-2026-0002`.
- **Trends**: arrow + sign + percent — `↑ 409%` (success-green for up, danger-red for down).

---

## Visual foundations

### Palette

- **Brand teal `#2B555B`** is the only "loud" color in the UI. It marks the *currently selected* state — active nav item background, active tab text/underline, primary button, selected segmented control, table-row left accent on hover, link color.
- **Brand maroon `#622244`** is the *identity* color — used in the wordmark, the notification dot, the avatar of the logged-in user, and accent moments. It is **never** a primary action color.
- **Status colors are paired** — every workflow state has a `--status-X-bg` and `--status-X-text` token (~14 pairs covering scheduled, confirmed, in-progress, completed, cancelled, no-show, waiting, checked-in, billing-pending, missed, unpaid, draft, issued, paid, partial, void). Always use the pair together; never invent new combos.
- **Doctor avatars are randomly tinted** from a saturated palette (deep blue, pink, green, orange, purple). Each doctor/patient keeps the same color across sessions — used to make scanning lists faster, not for semantic meaning.
- **Charts** use a 7-color palette starting `#4845F0` (indigo), `#D46C84` (rose), `#10973E` (green), `#DB7600` (amber), `#1E54B7` (blue), `#9747FF` (purple), `#5F636C` (grey).

### Type

- **One family: Inter.** Loaded from Google Fonts at weights 400 / 500 / 600 / 700.
- **Scale is small and dense.** Body is 13px. Table cells are 12px. Micro-labels are 10–11px. Page titles are only 18px. The "display" 36px size is reserved for KPI values and login-screen-style hero numbers.
- **Weights**: 400 body, 500 active/selected, 600 buttons + labels + table headers, 700 logo + uppercase eyebrows. **700 is never used inline in body copy.**
- **Letter-spacing**: -0.3px on the wordmark, 0.5px on uppercase eyebrows, otherwise default.

### Spacing & rhythm

- **4px base, 16px gap default.** Card padding is 18–24px. Grid gutters are 16px. The page outlet has 24px vertical / 32px horizontal padding from the chrome.
- **Sticky chrome**: sidebar 188px fixed left, top header 60px fixed top, content scrolls under.
- **Layout density**: tables run at 44px row height, fields at 40px. This is a workhorse product — rows are tight enough to see 12+ records without scrolling.

### Cards

- **Glassmorphic by default.** Cards use `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)` + a 1px white border + a very soft tinted shadow (`0 4px 20px rgba(17,35,55,0.03)`). On the cool page bg this reads as "almost-white surface, lifted very slightly".
- **KPI cards** are solid white with a stronger shadow (`0 2px 8px rgba(17,35,55,0.06)`), hover lifts to `0 12px 24px rgba(17,35,55,0.08)` with a `translateY(-2px)`.
- **Radius**: 8px for buttons / inputs / status pills, 12px for cards / modals / dropdowns, 14px for KPI / table wrappers, full-pill for badges and avatar chips.
- **Doctor/Chair cards** carry a 3px top strip in `--color-primary` when occupied, `--color-divider` when free — quick at-a-glance.
- **Treatment-plan cards** are the *only* place a left-border accent is used (4px, primary teal); avoid this pattern elsewhere.

### Backgrounds & imagery

- **Cool off-white page bg `#F4F7F7`.** Never a gradient, never a pattern, never an image.
- **No hand-drawn illustrations, no marketing photography, no full-bleed imagery** anywhere in the product. The only "illustration" is the empty-state SVG (a faint outline glyph that floats with `@keyframes floatY`).
- **One gradient exists**: `--color-login-gradient` — `linear-gradient(145deg,#4845F0 0%,#6A3FA3 60%,#D46C84 100%)` — and it's *only* for the login screen. Do not use it anywhere else.
- **Status-tinted surfaces**: alert banners and the billing-queue panel use a flat status-bg tint with a 3px left-border in the matching text color. This is the **only** left-border-accent pattern in the UI; do not extend it to generic cards.

### Borders, dividers, shadows

- **Divider `#E0E2EA`** is the workhorse — 1px between table rows, between info-rows, between sidebar sections.
- **Shadow palette is tinted** with `rgba(17, 35, 55, ...)` — never neutral black. Six named shadows: header (1px hairline), card, card-hover, modal, dropdown, drawer. **Never invent a new shadow.**
- **No inner shadows.** No protection gradients. No glow effects.

### Motion

- **Calm, never bouncy.** Durations are 200 / 300 / 500 ms (`--transition-fast/medium/slow`). UI feedback never exceeds 400ms.
- **Two easings only**: `--ease-spring` (`cubic-bezier(0.16, 1, 0.3, 1)`) for scale-ins (modals, dropdowns), `--ease-in-out` for tab ink-bars and progress bars.
- **Entrance keyframes**: `fadeIn`, `fadeInUp`, `fadeInDown`, `slideInRight`, `slideInUp`, `scaleIn`. Stagger delays available in 50ms steps via `.stagger-1` ... `.stagger-6`.
- **Living states**:
  - `.pulse-ring` — animates the "currently in chair" lane in Live Clinic (2.2s infinite ring).
  - `.pulse-twice` — fires on critical allergy alerts (2.4s, twice, then stops).
  - `.pop-scale` — fires when a total amount updates (200ms).
  - `.float-y` — slow 3s bob on empty-state illustrations.
- **Hover states**: most buttons use a darker shade of their bg + 200ms ease; cards translateY(-1 or -2px) and swap to `--shadow-card-hover`; table rows tint to `--color-surface-subtle` and gain a 2px primary-teal left border.
- **Press states**: no shrink/scale on press — the brand chose not to use compress feedback. Buttons rely on focus-visible outline (2px primary, 2px offset) for keyboard.

### Transparency & blur

- **Frosted glass** is reserved for: cards, inputs, modals (`--glass-bg-darker`). It sits over the page bg, not over imagery.
- **Modal scrim** is `rgba(30, 30, 50, 0.42)` + `blur(4px)`. Drawer scrim is plain `rgba(0, 0, 0, 0.28)`.
- **Never use blur on text** or as a focus/disable signal.

### Layout rules

- **Sidebar is fixed**, always visible at desktop widths. It does not collapse — Dentium assumes a desktop-first user (a clinic admin on a workstation).
- **Top header is fixed** under the sidebar; outlet content scrolls behind it.
- **Right-side detail drawers** slide in from the right at 400px wide.
- **Modal max-widths**: sm 380px, default 520px, lg 720px. Never full-screen on desktop.
- **Sticky tables**: column headers stay; pagination row sticks at the bottom with a top divider.

### Color vibe of imagery

There is essentially no photography in this product. If imagery is ever added (patient profile photos, x-rays, dental charts), it should be **cool-leaning, never warm-graded** — to sit naturally with the teal/maroon palette. Avoid Instagram-style filters.

---

## Iconography

Dentium uses **inline SVG icons embedded in the React templates** — there is no icon font, no sprite sheet, and no PNG icons in the codebase. Stroke style is consistent: **1.5px stroke, round caps, round joins, 16×16 view-box**, with `currentColor` for fill/stroke so the icon picks up its parent's text color.

This matches the **Lucide** icon set conventions closely (1.5 stroke, 24px artboard often downscaled, rounded line caps). Where you need an icon the codebase doesn't define, **link Lucide from CDN** rather than hand-rolling SVG:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="calendar" style="width:16px;height:16px"></i>
```

**Substitution flagged**: Dentium ships its own inline SVGs in code, not the Lucide library. Using Lucide is a **close substitute** with matching stroke weight and rounding — if pixel-perfect parity to a specific Dentium screen is required, copy the SVG out of the Dentium component code directly. See `assets/icons/` for the most-used icons (calendar, users, file-text, chart-line, settings, search, bell, plus, more-horizontal, check-circle, alert-triangle, x).

**Emoji**: never used in the product. Don't introduce them.

**Unicode glyphs as icons**: yes, sparingly — `↑ ↓` for trend arrows, `·` for inline metadata separators, `—` for "no value" in numeric table cells, `✓` for completed steps in the create-appointment dropdown, `→` for "view more" links. These are intentional and part of the brand voice; keep using them.

**Status icons in alerts**: the warning-triangle and danger-circle icons are used at small sizes (14–16px) on the left of `.alert-banner-*` and `.allergy-alert`. They are always paired with the matching text color (`--color-warn-strong` or `--color-danger-text`).

**Avatars are letter-based**, not photo-based, in 99% of cases — initials in a colored circle. The user's own avatar in the sidebar uses the maroon accent; doctor and patient avatars cycle through 7 saturated colors per the chart palette.

**The wordmark itself acts as the logo**. There is no separate Dentium icon — the "Dentium" wordmark sits in the top-left of the sidebar at all times, with the lowercase eyebrow "DENTAL MANAGEMENT" underneath in muted micro-text. See `assets/logo/`.

---

## Index

Root files:

- `README.md` — this file
- `colors_and_type.css` — design tokens + semantic type
- `SKILL.md` — agent-skill manifest

Folders:

- `assets/`
  - `logo/` — Dentium wordmark variants (default, maroon-on-dark, mono)
  - `icons/` — most-used Lucide SVGs (16×16, 1.5 stroke)
  - `decor/` — small decorative assets (empty-state illustration, allergy chevron)
- `preview/` — design-system preview cards (one card per concept)
- `ui_kits/`
  - `dentium/` — full web app recreation (sidebar, header, dashboard, appointments, patient detail, billing, modals, drawer)
- `source_css/` — original production CSS, imported for reference
- `_research/` — screenshots used as visual reference

---

## Caveats

- **No real font files were shipped.** Inter is loaded from Google Fonts in `colors_and_type.css`. If you need offline or self-hosted copies, please drop `.ttf`/`.woff2` files in `assets/fonts/`.
- **No Figma access.** Everything in this skill was reverse-built from the CSS source + screenshots. The CSS was the primary source of truth; screenshots were used only to confirm what specific tokens looked like in context.
- **No icon export from Dentium's React code.** The icon set under `assets/icons/` uses Lucide as a near-match substitute. Replace with Dentium's own inline SVGs if pixel parity to a specific component matters.
- **No marketing site, no mobile app, no patient-facing portal** is represented in the source. This skill covers the *internal clinic dashboard* only.
