import { cva } from "class-variance-authority";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary px-4 py-2.5 text-primary-foreground shadow-[0_16px_30px_rgba(20,71,230,0.22)] hover:bg-[#0f39b8] sm:px-5 sm:py-3",
        secondary: "bg-secondary px-4 py-2.5 text-secondary-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] hover:bg-[#cfdef9] hover:text-foreground sm:px-5 sm:py-3",
        ghost: "border border-transparent bg-transparent px-3.5 py-2 text-foreground hover:border-border hover:bg-white/88 hover:text-primary sm:px-4 sm:py-2.5",
        outline: "border border-border bg-white/94 px-4 py-2.5 text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] hover:border-primary/35 hover:bg-white hover:text-primary sm:px-5 sm:py-3",
      },
      size: {
        default: "h-10 sm:h-11",
        sm: "h-9 px-3.5 text-xs sm:px-4",
        lg: "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base",
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
