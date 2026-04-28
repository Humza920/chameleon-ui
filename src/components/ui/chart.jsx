import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils.js";

/* THEMES */
const THEMES = { light: "", dark: ".dark" };

/* CONTEXT */
const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/* CHART CONTAINER */
const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

/* STYLE GENERATOR */
const ChartStyle = ({ id, config }) => {
  if (!config) return null;

  const entries = Object.entries(config || {});

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${entries
  .map(([key, item]) => {
    const color = item?.color;
    return color ? `--color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`,
      }}
    />
  );
};

/* TOOLTIP */
const ChartTooltip = RechartsPrimitive.Tooltip;

/* TOOLTIP CONTENT */
const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
    },
    ref
  ) => {
    if (!active || !payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "min-w-[8rem] rounded-lg border bg-background p-2 text-xs shadow-xl",
          className
        )}
      >
        {payload.map((item, i) => (
          <div key={i} className="flex justify-between gap-2">
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

/* LEGEND */
const ChartLegend = RechartsPrimitive.Legend;

/* LEGEND CONTENT */
const ChartLegendContent = React.forwardRef(
  ({ className, payload = [] }, ref) => {
    if (!payload.length) return null;

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4", className)}
      >
        {payload.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};