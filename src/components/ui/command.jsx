import * as React from "react";
import * as CommandPrimitive from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils.js";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/* ROOT COMMAND */
const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = "Command";

/* DIALOG */
const CommandDialog = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

/* INPUT */
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

/* LIST */
const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

/* EMPTY */
const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

/* GROUP */
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("p-1 text-foreground", className)}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

/* SEPARATOR */
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

/* ITEM */
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

/* SHORTCUT */
const CommandShortcut = ({ className, ...props }) => (
  <span
    className={cn("ml-auto text-xs text-muted-foreground", className)}
    {...props}
  />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};