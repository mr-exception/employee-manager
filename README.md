# Employee Manager

A full-stack employee management app built with NestJS, Next.js, and MongoDB.

## Project Structure

```
employee-manager/
├── api/        # NestJS backend (port 8000)
├── webapp/     # Next.js frontend (port 3000)
└── packages/
    └── specs/  # Shared TypeScript interfaces
```

## Prerequisites

- Node.js 22+
- MongoDB (local instance or connection URI)

## Setup

### 1. Install dependencies

From the root directory:

```bash
npm install
```

### 2. Configure environment variables

**API** — copy the example file and fill in your values:

```bash
cp api/.env.example api/.env
```

| Variable    | Description               | Default                                      |
| ----------- | ------------------------- | -------------------------------------------- |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/employee-manager` |
| `PORT`      | API server port           | `8000`                                       |

**Webapp** — create `webapp/.env`:

```bash
cp webapp/.env.example webapp/.env
```

| Variable                   | Description  | Default                 |
| -------------------------- | ------------ | ----------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | `http://localhost:8000` |

## Running the App

### Option 1 — Local (npm)

Requires a running MongoDB instance (see `MONGO_URI` above).

```bash
npm run dev          # both apps concurrently
npm run dev:api      # API only    → http://localhost:8000
npm run dev:webapp   # Webapp only → http://localhost:3000
```

### Option 2 — Docker

**Local development** (MongoDB only, apps run via npm):

```bash
docker compose -f docker-compose.local.yml up -d
```

Starts a MongoDB container on port `27017`. Run the apps with `npm run dev` as normal.

**Full stack** (MongoDB + API + Webapp, all containerised):

```bash
docker compose up --build
```

| Service | URL                    |
|---------|------------------------|
| API     | http://localhost:3000  |
| Webapp  | http://localhost:3001  |
| MongoDB | localhost:27017        |

## Building for Production

```bash
npm run build
```
