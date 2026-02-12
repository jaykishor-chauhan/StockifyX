# BulkNepal Backend (scaffold)

Minimal Express + Mongoose backend scaffold.

Quick start

```bash
cd bulknepalb
npm install
cp .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
npm run dev
```

API endpoints (basic)

- `POST /api/auth/register` - register
- `POST /api/auth/login` - login (returns JWT)
- `GET /api/transactions` - list user transactions (auth)
- `POST /api/transactions` - create transaction (auth)
