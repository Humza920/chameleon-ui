import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils.js";

/* ROOT INPUT */
const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);
InputOTP.displayName = "InputOTP";

/* GROUP */
const InputOTPGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

/* SLOT */
const InputOTPSlot = React.forwardRef(
  ({ index, className, ...props }, ref) => {
    const ctx = React.useContext(OTPInputContext);

    const slot = ctx?.slots?.[index] || {};
    const { char, hasFakeCaret, isActive } = slot;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border border-input text-sm transition-all first:rounded-l-md last:rounded-r-md",
          isActive && "ring-2 ring-ring",
          className
        )}
        {...props}
      >
        {char}

        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-pulse bg-foreground" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

/* SEPARATOR */
const InputOTPSeparator = React.forwardRef((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };