import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils.js";
import { Label } from "@/components/ui/label";

/* FORM */
const Form = FormProvider;

/* CONTEXTS */
const FormFieldContext = React.createContext(null);
const FormItemContext = React.createContext(null);

/* FORM FIELD */
const FormField = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/* HOOK */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used inside FormField");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const id = itemContext?.id;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    ...fieldState,
  };
};

/* ITEM */
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

/* LABEL */
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-red-500", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/* CONTROL */
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

/* DESCRIPTION */
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

/* MESSAGE */
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();

  const message = error ? String(error.message) : children;

  if (!message) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm text-red-500", className)}
      {...props}
    >
      {message}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

/* EXPORTS */
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};