import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const createdAt = () =>
  text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`);
