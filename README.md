# Telegram Mini App Preview

This folder is the deployable preview build for the `Share & Get FREE Spin` Telegram Mini App.

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
6. Use that HTTPS URL as the Telegram Mini App web app URL later.

## Current status

This is a front-end preview only.

Not connected yet:

- Telegram Bot API
- real referral tracking
- phone verification backend
- reward calculation backend
- admin dashboard
