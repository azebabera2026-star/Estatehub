# EstateHub — Property Listing Platform (Frontend Prototype)

A frontend-only, fully interactive real estate UI built with **React + TypeScript + Vite + Tailwind CSS**.
There is no backend — all data lives in `src/data/mockData.ts` and in local React state, so every
action (saving a property, submitting a listing, approving a request, suspending a user) is simulated
in memory and resets on refresh.

## Design direction

- **Palette**: deep navy (`#0A0F1E`–`#16213E`), crisp white/parchment (`#F7F6F2`), and an emerald accent
  (`#0F9D6C`), with a terracotta "price drop" clay tone used sparingly.
- **Type**: Fraunces (display serif) for headings, Inter for body/UI text, and IBM Plex Mono for all
  numeric "spec plate" data — prices, square footage, bed/bath counts, coordinates — so figures read like
  entries on an architectural drawing rather than marketing copy.
- **Signature motif**: a blueprint grid (faint navy graph lines) in the hero and the mock map, echoing
  a property survey. Prices are shown as small monospace "spec plates," reinforcing the idea that every
  listing here is measured and verified, not just marketed.

## Project structure

```
estatehub/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                 # App entry point
    ├── App.tsx                  # Root component — view routing & top-level state
    ├── index.css                # Tailwind directives + global styles
    ├── types/index.ts           # Shared TypeScript types
    ├── data/mockData.ts         # All mock properties, agents, users, leads, tours
    ├── utils/format.ts          # Price/area/date formatting helpers
    └── components/
        ├── Navbar.tsx           # Nav + role switcher ("simulate role" menu)
        ├── Hero.tsx             # Home hero with search bar
        ├── HomePage.tsx         # Home page (hero, featured grid, promo banners)
        ├── ListingsPage.tsx     # Full listings grid + filters + sort
        ├── SearchFilters.tsx    # Filter panel (type, transaction, price, beds/baths, city)
        ├── PropertyList.tsx     # Reusable property grid
        ├── PropertyCard.tsx     # Single property card
        ├── PropertyDetails.tsx  # Full detail page (gallery, amenities, agent, mock map, tour form)
        ├── TagBadge.tsx         # "Featured" / "New" / "Price Drop" badges
        ├── Footer.tsx
        ├── icons.tsx            # Small inline SVG icon set (no external icon dependency)
        ├── Dashboards.tsx       # Picks the right dashboard for the active role
        └── dashboards/
            ├── CustomerDashboard.tsx
            ├── AgentDashboard.tsx
            ├── AdminDashboard.tsx
            ├── PropertyFormModal.tsx   # Add/Edit property modal used by AgentDashboard
            └── StatCard.tsx
```

## Running it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
# 1. Move into the project folder
cd estatehub

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`) — open it in your browser.

To create a production build:

```bash
npm run build
npm run preview   # serves the built app locally so you can sanity-check it
```

## How the simulated roles work

Click the pill in the top-right of the navbar (or the menu button on mobile) to switch between:

- **Guest** — public browsing only (Home + Listings + Details).
- **Customer** (Jonah Whitfield) — sees saved properties, saved searches, and tour requests.
- **Agent** (Maren Okafor) — sees managed listings with an Add/Edit modal, leads, and recent inquiries.
- **Admin** (Renata Silva) — sees platform stats, a pending-approvals queue with Approve/Reject actions,
  and a user management table with Suspend/Reactivate.

All of this is held in `App.tsx`'s local state (`useState`), so switching roles is instant and does not
call any network API.

## Notes & limitations

- This is intentionally **frontend-only** — there's no persistence, auth, or real backend. Refreshing the
  page resets everything to the original mock data.
- Images are hotlinked from Unsplash for realistic photography; swap in your own asset pipeline for
  production use.
- The "mock location map" on the property detail page is a stylized placeholder (blueprint grid +
  coordinates), not a real map integration — wire in Mapbox/Google Maps if you need a live map.
