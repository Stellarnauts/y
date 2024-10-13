import { config } from "@/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  dbCredentials: {
    url: config.turso.connectionUrl,
    authToken: config.turso.authToken,
  },
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
});
