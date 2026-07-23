# Telegram Mini App Preview

This folder is the deployable preview build for the `Ultrawin77` Telegram Mini App.

## Files

- `index.html`: page structure
- `styles.css`: page styling
- `script.js`: front-end interactions
- `server.js`: lightweight static server for Railway
- `package.json`: Railway start configuration

## Run locally

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Deploy to Railway

1. Create a new Railway project.
2. Upload or connect this folder as the project source.
3. Railway will detect `package.json`.
4. Start command:

```text
npm start
```

5. After deploy, Railway will give you an HTTPS URL.
6. Add the Railway HTTPS URL to the main bot Railway Variables:

```text
MINI_APP_URL=https://your-mini-app.up.railway.app
```

7. Restart the main bot deployment so the Mini App button appears.

## Current status

This is a front-end preview with Telegram WebApp shell support, weighted spin animation, and bot deeplink sharing.

Not connected yet:

- Telegram Bot API
- real referral tracking
- phone verification backend
- reward calculation backend
- admin dashboard
