import { drizzle, schema } from "@/drizzle";
import { server } from "@/lib/passkey/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { desc } from "drizzle-orm";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router({
  yeets: t.router({
    list: t.procedure.query(async () => {
      const yeets = await drizzle.query.yeets.findMany({
        orderBy: desc(schema.yeets.createdAt),
      });

      return yeets;
    }),
    create: t.procedure
      .input(
        z.object({
          data: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const tx = await server.send(input.data);

        if (tx.status !== "SUCCESS") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Transaction failed.",
          });
        }

        console.log({ tx });

        const [yeet] = await drizzle
          .insert(schema.yeets)
          .values({
            hash: tx.hash,
            message: tx.returnValue,
            createdBy: tx.returnValue,
          })
          .returning();

        return yeet;
      }),
  }),
  signup: t.procedure
    .input(
      z.object({
        data: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const tx = await server.send(input.data);

      console.log(tx);

      return tx;
    }),
});

export type Router = typeof router;
