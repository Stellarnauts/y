import { cn } from "@/lib/shadcn/utils";
import { forwardRef, HTMLAttributes } from "react";

export const Spinner = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "size-8 animate-spin rounded-full border-4 border-muted border-t-primary",
      className
    )}
    {...props}
  />
));

Spinner.displayName = "Spinner";
