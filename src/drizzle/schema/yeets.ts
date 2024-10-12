import { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt } from "./columns/createdAt";
import { id } from "./columns/id";

export const yeets = sqliteTable("yeets", {
  id: id(),
  hash: text("hash").notNull(),
  message: text("message").notNull(),
  createdBy: text("created_by").notNull(),
  createdAt: createdAt(),
});

export type YeetSelectModel = InferSelectModel<typeof yeets>;
