"use client";

import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useWhoamiContext } from "@/hooks/useWhoamiContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  parentId: z.optional(z.string()),
  message: z.string(),
});

interface YeetFormProps {
  onSubmit: SubmitHandler<z.infer<typeof schema>>;
}

export const YeetForm: React.FunctionComponent<YeetFormProps> = ({
  onSubmit,
}) => {
  const { whoami } = useWhoamiContext();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
    },
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Yeet what?"
                  disabled={!whoami || isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>Share a yeet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={!whoami || isSubmitting || !isValid}>
            Yeet!
          </Button>
          {!whoami && <p>Please sign in to yeet.</p>}
        </div>
      </form>
    </Form>
  );
};
