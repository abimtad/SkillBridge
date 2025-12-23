# JWT Mini Project

This mini project demonstrates the requested topics around JWT (without refresh tokens), using Express and lowdb. No password hashing or advanced security is included by design.

## Topics Covered
- JWT Authentication: `/auth/login` returns an access token and sets an httpOnly cookie
- Authentication vs authorization:
   - `/auth/me` requires a valid access token
   - `/auth/admin` requires access token + `role=admin`
- JWT token structure: `/auth/token-structure` decodes a provided Bearer token
- Token generation and verification: handled via `src/utils/jwt.util.js`
- Token storage strategies: `/auth/token-storage-strategies` returns guidance (no refresh tokens implemented)

## Project Structure
- routes: `src/routes/auth.routes.js`
- middlewares: `src/middlewares/*`
- errors: `src/errors/app-error.js`
- controllers: `src/controllers/auth.controller.js`
- services: `src/services/*`
- utils: `src/utils/jwt.util.js`
- lib: `src/lib/db.js` (lowdb)

## Quick Start

```bash
npm install
npm run dev
```

Seed users (plaintext as requested):
- alice / alicepass (role: user)
- bob / bobpass (role: admin)

## Example Flow
1. Login:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"alice","password":"alicepass"}'
   ```
   - Response sets `access_token` httpOnly cookie and returns the token in JSON.
2. Use access token:
   ```bash
   curl http://localhost:3000/auth/me -H "Authorization: Bearer <accessToken>"
   ```
3. Authorization check:
   ```bash
   curl http://localhost:3000/auth/admin -H "Authorization: Bearer <accessToken>"
   ```
4. Inspect token structure:
   ```bash
   curl http://localhost:3000/auth/token-structure -H "Authorization: Bearer <accessToken>"
   ```
5. Token storage strategies (guidance only):
   ```bash
   curl http://localhost:3000/auth/token-storage-strategies
   ```
6. Logout (clears httpOnly cookie):
   ```bash
   curl -X POST http://localhost:3000/auth/logout
   ```

## Environment
- You can override secrets and expirations:
   - `ACCESS_TOKEN_SECRET`
   - `ACCESS_TOKEN_EXPIRES_IN` (default `15m`)
   - `ACCESS_TOKEN_COOKIE_MAX_AGE_MS` (default 900000 ms = 15m)
