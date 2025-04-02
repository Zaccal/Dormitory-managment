import * as React from "react";

import { cn } from "@/lib/utils";

type TypeTextareaProps = {
  variant?: "error" | "default";
} & React.ComponentProps<"textarea">;

const Textarea = React.forwardRef<HTMLTextAreaElement, TypeTextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          variant === "error"
            ? "text-red-700 placeholder:text-red-700 border-destructive"
            : "",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
