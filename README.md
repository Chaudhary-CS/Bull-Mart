# Bull-Mart

A step-by-step built multi-vendor marketplace using the MERN stack with real-time messaging.

## Local development
- Prereqs: Node 18+, Docker (for MongoDB)
- Start MongoDB: `docker run -d --name e_shop_mongo -p 27017:27017 -v e_shop_mongo_data:/data/db mongo:6`
- Backend: `cd backend && npm install && npm start`
- Socket: `cd socket && npm install && npm start`
- Frontend: `cd frontend && npm install --legacy-peer-deps && npm start`

Services:
- App: http://localhost:3001 (or 3000)
- API: http://localhost:8000/api/v2
- Socket: http://localhost:4000

## Environment
Create `backend/config/.env` with keys for JWT, SMTP, and Stripe as needed.
