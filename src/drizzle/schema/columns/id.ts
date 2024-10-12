import { text } from "drizzle-orm/sqlite-core";
import crypto from "node:crypto";

export const id = () =>
  text("id")
    .notNull()
    .primaryKey()
    .$default(() => crypto.randomUUID());
