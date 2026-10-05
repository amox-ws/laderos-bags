import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-normal ring-offset-background transition-[background-color,color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-brand",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent text-ink shadow-[inset_0_0_0_1px_hsl(var(--ink)/0.2)] hover:shadow-[inset_0_0_0_1px_hsl(var(--ink))]",
        secondary:
          "bg-paper-deep text-ink hover:bg-ink hover:text-paper",
        ghost: "hover:bg-ink/5 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-ink text-paper hover:bg-brand",
        heroOutline: "bg-transparent text-paper shadow-[inset_0_0_0_1px_hsl(var(--paper)/0.35)] hover:bg-paper hover:text-ink",
        brand: "bg-brand text-white hover:bg-ink",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-7",
        xl: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
