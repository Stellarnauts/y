import { YeetForm } from "@/app/(app)/YeetForm";
import type { YeetSelectModel } from "@/drizzle/schema/yeets";
import { y } from "@/lib/contracts/y";
import { scValToNative } from "@stellar/stellar-sdk";
import { useQuery } from "@tanstack/react-query";
import { Yeet as ContractYeet } from "bindings";
import { format } from "date-fns/format";
import { AnimatePresence, motion } from "framer-motion";
import { LucideCheck, LucideReply, LucideShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { ErrorAlert } from "./ErrorAlert";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";
import { Button } from "./shadcn/button";
import { Card, CardContent, CardFooter } from "./shadcn/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./shadcn/dialog";
import { Input } from "./shadcn/input";
import { Label } from "./shadcn/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/tooltip";
import { Spinner } from "./Spinner";

interface YeetProps {
  yeet: YeetSelectModel;
}

export const Yeet: React.FunctionComponent<YeetProps> = ({ yeet }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const yeetQuery = useQuery<ContractYeet>({
    queryKey: ["yeet", yeet.id],
    queryFn: async () => {
      const tx = await y.get_yeet({ id: yeet.id });

      return scValToNative(tx.simulationData.result.retval);
    },
    enabled: isVerifyDialogOpen,
  });

  return (
    <>
      <Card>
        <CardContent className="flex gap-4 pt-6">
          <div className="flex-1">
            <p>{yeet.message}</p>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="size-8 rounded-full p-2"
                    onClick={() => setIsReplying((isReplying) => !isReplying)}
                  >
                    <LucideReply className="size-full" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reply</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="size-8 rounded-full p-2"
                    onClick={() =>
                      setIsVerifyDialogOpen(
                        (isVerifyDialogOpen) => !isVerifyDialogOpen,
                      )
                    }
                  >
                    <LucideShieldCheck className="size-full" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verify</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch overflow-hidden">
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">{yeet.createdBy}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(yeet.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </p>
          </div>
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className=""
              >
                <div className="pt-4">
                  <YeetForm onSubmit={() => void 0} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
      <Dialog
        open={isVerifyDialogOpen}
        onOpenChange={(open) => setIsVerifyDialogOpen(open)}
      >
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Verify yeet</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <Label htmlFor="hash">Hash</Label>
              <Input id="hash" value={yeet.hash} readOnly />
            </div>
            <div className="mt-6">
              {yeetQuery.isPending ? (
                <Spinner className="m-auto" />
              ) : yeetQuery.isError ? (
                <ErrorAlert message={yeetQuery.error.message} />
              ) : (
                <Alert>
                  <LucideCheck className="size-4" />
                  <AlertTitle>Verified</AlertTitle>
                  <AlertDescription>
                    Message and author verification successful!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
