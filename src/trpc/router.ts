import { drizzle, schema } from "@/drizzle";
import { YeetSelectModel } from "@/drizzle/schema/yeets";
import { server } from "@/lib/passkey/server";
import { scValToNative, xdr } from "@stellar/stellar-sdk";
import { initTRPC, TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

const t = initTRPC.create();

type NestedYeet = YeetSelectModel & { yeets: NestedYeet[] };

export const router = t.router({
  yeets: t.router({
    list: t.procedure.query(async () => {
      const yeets = await drizzle.query.yeets.findMany({
        orderBy: desc(schema.yeets.createdAt),
      });

      const nest = (
        items: YeetSelectModel[],
        id: string | null = null,
      ): NestedYeet[] =>
        items
          .filter((item) => item.parentId === id)
          .map((yeet) => ({ ...yeet, yeets: nest(items, yeet.id) }));

      return nest(yeets);
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

        const { id, parent_id, message, author } = scValToNative(
          xdr.ScVal.fromXDR(tx.returnValue, "base64"),
        );

        const [yeet] = await drizzle
          .insert(schema.yeets)
          .values({
            id,
            parentId: parent_id.length ? parent_id : null,
            hash: tx.hash,
            message,
            createdBy: author,
          })
          .returning();

        return yeet;
      }),
    sheeshes: t.router({
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

          const { id, likes } = scValToNative(
            xdr.ScVal.fromXDR(tx.returnValue, "base64"),
          );

          const [yeet] = await drizzle
            .update(schema.yeets)
            .set({
              sheeshes: likes,
            })
            .where(eq(schema.yeets.id, id))
            .returning();

          return yeet;
        }),
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

      return tx;
    }),
});

export type Router = typeof router;
