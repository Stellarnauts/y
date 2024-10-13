import { config } from "@/config";
import { createClient } from "@libsql/client";
import { drizzle as d } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { yeets } from "./schema/yeets";

export const schema = {
  yeets,
};

export const drizzle = d(
  createClient({
    url: config.turso.connectionUrl,
    authToken: config.turso.authToken,
  }),
  {
    schema,
  },
);

migrate(drizzle, { migrationsFolder: "./src/drizzle/migrations" });
