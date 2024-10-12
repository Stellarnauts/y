import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt } from "./columns/createdAt";
import { id } from "./columns/id";

export const yeets = sqliteTable("yeets", {
  id: id(),
  message: text("message"),
  createdAt: createdAt(),
});
