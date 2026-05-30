# Gentong Mas ERP — Authentication System

Full-stack authentication for the Gentong Mas ERP platform.

## Stack

| Layer    | Technology |
|----------|-----------|
| Backend  | NestJS 10, Prisma ORM, PostgreSQL |
| Frontend | Next.js 14 App Router, Tailwind CSS |
| Auth     | JWT (access + refresh), Google OAuth, OTP email |

---

## Project Structure

```
/
├── backend/          NestJS API (port 4000)
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       └── auth/
│           ├── auth.module.ts
│           ├── auth.controller.ts
│           ├── auth.service.ts
│           ├── prisma.service.ts
│           ├── strategies/
│           │   ├── local.strategy.ts
│           │   ├── jwt.strategy.ts
│           │   └── google.strategy.ts
│           ├── guards/
│           │   ├── jwt-auth.guard.ts
│           │   └── roles.guard.ts
│           └── dto/
│               ├── login.dto.ts
│               ├── verify-otp.dto.ts
│               ├── select-tenant.dto.ts
│               └── send-otp.dto.ts
│
└── frontend/         Next.js App (port 3000)
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/page.tsx
    │   │   ├── otp/page.tsx
    │   │   └── select-tenant/page.tsx
    │   └── dashboard/page.tsx
    ├── lib/api.ts
    ├── store/auth.store.ts
    └── middleware.ts
```

---

## Quick Start

### 1. Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- PostgreSQL database

### 2. Backend setup

```bash
cd backend

# Install dependencies
pnpm install

# Copy and fill in environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT secrets, Google OAuth, and SMTP settings

# Generate Prisma client and run migrations
pnpm prisma:generate
pnpm prisma:migrate:dev

# Start development server (port 4000)
pnpm start:dev
```

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
pnpm install

# Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:4000

# Start development server (port 3000)
pnpm dev
```

### 4. Run both simultaneously (from project root)

```bash
pnpm install   # installs concurrently at root
pnpm dev       # starts both backend and frontend
```

---

## Auth Flow

```
POST /auth/login
    │
    ├─► is2FAEnabled? ──► send OTP ──► POST /auth/otp/verify ──► tokens
    │
    ├─► multiple companies? ──► select-tenant UI ──► POST /auth/select-tenant ──► tokens
    │
    └─► single company ──► tokens immediately
```

### Token strategy

| Token        | Lifetime | Storage          |
|-------------|---------|-----------------|
| accessToken  | 15 min   | Memory (Zustand) |
| refreshToken | 7 days   | httpOnly cookie  |

On 401, the Axios interceptor in `lib/api.ts` automatically calls `POST /auth/refresh` and retries the original request.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Must be `http://localhost:4000/auth/google/callback` |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (usually 587 or 465) |
| `SMTP_USER` | SMTP username / email |
| `SMTP_PASS` | SMTP password / app password |
| `FRONTEND_URL` | Frontend origin for CORS (`http://localhost:3000`) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|------------|
| `NEXT_PUBLIC_API_URL` | Backend URL (`http://localhost:4000`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Same Google client ID (for display) |

---

## API Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| POST | `/auth/login` | Email + password login (rate limited: 5/min) | — |
| GET  | `/auth/google` | Initiate Google OAuth | — |
| GET  | `/auth/google/callback` | Google OAuth callback | — |
| POST | `/auth/otp/send` | Send/resend OTP to user email | — |
| POST | `/auth/otp/verify` | Verify OTP code | — |
| POST | `/auth/select-tenant` | Select company, issue scoped tokens | — |
| POST | `/auth/refresh` | Refresh access token (reads httpOnly cookie) | — |
| POST | `/auth/logout` | Revoke refresh token + clear cookie | JWT |

---

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds)
- refreshToken is stored **hashed** in the database
- refreshToken rotation: old token is deleted on each refresh
- OTP is single-use and expires after 5 minutes
- `/auth/login` is rate-limited to 5 requests/minute per IP
- All cookies are `httpOnly`, `sameSite: strict`, `secure` in production
