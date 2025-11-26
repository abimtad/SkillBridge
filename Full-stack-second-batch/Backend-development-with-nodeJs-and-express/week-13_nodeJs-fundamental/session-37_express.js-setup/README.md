# Express Demo: Status Codes, Responses, Static, Headers

This small Express app demonstrates:

- Using different HTTP status codes (200, 201, 400, 404, 503)
- Returning responses as JSON and plain text
- Serving static files with `express.static`
- Editing headers on HTTP responses

## Quick Start

```sh
npm install
npm run start
# open http://localhost:3000/static/index.html
```

## Endpoints

- `GET /health` — returns `{ status: 'ok' }` with `200`.
- `GET /health?fail=true` — returns `{ status: 'unhealthy' }` with `503`.
- `GET /api/welcome` — plain text response.
- `GET /api/users` — JSON response containing a small in-memory list.
- `POST /api/users` — creates a new in-memory user. Returns `201` with `Location` header pointing to `/api/users/:id`.
- `GET /api/headers-demo` — sets custom headers (`X-Powered-By`, `Cache-Control`, `Content-Type`).
- `GET /go-to-docs` — redirects to the static docs page.
- `GET /static/*` — serves assets from `public/`.

## Static Files

Open `http://localhost:3000/static/index.html` to view the demo page served from the `public/` folder.

## Project Structure

```
src/
  server.js        # Express server and endpoints
public/
  index.html       # Static demo page
  styles.css       # Styling
  logo.png         # Logo (placeholder)
```

## Notes

- This app keeps data in-memory for demonstration purposes. Restarting the server resets state.
- Modify `PORT` via environment variable if needed.
