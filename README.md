# Merra — Practice Job Interviews with AI

Merra helps job seekers practice real job interviews with an AI interviewer. Upload a resume, pick a target role, rehearse a live back-and-forth conversation, and get a match-fit score with feedback and a full transcript.

## Backend (Python + FastAPI + PostgreSQL)

From the project root:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Create the database in Postgres:

```sql
CREATE DATABASE meera;
```

Set credentials in `.env`:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=meera
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Then start the API:

```bash
python run.py
```

API: `http://localhost:5000`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

## Auth

| Method | Path | Body |
|--------|------|------|
| POST | `/api/auth/signup` | `{ "email", "password" }` |
| POST | `/api/auth/signin` | `{ "email", "password" }` |
| GET | `/api/auth/me` | Bearer token |

Pages: `/signin`, `/signup`
