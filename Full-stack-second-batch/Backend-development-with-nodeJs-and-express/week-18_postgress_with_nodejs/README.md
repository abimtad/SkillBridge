# Prisma + PostgreSQL sample

This sample shows a Prisma schema using PostgreSQL and demonstrates:
- A one-to-one relation between `Student` and `Address`.
- A many-to-many relation between `Student` and `Course`.

Setup

1. Install dependencies:

```bash
cd week-18_postgress_with_nodejs
npm install
```

2. Set your Postgres connection in `.env` (update username/password/db):

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/prisma_example?schema=public"
```

3. Generate Prisma client and create the database/migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the sample script:

```bash
npm start
```

Files
- [prisma/schema.prisma](prisma/schema.prisma) — schema with `Student`, `Address`, `Course`.
- [src/index.js](src/index.js) — sample usage.
