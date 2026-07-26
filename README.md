# FAMES & R Office PRO

FAMES & R Office PRO is a production-quality, high-performance office management and audit synchronization console built for **FAMES & R Chartered Accountants**. This platform streamlines client directories, staff allocation timesheets, corporate jobs registries, substantive audit testing sequences, and regulatory compliance (NBR & RJSC) tracking.

---

## 🚀 Architectural Scope

This system is currently in **Phase 1: Frontend Foundation & Blueprint Mode**.
- **No Backend**: There is currently no active database or backend API. All operations run securely in the client browser with stateful reactivity.
- **No Supabase/Database Connections**: Preparing fields and client endpoints for instant synchronization.
- **No Authentication Claims**: All credentials or auth panels are simulation placeholders ready for future integrations.

---

## 🛠️ Tech Stack & Dependencies

- **React 19 & TypeScript 5** — For type-safe modular user interfaces.
- **Vite** — High-speed modern development bundler.
- **Tailwind CSS v4** — High-fidelity modern style system.
- **React Router Dom v6** — Centralized browser-route routing engine.
- **React Hook Form** — Robust form state and input controller.
- **Zod** — Type-safe client schema validation.
- **TanStack Query** — Configured query keys ready for future server caching.

---

## 📁 Scalable Project Structure

```text
src/
  ├── app/                     # Main app loaders and system configuration
  ├── components/              # Shared components
  │   ├── common/              # Generic utility interfaces
  │   ├── layout/              # AppShell, TopHeader, Sidebar, Breadcrumbs, etc.
  │   └── ui/                  # MetricCard, DataTableShell, Modals, Toasts, etc.
  ├── constants/               # Centralized Navigation configurations
  ├── features/                # Domain-driven features mapping all routes
  │   ├── dashboard/           # Operational executive telemetry
  │   ├── clients/             # Onboarding, Directories, and communications
  │   ├── staff/               # Allocations, Attendance, Performance, Leave calendar
  │   ├── jobs/                # Assurances deadlines, assignments, documents vault
  │   ├── audit/               # Structural 7-stage audit procedure workflows
  │   └── administration/      # Security user management, firm settings, readiness checks
  ├── hooks/                   # Custom reusable react hooks
  ├── lib/                     # Third party SDK and adapter utilities
  ├── mock-data/               # Dynamic baseline mock objects
  ├── routes/                  # Centralized routes configurations
  ├── services/                # Future-ready client API proxies (apiClient.ts)
  └── types/                   # Centralized type definitions (index.ts)
```

---

## ⚙️ Environment Variables

The application contains environment controls documented in `.env.example`:

- `VITE_API_BASE_URL`: Base URL targeting your future server. (Defaults to `/api` for testing).

---

## 🎯 Future Backend Integration Plan

Once you are ready to transition to full-stack, FAMES & R Office PRO is engineered to be instantly plug-and-play:
1. **Enable Backend Script**: Update `package.json` dev script to run a Node server or connect directly to a cloud server like Supabase or Firebase.
2. **Setup Firebase/Supabase**: Provision databases and activate authorization rules.
3. **Connect apiClient.ts**: Define `VITE_API_BASE_URL` in your production environments. `src/services/apiClient.ts` will automatically detect the presence of this variable and proxy genuine fetch operations in place of mock latencies. No feature view code needs to be modified.
