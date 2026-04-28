import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils.js";

/* ROOT */
const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
);

NavigationMenu.displayName = "NavigationMenu";

/* LIST */
const NavigationMenuList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(
        "flex flex-1 list-none items-center justify-center space-x-1",
        className
      )}
      {...props}
    />
  )
);

NavigationMenuList.displayName = "NavigationMenuList";

/* ITEM */
const NavigationMenuItem = NavigationMenuPrimitive.Item;

/* STYLE */
const navigationMenuTriggerStyle = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent"
);

/* TRIGGER */
const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDown className="ml-1 h-3 w-3 transition group-data-[state=open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  )
);

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/* CONTENT */
const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "absolute left-0 top-0 w-full md:w-auto",
        className
      )}
      {...props}
    />
  )
);

NavigationMenuContent.displayName = "NavigationMenuContent";

/* LINK */
const NavigationMenuLink = NavigationMenuPrimitive.Link;

/* VIEWPORT */
const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
);

NavigationMenuViewport.displayName = "NavigationMenuViewport";

/* INDICATOR */
const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full flex h-1.5 items-end justify-center",
        className
      )}
      {...props}
    >
      <div className="h-2 w-2 rotate-45 bg-border" />
    </NavigationMenuPrimitive.Indicator>
  )
);

NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};