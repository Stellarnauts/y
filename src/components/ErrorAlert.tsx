import { LucideTriangleAlert } from "lucide-react";
import { ComponentProps, forwardRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";

interface ErrorAlertProps extends ComponentProps<typeof Alert> {
  message: string;
}

export const ErrorAlert = forwardRef<HTMLDivElement, ErrorAlertProps>(
  ({ message, ...props }, ref) => (
    <Alert ref={ref} variant="destructive" {...props}>
      <LucideTriangleAlert className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
);

ErrorAlert.displayName = "ErrorAlert";
