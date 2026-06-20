# WeatherGuard Backend

NestJS API for WeatherGuard Admin.

## Setup

```bash
npm install
npm run db:push
npm run db:seed
```

## Run

```bash
npm run start:dev
```

## Build

```bash
npm run build
```

## Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `FRONTEND_URL`

See the root README for the full architecture notes and demo flow.
