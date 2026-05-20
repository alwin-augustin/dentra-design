---
name: dentium-design
description: Use this skill to generate well-branded interfaces and assets for Dentium, the dental practice management web app for Indian clinics, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Dentium Design Skill

You have access to the full Dentium design system. Before producing anything, **read `README.md`** in this skill folder — it covers brand voice, visual foundations, iconography, and a complete file index.

## Quick orientation

- **Tokens & type**: `colors_and_type.css` — single import for any new artifact.
- **Production CSS**: `source_css/` — the actual base / components / animations stylesheets used by the live Dentium app. Import alongside `colors_and_type.css` to inherit every component class.
- **UI kit**: `ui_kits/dentium/` — pixel-faithful React recreation of the app. Browse `index.html` for a click-thru; lift JSX components for your own work.
- **Preview cards**: `preview/` — one HTML file per token / component spec, used by the Design System tab.
- **Brand assets**: `assets/logo/`, `assets/icons/`.

## How to use

- **For visual artifacts** (slides, throwaway prototypes, mocks): copy the assets and CSS you need into your output, write static HTML, and reference the design rules in README.md. Imitate the voice in `preview/brand-voice.html`.
- **For production code**: lift JSX from `ui_kits/dentium/` and the four CSS files from `source_css/`. Token names (`--color-primary`, `--space-4`, `--shadow-card`, etc.) match the live codebase 1:1.

## If the user invokes this skill with no other guidance

Ask what they want to build or design — common asks include:
- A new screen for the Dentium app (e.g. Live Clinic, Reports detail, Settings)
- A patient-facing receipt / appointment confirmation
- A clinic-marketing one-pager that pulls Dentium brand cues
- A pitch deck for the Dentium product team

Then ask 3–5 follow-ups (audience? surface — desktop web vs print vs slide? must-have content? specific data?). Once you have enough, act as an expert designer and ship one well-crafted HTML artifact, plus optional variations exposed as Tweaks.

## Hard rules (don't break these)

- Never invent new brand colors. Use tokens from `colors_and_type.css` only.
- Brand teal is the **only** primary action color. Maroon is identity, not action.
- Inter only. No competing fonts. 13px body. 12px tables.
- Sentence case for everything bigger than 12px. UPPERCASE is reserved for 10–11px eyebrows.
- No emoji. No exclamation marks. No marketing-speak.
- Doctors are `Dr. Firstname Lastname`. Patients are `Firstname Lastname · PAT-#####`.
- Currency: `₹` with Indian Lakh formatting (`₹1,86,500`). Zero is `₹0` in KPIs, `—` in table cells.
- The login-screen gradient (`--color-login-gradient`) is the **only** gradient in the system. Don't use it elsewhere.
- No hand-drawn illustrations or full-bleed photography in product surfaces.
- Cards use the existing 6 shadow tokens. Don't invent new shadows.
- Animations stay ≤ 400ms, calm easing only. No bouncy springs.
- See README.md → "Iconography" for icon rules.

## Surface coverage

This skill represents the **internal clinic dashboard** only. Marketing site, patient portal, and mobile app are not modeled — if the user asks for one of those, flag that you'll be extrapolating from the dashboard's visual language and ask whether that's OK.
