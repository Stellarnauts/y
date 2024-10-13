"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Yeet } from "@/components/Yeet";
import { useWhoamiContext } from "@/hooks/useWhoamiContext";
import { y } from "@/lib/contracts/y";
import { account } from "@/lib/passkey/client";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { toast } from "sonner";
import { YeetForm } from "./YeetForm";

export default function Start() {
  const queryClient = useQueryClient();

  const { whoami } = useWhoamiContext();

  const yeetsQuery = trpc.yeets.list.useQuery();

  const createYeetMutation = trpc.yeets.create.useMutation({
    onSuccess: async () => {
      toast.success("Yeet has been yeeted!");

      await queryClient.invalidateQueries({
        queryKey: getQueryKey(trpc.yeets.list),
      });
    },
  });

  return (
    <>
      <div className="space-y-8">
        <div className="my-4 space-y-4">
          <YeetForm
            onSubmit={async (data) => {
              if (!whoami) {
                return;
              }

              const id = crypto.randomUUID();

              const wallet = await account.connectWallet({
                keyId: whoami.keyId,
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

              await createYeetMutation.mutateAsync({
                data: signed.built!.toXDR(),
              });
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
            yeetsQuery.data.map((yeet) => <Yeet key={yeet.id} yeet={yeet} />)
          )}
        </div>
      </div>
    </>
  );
}
