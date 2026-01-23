import * as dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load .env explicitly for Windows
dotenv.config({ path: __dirname + "/.env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
