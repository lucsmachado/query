import * as React from "react";
import styles from "@/styles/Label.module.css";
import { cn } from "@/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn(styles.label, className)} {...props} />;
});
Label.displayName = "Label";

export default Label;
