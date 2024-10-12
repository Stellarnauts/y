import { Database } from "bun:sqlite";
import { drizzle as d } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { yeets } from "./schema/yeets";

export const schema = {
  yeets,
};

export const drizzle = d(new Database("./y.sqlite"), {
  schema,
});

migrate(drizzle, { migrationsFolder: "./src/drizzle/migrations" });
