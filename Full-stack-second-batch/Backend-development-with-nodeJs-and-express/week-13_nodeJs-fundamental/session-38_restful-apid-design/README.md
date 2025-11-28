# Demo RESTful Users API

Teaching-focused project showing the 80/20 of RESTful API design while implementing a simple Users resource with Node.js + Express. It uses ESM modules and a clean routers → controllers → services structure.

## 1. What This Project Can Do

- Serve a versioned REST API at `/api/v1`
- Provide full Users CRUD: list, fetch single, create, replace (PUT), partial update (PATCH), delete
- Organized by routers, controllers, and services (in-memory data store)
- ESM module syntax (`type: module`)
- Minimal middleware (no CORS, morgan, docs, or validation layers)

## 2. Concepts Covered

| Concept           | How It Appears Here                                    |
| ----------------- | ------------------------------------------------------ |
| Resources & URIs  | Noun-based endpoints: `/users`, `/users/:id`           |
| HTTP Methods      | GET, POST, PUT, PATCH, DELETE each mapped to semantics |
| Status Codes      | 200, 201, 204, 404 demonstrated                        |
| Statelessness     | No session storage; each request self-contained        |
| Uniform Interface | Consistent JSON responses & patterns                   |
| Versioning        | Prefix `/api/v1` isolates future changes               |
| Structure         | Routers → Controllers → Services                       |

## 3. Architecture Overview

```
src/
  index.js         → Server bootstrap (ESM)
  app.js           → App + JSON middleware + route mounting
  routes/users.js  → Route definitions
  controllers/     → Request handling (usersController.js)
  services/        → Data operations (usersService.js, in-memory)
```

Separation keeps concerns clear: routing vs controller logic vs data operations.

## 4. Getting Started

```bash
npm install
npm run dev   # Uses nodemon for auto-reload
```

Environment variables (optional):

- `PORT` – override default 3000

## 5. Endpoints Summary

| Method | Endpoint          | Purpose                | Success Codes |
| ------ | ----------------- | ---------------------- | ------------- |
| GET    | /api/v1/users     | List all users         | 200           |
| POST   | /api/v1/users     | Create user            | 201           |
| GET    | /api/v1/users/:id | Get a single user      | 200           |
| PUT    | /api/v1/users/:id | Full replace of user   | 200           |
| PATCH  | /api/v1/users/:id | Partial update of user | 200           |
| DELETE | /api/v1/users/:id | Delete user            | 204           |

## 6. Request & Response Examples

Create (POST):

```bash
curl -s -X POST http://localhost:3000/api/v1/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Charlie","email":"charlie@example.com"}' | jq
```

Response (201):

```json
{
  "id": 3,
  "name": "Charlie",
  "email": "charlie@example.com"
}
```

Partial Update (PATCH):

```bash
curl -s -X PATCH http://localhost:3000/api/v1/users/1 \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice.new@example.com"}' | jq
```

## 7. Error Handling

- 404 Returned when resource ID not found
- No global error middleware or validation layer in this demo

## 10. Demo Flow Suggestion (10–12 min)

1. Hit `/api/v1/users` (list) → show seed data
2. Create a new user (POST) → highlight 201
3. Fetch that user (GET /:id)
4. Show PUT vs PATCH difference (full vs partial)
5. Delete user → point out 204 (empty body)
6. Optionally show 404 by requesting a non-existing ID

## 11. Teaching Talking Points

- Emphasize nouns in URLs; avoid verbs (`/getUsers`)
- Distinguish PUT (replace) vs PATCH (partial modify)
- Importance of versioning for evolution
- Consistency & predictability reduce cognitive load
  -- Keep controllers thin; move data logic to services

## 12. Extending This Project

- Add pagination: `GET /users?limit=10&offset=0`
- Filtering: `GET /users?email=...`
- Authentication layer (JWT) → introduce 401/403
- Persistence: swap array for DB (Mongo/Postgres)
- ETags / caching headers for scalability
- Tests with Jest or supertest

## 13. FAQ

**Why in-memory?** Simplifies demo; focus on HTTP & design.
**Why a single resource?** Keeps cognitive load low while illustrating all verbs.

## 15. Maintenance Guidelines

- Add integration tests before refactors
- Increment version prefix for breaking changes (`/api/v2`)

## 16. License / Usage

Use freely for teaching, workshops, and internal training. No warranty implied.

---

Happy presenting & teaching REST! 🎓
Enjoy presenting! 🎓
