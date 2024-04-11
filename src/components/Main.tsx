import * as React from "react";
import { cn } from "@/utils";
import styles from "@/styles/Main.module.css";

const Main = React.forwardRef<
  HTMLElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
>(({ className, ...props }, ref) => {
  return <main ref={ref} {...props} className={cn(styles.main, className)} />;
});
Main.displayName = "Main";

export default Main;
