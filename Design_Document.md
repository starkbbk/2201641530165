
# Affordmed Frontend – URL Shortener (Design Document)
**Date:** 2025-09-08 08:23

## 1) Overview
A single-page React app (Vite + Material UI) that shortens URLs, enforces uniqueness, supports optional validity and custom shortcodes, and records click analytics — all on the client. It integrates the required Logging Middleware that posts structured logs to the test server.

## 2) Architecture & Tech
- **Framework:** React 18 (Vite dev server)
- **UI:** Material UI (dark theme), responsive
- **Routing:** React Router; routes:
  - `/` – Shortener page (up to 5 URLs)
  - `/stats` – List of created links + click details
  - `/:code` – Redirect handler; increments counters and records click info
- **Persistence:** `localStorage` (keys: mappings + click log)
- **Env:** Runs on http://localhost:3000

## 3) Data Model (client-side)
- `Link`: `{ code: string, url: string, created: number, expiry: number, clicks: number }`
- `Clicks`: per `code`, an array of `{ time, referrer, agent, location }`

## 4) URL Creation Flow
1. User enters up to 5 rows: `url`, optional `minutes`, optional `code`.
2. **Validation (client-side):**
   - URL must be valid `http(s)`.
   - `minutes` integer > 0 (default = 30 if empty).
   - `code` (if present) 3–24 chars `[a-zA-Z0-9_-]`.
3. **Uniqueness:**
   - If custom code provided and exists → generate new random code.
   - Otherwise auto-generate 6-char alphanumeric; re-roll until unique.
4. Persist `Link` in `localStorage`. Show result list with short links.

## 5) Redirect Flow
- Route `/:code` looks up mapping.
- If missing → friendly error.
- If expired → friendly message.
- If valid → record click: time, referrer, browser agent, coarse location (timezone / best-effort geolocation). Then `window.location.replace(url)`.

## 6) Statistics Page
- Table of all links: short code, original, created, expiry, total clicks.
- Expand per link to see detailed click rows.

## 7) Logging Middleware
- Reusable function: `Log(stack, level, package, message)` in `src/lib/logger.js`.
- Sends POST to: `http://20.244.56.144/evaluation-service/logs` with Bearer token saved from **Settings**.
- Typical calls:
  - `Log('frontend','info','page','urls shortened')`
  - `Log('frontend','warn','route','link expired')`
  - `Log('frontend','error','route','code not found')`
- Valid values:
  - **stack:** `frontend` (or `backend` per spec list)
  - **level:** `debug|info|warn|error|fatal`
  - **package:** `api|auth|middleware|utils|component|page|state|hook|style`

## 8) Error Handling & UX
- Inline validation messages on the Shortener page.
- Friendly states for not found / expired on redirect.
- Inputs and labels visible on dark background via MUI dark theme.

## 9) Assumptions
- APIs for registration/auth are used to fetch/stash token only (frontend track). No backend needed.
- Coarse location is acceptable. If geolocation rejected, timezone fallback is used.
- Client-side persistence is acceptable for evaluation.

## 10) How to Run
```bash
npm install
npm run dev
# open http://localhost:3000
```
Use **Settings** to save email/name/roll/accessCode, paste ClientID & ClientSecret, then click **Get Token**. The token is stored locally and used by the logger.

## 11) Folder Pointers
- Shortener UI: `src/pages/Shortener.jsx`
- Redirect: `src/pages/Redirector.jsx`
- Stats: `src/pages/Stats.jsx`
- Storage helpers: `src/lib/storage.js`
- Validation: `src/lib/validation.js`
- Logger: `src/lib/logger.js`
- Settings panel: `src/lib/auth.jsx`

## 12) Test Cases (manual)
- Create 1, 3, and 5 URLs.
- Leave minutes blank → expects 30 min.
- Use invalid URL → validation error.
- Repeat shortcode → uniqueness handled.
- Visit `/:code` before and after expiry → success, then expired.
- Check stats → click count increments; details recorded.
- Confirm logs arrive (watch network tab for `/logs` POST 200).
