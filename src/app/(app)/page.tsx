"use client";

import { ErrorAlert } from "@/components/ErrorAlert";
import { Card, CardContent, CardFooter } from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { trpc } from "@/trpc/client";
import { format } from "date-fns/format";
import { toast } from "sonner";
import { YeetForm } from "./YeetForm";

export default function Start() {
  const yeetsQuery = trpc.yeets.list.useQuery();

  const createYeetMutation = trpc.yeets.create.useMutation({
    onSuccess: (yeet) => toast.success(yeet.id),
  });

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <YeetForm onSubmit={(data) => createYeetMutation.mutateAsync(data)} />
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
                <CardFooter>
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
