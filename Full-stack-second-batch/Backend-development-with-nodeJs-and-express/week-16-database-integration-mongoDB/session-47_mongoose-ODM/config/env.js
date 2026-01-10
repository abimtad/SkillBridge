import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Needed to make __dirname work in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file manually
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000
};
