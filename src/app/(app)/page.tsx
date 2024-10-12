"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { Card, CardContent, CardFooter } from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { y } from "@/lib/contracts/y";
import { account } from "@/lib/passkey/client";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { format } from "date-fns/format";
import { toast } from "sonner";
import { YeetForm } from "./YeetForm";

export default function Start() {
  const queryClient = useQueryClient();

  const yeetsQuery = trpc.yeets.list.useQuery();

  const createYeetMutation = trpc.yeets.create.useMutation({
    onSuccess: async (yeet) => {
      toast.success("Yeet has been yeeted!");

      await queryClient.invalidateQueries({
        queryKey: getQueryKey(trpc.yeets.list),
      });
    },
  });

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <YeetForm
            onSubmit={async (data) => {
              const id = crypto.randomUUID();
              const c = JSON.parse(localStorage.getItem("y")!);

              const wallet = await account.connectWallet({
                keyId: c.keyId,
              });

              const tx = await y.yeet({
                id,
                initial_validity: 100,
                message: data.message,
                user: wallet.contractId,
              });

              const signed = await account.sign(tx.toXDR(), {
                keyId: wallet.keyId,
              });

              const yeet = await createYeetMutation.mutateAsync({
                data: signed.built!.toXDR(),
              });

              console.log({ yeet });
            }}
          />
          {createYeetMutation.isError && (
            <ErrorAlert message={createYeetMutation.error.message} />
          )}
        </div>
        <div className="space-y-2">
          {yeetsQuery.isPending ? (
            <>
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </>
          ) : yeetsQuery.isError ? (
            <ErrorAlert message={yeetsQuery.error.message} />
          ) : (
            yeetsQuery.data.map((yeet) => (
              <Card key={yeet.id}>
                <CardContent className="pt-6">
                  <p>{yeet.message}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    {yeet.createdBy}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(yeet.createdAt), "yyyy-MM-dd HH:mm:ss")}
                  </p>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
