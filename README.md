# WeatherGuard Admin

WeatherGuard Admin is a small invitation-based weather alert system built with a NestJS API and a React admin panel. Users request access, an admin approves or rejects them, and approved users are included in scheduled weather alert checks.

## Tech Stack

- Backend: NestJS, Prisma, PostgreSQL, JWT, Passport, `@nestjs/schedule`
- Frontend: React, TypeScript, Vite, Tailwind CSS, TanStack Query
- Database: PostgreSQL through Prisma

## Project Structure

```text
weatherguard-admin/
|-- backend/     # NestJS API
|-- frontend/    # React admin panel
|-- project.md   # Original assignment brief
`-- README.md
```

I kept the backend and frontend in separate folders because they have different runtime concerns and can be deployed independently. They still live in one repository so the review flow is straightforward.

## Architecture Notes

The backend is split by feature modules:

- `auth`: login, JWT signing, JWT strategy, auth guard
- `invites`: public invite request flow
- `users`: admin-only user listing and approve/reject actions
- `weather`: scheduled weather simulation and alert history
- `prisma`: database client provider
- `common`: shared constants, decorators, guards, and response helpers

Controllers handle HTTP routing, services hold business logic, and DTOs validate incoming data. Role-based access is implemented with a `Roles` decorator plus `RolesGuard`, keeping admin protection visible at the controller level.

The frontend keeps server state in TanStack Query hooks instead of manually synchronizing table state. API calls live under `src/api`, reusable query/mutation hooks live under `src/hooks`, and pages compose those pieces into the invite, login, and dashboard flows.

## Local Setup

From the project root:

```bash
npm run setup
```

Or run each app manually:

```bash
cd backend
npm install
npm run db:push
npm run db:seed
npm run start:dev
```

```bash
cd frontend
npm install
npm run dev
```

Default URLs:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

## Demo Credentials

```text
Email: admin@weatherguard.local
Password: Admin@123
```

These credentials are created by `npm run db:seed` in the backend.

## API Routes

- `POST /invites/request`: create a pending invite request
- `GET /invites/status?email=user@example.com`: check invite status and delivered alerts
- `POST /auth/login`: admin login
- `GET /users?status=PENDING`: list pending users, admin only
- `GET /users?status=APPROVED`: list approved users, admin only
- `PATCH /users/:id/status`: approve or reject a user, admin only
- `GET /weather/alerts`: recent alert history, admin only
- `POST /weather/trigger-demo`: manually create demo alerts, admin only

## Weather Simulation

The scheduler runs every five minutes using `@nestjs/schedule`. It finds approved users and creates simulated weather alerts for their cities. I also added a manual trigger endpoint so the reviewer can see the alert flow immediately in a short demo video.

I chose simulation instead of a third-party weather API because the assignment allows it and it keeps the core review focused on architecture, auth, approvals, state management, and the scheduled job.

## Demo Flow

1. Open the invite request page.
2. Submit a new user with name, email, and city.
3. Log in as the seeded admin.
4. Confirm the user appears in the Pending table.
5. Approve the user.
6. Confirm the user moves to the Approved table.
7. Click "Trigger demo alert".
8. Confirm a weather alert appears in Recent weather alerts.
9. Open "My alerts", enter the user's email, and confirm the same alert is visible for that approved user.

## Deployment Notes

The project is configured for Render with PostgreSQL.

Backend Render Web Service:

- Root Directory: `backend`
- Build Command: `npm install && npm run render:build`
- Start Command: `npm run start:prod`

Backend environment variables:

```text
DATABASE_URL=<Render Postgres internal database URL>
JWT_SECRET=<long random secret>
ADMIN_EMAIL=admin@weatherguard.local
ADMIN_PASSWORD=Admin@123
FRONTEND_URL=<Render frontend URL>
PORT=3000
```

Frontend Render Static Site:

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Frontend environment variable:

```text
VITE_API_URL=<Render backend URL>
```

## Tradeoffs

- PostgreSQL is used so the deployed app keeps data across restarts and redeploys.
- Invite approval does not create user passwords because the requested scope is admin approval and alert eligibility. A lightweight email lookup page is included so the user-side alert delivery can be demonstrated without adding a full user auth system.
- Weather alerts are simulated for reliability during review and recording.
