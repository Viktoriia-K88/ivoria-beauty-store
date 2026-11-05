import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-12 w-full min-w-0 border border-border bg-surface px-4 text-[13px] text-text-primary outline-none transition-colors placeholder:text-text-secondary/55 focus:border-text-primary focus-visible:ring-1 focus-visible:ring-text-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
