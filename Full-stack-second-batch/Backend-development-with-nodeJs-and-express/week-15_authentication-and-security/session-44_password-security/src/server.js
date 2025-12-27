import express from 'express';
import { router as authRouter } from './routes/auth.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { initDb } from './lib/db.js';

const app = express();
app.use(express.json());

await initDb();

app.use('/api/auth', authRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`JWT mini project running on http://localhost:${port}`);
});
