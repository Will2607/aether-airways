# AetherAirways ✈

> A premium airline web application built as a portfolio project, demonstrating production-level frontend architecture with Next.js 15+, TypeScript, and Tailwind CSS.

---

## Overview

AetherAirways is a full-featured airline booking platform designed to reflect the quality standards of companies like Stripe, Vercel, and Airbnb. The project emphasizes clean architecture, accessibility, and a premium user experience over an airline booking flow — from flight search to payment confirmation.

This is a **portfolio project**. It is not affiliated with any real airline.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router |
| Language | [TypeScript](https://www.typescriptlang.org) (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| State management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| Schema validation | [Zod](https://zod.dev) |
| Unit / Component tests | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| End-to-end tests | [Playwright](https://playwright.dev) |
| Icons | [Lucide React](https://lucide.dev) |
| Package manager | npm |

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20.x` (recommended: 22.x LTS)
- **npm** `>= 10.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/aether-airways.git
cd aether-airways

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in the required values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (single pass) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Run tests and generate coverage report |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run test:e2e:ui` | Open Playwright UI |

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables.

> ⚠️ **Never commit `.env.local` or any file containing real secrets.**

### Required for development

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Public URL of the app | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:4000/api` |

### Required for production

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_NAME` | Display name of the application |
| `NEXT_PUBLIC_APP_URL` | Full public URL (no trailing slash) |
| `NEXT_PUBLIC_API_URL` | Backend REST API base URL |
| `AUTH_SECRET` | JWT signing secret — minimum 32 chars (`openssl rand -base64 32`) |
| `DATABASE_URL` | Database connection string |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASSWORD` | Transactional email credentials |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (browser-safe) |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side only) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

See `.env.example` for the full list with descriptions.

---

## Project Structure

```
aether-airways/
│
├── app/                        # Next.js App Router — routing and layouts only
│   ├── (marketing)/            # Public marketing pages (home, about, destinations)
│   ├── (booking)/              # Booking flow (search → payment)
│   ├── (auth)/                 # Authentication (login, register)
│   ├── (dashboard)/            # Authenticated user area
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles & design tokens (@theme)
│
├── features/                   # Feature-based modules (business domain)
│   ├── flights/                # Flight search, offers, seat selection
│   │   ├── api/                # API calls (uses services/http/client.ts)
│   │   ├── components/         # Flight-specific React components
│   │   ├── constants/          # Airport data, cabin classes, etc.
│   │   ├── hooks/              # useFlightSearch, etc.
│   │   ├── schemas/            # Zod validation schemas
│   │   ├── store/              # Zustand flight state
│   │   ├── types/              # TypeScript types
│   │   └── index.ts            # Public API of the feature
│   ├── booking/                # Booking flow, passenger info, PNR
│   ├── auth/                   # Authentication, sessions
│   ├── marketing/              # Landing page sections (Hero, Offers, etc.)
│   ├── passengers/             # Passenger management
│   └── payments/               # Payment processing
│
├── shared/                     # Shared across all features
│   ├── ui/                     # Primitive components: Button, Input, Badge…
│   ├── layout/                 # Structural components: Navbar, Footer, PageShell
│   ├── icons/                  # Centralized icon re-exports
│   ├── components/             # Composite components used by multiple features
│   └── utils/                  # Pure utility functions: formatCurrency, formatDate
│
├── services/
│   └── http/client.ts          # Typed fetch wrapper (all API requests go here)
│
├── lib/
│   └── utils.ts                # cn() — Tailwind class merging utility
│
├── hooks/                      # App-wide React hooks
├── providers/                  # React Context providers (QueryProvider, etc.)
├── store/                      # Global Zustand stores entry point
├── types/                      # Shared TypeScript types (ApiResponse, Nullable…)
├── constants/                  # App-wide constants (routes, navigation)
├── config/                     # Typed environment configuration
├── styles/                     # Additional global styles, tokens
├── assets/                     # Static assets (images, fonts, SVGs)
└── tests/
    ├── unit/                   # Vitest unit tests
    ├── integration/            # Integration tests
    └── e2e/                    # Playwright end-to-end tests
```

### Key architectural rules

1. **Feature isolation** — A feature never imports directly from another feature. Shared needs go to `shared/`.
2. **One-directional dependencies** — `app/ → features/ → shared/ → lib/`. Never the reverse.
3. **Barrel exports** — Every folder exposes a public API via `index.ts`. Import from the barrel, not from internal files.
4. **Server vs Client components** — Default to Server Components. Add `"use client"` only when state, effects, or browser APIs are needed.

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Component files | `kebab-case.tsx` | `flight-card.tsx` |
| Hook files | `use-name.ts` | `use-flight-search.ts` |
| Types / Interfaces | `PascalCase` | `FlightOffer`, `BookingStatus` |
| Enums / Constants | `UPPER_SNAKE_CASE` | `MAX_PASSENGERS` |
| Functions | `camelCase` | `formatDuration()` |
| Folders | `kebab-case` | `flight-search/` |
| Env variables | `UPPER_SNAKE_CASE` | `AUTH_SECRET` |

---

## Design System

The design system is documented in detail in [`DESIGN.md`](./DESIGN.md).

**Color palette overview:**

| Token | Value | Usage |
|---|---|---|
| `surface` | `#090E18` | Page background |
| `card` | `#111827` | Card and panel backgrounds |
| `elevated` | `#1F2937` | Modals, dropdowns |
| `aether-500` | `#1A4BF5` | Primary actions, links |
| `gold-500` | `#FFC72C` | Premium accents, highlights |

Typography uses **Geist** (sans-serif) and **Geist Mono** (monospace), both loaded via `next/font/google`.

---

## Accessibility

This project targets **WCAG 2.1 AA** compliance:

- All interactive elements are keyboard-navigable
- Focus indicators are always visible (`focus-visible`)
- ARIA roles and labels on all complex components (Combobox, DatePicker, Navigation)
- Skip-to-content link on every page
- `prefers-reduced-motion` disables all animations
- Color contrast ratios meet or exceed 4.5:1 for body text

---

## Security

- No secrets are committed to the repository
- All sensitive configuration uses environment variables (see `.env.example`)
- `NEXT_PUBLIC_*` variables are browser-safe — secrets never use this prefix
- The `services/http/client.ts` layer centralizes all API calls, making auth token injection a single-point concern
- Input validation uses Zod schemas on both client and server

---

## Contributing

This is a personal portfolio project and is not open to external contributions at this time. Feel free to fork it and use it as a reference for your own projects.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

<p align="center">Built with precision. Designed with intention.</p>
