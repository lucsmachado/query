import * as React from "react";
import styles from "@/styles/Button.module.css";
import { cn } from "@/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(styles.primaryButton, className)}
      type="button"
      {...props}
    />
  );
});
Button.displayName = "Button";

export default Button;
