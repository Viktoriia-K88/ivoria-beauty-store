import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-text-primary text-white hover:bg-text-primary/85",
        outline:
          "border border-border bg-transparent text-text-primary hover:bg-text-primary hover:text-white",
        ghost: "bg-transparent text-text-primary hover:bg-black/5",
      },
      size: {
        default: "min-h-11 px-5 text-[10px] uppercase tracking-[0.12em]",
        sm: "min-h-9 px-4 text-[10px] uppercase tracking-[0.1em]",
        lg: "min-h-12 px-6 text-[11px] uppercase tracking-[0.12em]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
