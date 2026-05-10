# Traveloop

Full-stack travel planning platform with a TypeScript/Express backend and a React/Vite frontend. The app helps users plan multi-city trips, manage itineraries, track budgets, and share trips.

## Repo Structure

- `backend/` - Node.js + Express API (TypeScript, MySQL)
- `traveloop/` - React + Vite client (TypeScript)
- `database/` - SQL schema and seed text for local DB setup

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Sequelize, MySQL
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Auth**: JWT

## Prerequisites

- Node.js 16+
- npm 8+ (or yarn/pnpm)
- MySQL 8+

## Quick Start

### 1) Backend

```bash
cd backend
npm install
```

Create a `.env` file (start from `.env.example` if present) and set DB credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=traveloop_db
DB_USER=root
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

Seed the database and start the API:

```bash
npm run seed
npm run dev
```

API runs at `http://localhost:5000`.

### 2) Frontend

```bash
cd traveloop
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

### Backend

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run production build
- `npm run seed` - Seed database

### Frontend

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- The backend and frontend are decoupled. Ensure `FRONTEND_URL` matches your Vite dev server.
- MySQL must be running before seeding or starting the API.

## License

MIT