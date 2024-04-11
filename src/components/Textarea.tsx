import * as React from "react";
import styles from "@/styles/Textarea.module.css";
import { cn } from "@/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: "default" | "ghost";
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(styles.textarea, styles[variant], className)}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
