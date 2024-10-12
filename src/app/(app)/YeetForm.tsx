"use client";

import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  message: z.string(),
});

interface YeetFormProps {
  onSubmit: SubmitHandler<z.infer<typeof schema>>;
}

export const YeetForm: React.FunctionComponent<YeetFormProps> = ({
  onSubmit,
}) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yeet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Yeet what?"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell the world about the latest yeets.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Yeet!
        </Button>
      </form>
    </Form>
  );
};
