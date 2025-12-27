import dotenv from "dotenv";

dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: requireEnv("NODE_ENV"),
  port: Number(requireEnv("PORT")),
  databaseUrl: requireEnv("DATABASE_URL"),
  jwtSecret: requireEnv("JWT_SECRET"),
  baseUrl: requireEnv("BASE_URL"),
  authEmail: requireEnv("BASE_URL"),
  baseUrl: requireEnv("BASE_URL")
};
