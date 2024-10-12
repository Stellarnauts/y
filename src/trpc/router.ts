import { drizzle, schema } from "@/drizzle";
import { server } from "@/lib/passkey/server";
import { scValToNative, xdr } from "@stellar/stellar-sdk";
import { initTRPC, TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
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
    get: t.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const yeet = await drizzle.query.yeets.findFirst({
          where: eq(schema.yeets.id, input.id),
        });

        if (!yeet) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Yeet not found.",
          });
        }

        return yeet;
      }),
    create: t.procedure
      .input(
        z.object({
          data: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const tx = await server.send(input.data);

        if (tx.status !== "SUCCESS") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Transaction failed.",
          });
        }

        const { id, message, author } = scValToNative(
          xdr.ScVal.fromXDR(tx.returnValue, "base64"),
        );

        const [yeet] = await drizzle
          .insert(schema.yeets)
          .values({
            id,
            hash: tx.hash,
            message,
            createdBy: author,
          })
          .returning();

        return yeet;
      }),
  }),
  signup: t.procedure
    .input(
      z.object({
        data: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const tx = await server.send(input.data);

      console.log(tx);

      return tx;
    }),
});

export type Router = typeof router;
