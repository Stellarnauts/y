import { config } from "@/config";
import { createClient } from "@libsql/client";
import { drizzle as d } from "drizzle-orm/libsql";
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
