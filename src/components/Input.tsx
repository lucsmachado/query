import * as React from "react";
import { cn } from "@/utils";
import styles from "@/styles/Input.module.css";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: "default" | "ghost";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(styles.input, styles[variant], className)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
