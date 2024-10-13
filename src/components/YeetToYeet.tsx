import { YeetForm } from "@/app/(app)/YeetForm";
import { YeetSelectModel } from "@/drizzle/schema/yeets";
import { useWhoamiContext } from "@/hooks/useWhoamiContext";
import { y } from "@/lib/contracts/y";
import { account } from "@/lib/passkey/client";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import React from "react";
import { toast } from "sonner";

interface YeetToYeetProps {
  yeet: YeetSelectModel;
  onYeet: () => void;
}

export const YeetToYeet: React.FunctionComponent<YeetToYeetProps> = ({
  yeet,
  onYeet,
}) => {
  const queryClient = useQueryClient();

  const { whoami } = useWhoamiContext();

  const createYeetMutation = trpc.yeets.create.useMutation({
    onSuccess: async () => {
      toast.success("Yeet to the yeet has been yeeted!");

      await queryClient.invalidateQueries({
        queryKey: getQueryKey(trpc.yeets.list),
      });

      onYeet();
    },
  });

  return (
    <YeetForm
      onSubmit={async (data) => {
        if (!whoami) {
          return;
        }

        const id = crypto.randomUUID();

        const wallet = await account.connectWallet({
          keyId: whoami.keyId,
        });

        const tx = await y.reply({
          id,
          parent_id: yeet.id,
          added_validity: 100,
          reply: data.message,
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
  );
};
