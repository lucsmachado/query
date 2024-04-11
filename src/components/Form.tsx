/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import styles from "@/styles/Form.module.css";
import { cn } from "@/utils";

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => {
  return <form ref={ref} className={cn(styles.form, className)} {...props} />;
});
Form.displayName = "Form";

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(styles.field, className)} {...props} />;
});
FormField.displayName = "FormField";

export default {
  Root: Form,
  Field: FormField,
};
