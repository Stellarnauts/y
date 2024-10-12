"use client";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { useWhoamiContext } from "@/hooks/useWhoamiContext";
import { account } from "@/lib/passkey/client";
import { trpc } from "@/trpc/client";
import { LucideUser } from "lucide-react";
import React from "react";

export const Account: React.FunctionComponent = () => {
  const { whoami, signin, signout } = useWhoamiContext();

  const signupMutation = trpc.signup.useMutation();

  return (
    <div className="flex items-center gap-2">
      {whoami ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full">
              <LucideUser className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {whoami.contractId.substring(0, 16)}...
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signout()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button
            onClick={async () => {
              const wallet = await account.connectWallet();

              signin({
                keyId: wallet.keyId_base64,
                contractId: wallet.contractId,
              });
            }}
          >
            Sign in
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              const username = prompt("Please enter a username:");

              if (!username) {
                return;
              }

              const wallet = await account.createWallet("y", username);

              console.log({
                keyId: wallet.keyId_base64,
                contractId: wallet.contractId,
              });

              const tx = await signupMutation.mutateAsync({
                data: wallet.built.toXDR(),
              });

              console.log({ tx });

              signin({
                keyId: wallet.keyId_base64,
                contractId: wallet.contractId,
              });
            }}
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};
