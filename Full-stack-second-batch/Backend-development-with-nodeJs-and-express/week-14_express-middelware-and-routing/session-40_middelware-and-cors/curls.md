# Curl Demo for Users API

Run these in order for a clean demo of each endpoint. Remove `| jq` if `jq` is not installed.

## Create user (POST)

```bash
curl -s -X POST http://localhost:3000/api/v1/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Charlie","email":"charlie@example.com"}' | jq
```

## List users (GET)

```bash
curl -s http://localhost:3000/api/v1/users | jq
```

## Get user by id (GET)

```bash
curl -s http://localhost:3000/api/v1/users/1 | jq
```

## Replace user (PUT, full body)

```bash
curl -s -X PUT http://localhost:3000/api/v1/users/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice Updated","email":"alice.updated@example.com"}' | jq
```

## Update user partially (PATCH)

```bash
curl -s -X PATCH http://localhost:3000/api/v1/users/1 \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice.patch@example.com"}' | jq
```

## Delete user (DELETE)

```bash
curl -i -X DELETE http://localhost:3000/api/v1/users/1
```

## Show 404 example (GET non-existent)

```bash
curl -s -o - -w '%{http_code}\n' http://localhost:3000/api/v1/users/9999
```
