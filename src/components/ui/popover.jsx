const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
);

PopoverContent.displayName = "PopoverContent";