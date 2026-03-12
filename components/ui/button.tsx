import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium leading-none transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[color:var(--foreground)] text-[color:var(--background)] hover:opacity-90",
        variant === "secondary" &&
          "border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] hover:bg-[color:var(--card-strong)]",
        variant === "ghost" &&
          "text-[color:var(--foreground)]/70 hover:bg-[color:var(--card)] hover:text-[color:var(--foreground)]",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
