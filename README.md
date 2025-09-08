
# URL Shortener (Frontend – React + Material UI)

Runs on **http://localhost:3000**

## Features
- Create up to 5 short links at once
- Optional validity (minutes) – defaults to 30
- Optional preferred shortcode – guaranteed unique
- Client-side routing for `/:code` redirects
- Stats page with total clicks + detailed click rows
- Coarse location via browser geolocation (if allowed)
- **Logging Middleware**: reusable `Log(stack, level, package, message)` that POSTs to the test server using a saved token
- **Material UI only**

## Setup
```bash
npm install
npm run dev
```

## Settings / Token
Use the **Settings** button in the header to save your email/name/roll/accessCode, then paste ClientID/ClientSecret and click **Get Token**.
The token is stored locally and used by the logger.
