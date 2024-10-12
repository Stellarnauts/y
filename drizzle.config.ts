import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
});
