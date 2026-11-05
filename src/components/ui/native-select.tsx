import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-11 w-full min-w-0 appearance-none rounded-none border border-border bg-background py-1 pl-3 pr-9 text-[13px] outline-none transition-colors focus-visible:border-text-primary focus-visible:ring-1 focus-visible:ring-text-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent sm:h-12 sm:pl-4 data-[size=sm]:h-9 data-[size=sm]:border-0 data-[size=sm]:bg-transparent data-[size=sm]:pl-0 data-[size=sm]:pr-7 data-[size=sm]:text-[10px] sm:data-[size=sm]:text-[11px] data-[size=sm]:font-medium data-[size=sm]:uppercase data-[size=sm]:tracking-[0.1em]"
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
