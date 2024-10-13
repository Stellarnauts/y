import { InferSelectModel } from "drizzle-orm";
import {
  foreignKey,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { createdAt } from "./columns/createdAt";
import { id } from "./columns/id";

export const yeets = sqliteTable(
  "yeets",
  {
    id: id(),
    parentId: text("parent_id"),
    hash: text("hash").notNull(),
    message: text("message").notNull(),
    sheeshes: integer("sheeshes").notNull().default(0),
    createdBy: text("created_by").notNull(),
    createdAt: createdAt(),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
      }),
    };
  },
);

export type YeetSelectModel = InferSelectModel<typeof yeets>;
