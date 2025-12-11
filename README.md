### UpCode: Zero to Hero
UpCode: Zero to Hero is a Group Innovation Project for CAT304 at USM School of Computer Sciences. This repository contains both the frontend (React + TypeScript) and backend (Node.js) code for the project, developed by a team of four under the supervision of Dr. Fadratul binti Hassan.

**Contributors**
- `Tan Xin Sheng` (22301827)
- `Wong Zhi Heng` (22304070)
- `Chan Jia Liang` (22304211)
- `Jee Ci Hong` (22303833)

**This README** describes the frontend folder and overall project structure, how to set up the local environment, run the app, and common troubleshooting steps.

**Tech stack (high level)**
- **Frontend:** React + TypeScript, Tailwind CSS, shadCN, Redux Toolkit, React Router, TanStack Query
- **Backend:** Node.js, Express, MySQL (mysql2 driver), dotenv, bcrypt, cors

**Important libraries explained**
- `dotenv` : load environment variables from a local `.env` into `process.env` so secrets and configuration don't live in source code.
- `express` : lightweight Node.js web framework used to create routes, middleware and HTTP handlers for the API.

**Prerequisites**
- Node.js (v16+ recommended). Verify with `node --version` and `npm --version`.
- Local MySQL server (or remote DB credentials). Create a database and user for the project.
- Git (to clone the repo).

**Quick setup (local development)**
Open a PowerShell terminal and run the following commands:

```powershell
git clone https://github.com/xinsheng04/CAT-304.git
cd CAT-304
cd frontend
npm install
```

Then install and prepare the backend in another terminal:

```powershell
cd CAT-304\backend
npm install
```

**Environment variables**
- Create a `.env` file in the `backend` directory (do not commit it). A minimal example of variables the backend expects:

```text
DB_PASSWORD=your_db_password
```

**Run (development)**
- Frontend (Vite dev server):

```powershell
cd frontend
npm run dev
```

- Backend (Node + nodemon recommended during development):

```powershell
cd backend
npm run dev
```

By default the frontend dev server usually runs at `http://localhost:5173/` and the backend at the `PORT` defined in `backend/.env` (commonly `3000`). Configure the frontend to point to the backend API base URL via environment variables if needed.

**Database quickstart (MySQL)**
1. Create the database and a user (example SQL):

```sql
CREATE DATABASE upcode_db;
CREATE USER 'upcode_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON upcode_db.* TO 'upcode_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Run any migration or seed SQL your backend provides (if available). If you don't have migrations, you can create tables manually or add a basic `schema.sql` and run it with the `mysql` client.

**Build / Production**
- Frontend build (static assets):

```powershell
cd frontend
npm run build
```

- Backend: prepare production environment variables, and run with `node server.js` (or a process manager such as `pm2`). Ensure the backend `PORT` is set and the DB connection points to a production database.

**Common scripts (suggested)**
- `frontend/package.json`:
	- `dev` – run Vite dev server
	- `build` – produce production bundle
	- `preview` – preview built site locally
- `backend/package.json`:
	- `dev` – run with `nodemon` for development (hot reload)
	- `start` – run with `node server.js` in production

**shadCN and Tailwind note**
- `npx shadcn@latest init` bootstraps shadCN components and prompts to install packages. It's used to quickly scaffold component primitives that integrate with Tailwind.

**Troubleshooting**
- If the frontend can't reach the backend: check backend `PORT`, CORS settings in the backend, and that frontend API base URL matches (check `/src/constant.tsx` if you store API URL there).
- `dotenv` not loading: ensure `require('dotenv').config()` is called near the top of your backend entry file before any `process.env` reads.
- MySQL connection errors: confirm credentials, DB host, and that the MySQL service is running.
- Port conflicts: change `PORT` in `.env` or free the occupied port.
