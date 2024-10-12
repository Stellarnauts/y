import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { yeets } from "./schema/yeets";

export const schema = {
  yeets,
};

export const y = drizzle(new Database("./y.sqlite"), {
  schema,
});

migrate(y, { migrationsFolder: "./src/drizzle/migrations" });
