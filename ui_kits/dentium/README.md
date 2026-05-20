# Dentium UI Kit

High-fidelity React recreation of the **Dentium dental practice management** web app.

The kit reproduces the live-app chrome (188px fixed sidebar, 60px top header, scrolling outlet) and stitches together four working screens — Dashboard, Appointments, Patients/Patient Detail, Billing — into a clickable prototype. Use `index.html` for a live walkthrough, or import the JSX modules piecemeal.

## What's here

| File | Purpose |
|---|---|
| `index.html` | Boots React, loads the kit, mounts `<App/>`. **Open this to see the prototype.** |
| `app.jsx` | Top-level shell — routes between screens, holds app state (current patient, active modal) |
| `components.jsx` | Atomic components: `Avatar`, `StatusBadge`, `Button`, `Icon`, `KPI`, `EmptyState`, etc. |
| `chrome.jsx` | `Sidebar`, `TopHeader`, `Breadcrumb`, `PageHeader` |
| `screens.jsx` | The four screens — Dashboard, Appointments, Patients, PatientDetail, Billing |
| `modals.jsx` | Modal + drawer surfaces — `NewAppointmentModal`, `RecordPaymentModal`, `InvoiceDrawer` |
| `data.js` | Realistic fake data — 10 patients, 5 doctors, today's appointments, ₹-denominated invoices |
| `styles/` | Imported copy of Dentium's production CSS (tokens / base / components / animations) |

## Conventions

- **All visual values come from `styles/tokens.css`.** No raw hex or px values anywhere in JSX.
- **Status pills, badges, buttons** all use the production CSS class names — never restyled.
- Icons are inline SVG (Lucide-style, 1.5px stroke) defined once in `components.jsx`'s `<Icon name="..."/>`.

## What's missing

- **Live Clinic, Reports, Settings** screens — stub'd in the sidebar with a "Coming soon" page. The first three are dense bespoke screens that don't reuse much of the kit, so they're omitted to keep the kit focused on reusable components.
- **WhatsApp send** is a ghost button (opacity .55, cursor not-allowed) per the source.
- **Treatment-plan progress, prescriptions table, files tab** on Patient Detail are statically rendered (no add-row interactions).

