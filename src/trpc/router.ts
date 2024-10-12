import { schema, y } from "@/drizzle";
import { initTRPC } from "@trpc/server";
import { desc } from "drizzle-orm";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router({
  yeets: t.router({
    list: t.procedure.query(async () => {
      const yeets = await y.query.yeets.findMany({
        orderBy: desc(schema.yeets.createdAt),
      });

      return yeets;
    }),
    create: t.procedure
      .input(
        z.object({
          message: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const [yeet] = await y.insert(schema.yeets).values(input).returning();

        return yeet;
      }),
  }),
});

export type Router = typeof router;
