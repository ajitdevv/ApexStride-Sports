import { cva } from "class-variance-authority";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary px-5 py-3 text-primary-foreground shadow-[0_16px_30px_rgba(20,71,230,0.22)] hover:bg-[#0f39b8]",
        secondary: "bg-secondary px-5 py-3 text-secondary-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] hover:bg-[#cfdef9] hover:text-foreground",
        ghost: "border border-transparent bg-transparent px-4 py-2.5 text-foreground hover:border-border hover:bg-white/88 hover:text-primary",
        outline: "border border-border bg-white/94 px-5 py-3 text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] hover:border-primary/35 hover:bg-white hover:text-primary",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return <Link className={classes} href={href} {...props} />;
  }

  const Comp = asChild ? Slot : "button";
  return <Comp className={classes} {...props} />;
}
