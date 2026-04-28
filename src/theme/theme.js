/**
 * Global Theme Configuration
 * Centralized theme colors, typography, and styling
 * Change values here to update the entire application
 */

export const THEME = {
  // ============ FONTS ============
  fonts: {
    primary: "Poppins",
    fallback: "ui-sans-serif, system-ui, -apple-system, sans-serif",
  },

  // ============ COLORS - LIGHT MODE ============
  light: {
    // Base colors
    background: "210 20% 98%",
    foreground: "215 25% 17%",

    // Card colors
    card: "0 0% 100%",
    cardForeground: "215 25% 17%",

    // Popover colors
    popover: "0 0% 100%",
    popoverForeground: "215 25% 17%",

    // Primary (MongoDB Green)
    primary: "145 63% 35%",
    primaryForeground: "0 0% 100%",
    primarySoft: "145 50% 94%",

    // Secondary
    secondary: "150 16% 95%",
    secondaryForeground: "150 25% 18%",

    // Muted
    muted: "150 14% 96%",
    mutedForeground: "150 8% 42%",

    // Accent
    accent: "145 63% 42%",
    accentForeground: "0 0% 100%",
    accentSoft: "145 50% 92%",

    // Warning
    warning: "38 92% 50%",
    warningSoft: "38 100% 95%",

    // Destructive
    destructive: "0 72% 51%",
    destructiveForeground: "0 0% 100%",

    // UI Elements
    border: "150 14% 90%",
    input: "150 14% 90%",
    ring: "145 63% 35%",

    // Sidebar
    sidebarBackground: "150 20% 97%",
    sidebarForeground: "215 25% 35%",
    sidebarPrimary: "145 63% 42%",
    sidebarPrimaryForeground: "0 0% 100%",
    sidebarAccent: "150 16% 90%",
    sidebarAccentForeground: "215 25% 20%",
    sidebarBorder: "150 14% 88%",
    sidebarRing: "145 63% 42%",

    // Subsidebar
    subsidarBackground: "150 18% 95%",
    subsidarForeground: "215 25% 30%",
    subsidarMuted: "150 8% 60%",
    subsidarBorder: "150 14% 85%",
  },

  // ============ COLORS - DARK MODE ============
  dark: {
    // Base colors
    background: "200 20% 8%",
    foreground: "150 14% 92%",

    // Card colors
    card: "200 18% 11%",
    cardForeground: "150 14% 92%",

    // Popover colors
    popover: "200 18% 11%",
    popoverForeground: "150 14% 92%",

    // Primary (MongoDB Green)
    primary: "145 63% 45%",
    primaryForeground: "0 0% 100%",
    primarySoft: "145 50% 18%",

    // Secondary
    secondary: "200 16% 15%",
    secondaryForeground: "150 14% 92%",

    // Muted
    muted: "200 16% 15%",
    mutedForeground: "150 8% 62%",

    // Accent
    accent: "145 63% 48%",
    accentForeground: "0 0% 100%",
    accentSoft: "145 50% 16%",

    // Warning
    warning: "38 92% 50%",
    warningSoft: "38 100% 95%",

    // Destructive
    destructive: "0 72% 51%",
    destructiveForeground: "0 0% 100%",

    // UI Elements
    border: "200 14% 18%",
    input: "200 14% 18%",
    ring: "145 63% 45%",

    // Sidebar
    sidebarBackground: "200 24% 7%",
    sidebarForeground: "150 8% 75%",
    sidebarAccent: "200 18% 12%",
    sidebarBorder: "200 18% 14%",
  },

  // ============ SHARED COLORS ============
  shared: {
    // Border radius
    radius: "0.5rem",

    // Gradients
    gradients: {
      primary:
        "linear-gradient(135deg, hsl(145 63% 35%), hsl(145 63% 45%))",
      accent:
        "linear-gradient(135deg, hsl(145 63% 40%), hsl(165 64% 42%))",
      surface:
        "linear-gradient(180deg, hsl(150 20% 99%), hsl(150 20% 97%))",
    },

    // Shadows
    shadows: {
      sm: "0 1px 2px 0 hsl(200 25% 17% / 0.04)",
      md: "0 2px 8px -2px hsl(200 25% 17% / 0.06)",
      lg: "0 8px 24px -10px hsl(200 25% 17% / 0.10)",
      glow: "0 4px 16px -4px hsl(145 63% 35% / 0.25)",
    },

    // Transitions
    transitions: {
      base: "160ms cubic-bezier(0.4, 0, 0.2, 1)",
      smooth: "240ms cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },

  // ============ TYPOGRAPHY ============
  typography: {
    fontFamily: "'Poppins', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
  },
};

// ============ COLOR HELPERS ============
export const getColor = (mode, colorKey) => {
  return mode === "light" ? THEME.light[colorKey] : THEME.dark[colorKey];
};

export const hslToRgb = (hsl) => {
  const [h, s, l] = hsl.split(" ").map((v) => parseFloat(v));
  const c = ((100 - Math.abs(2 * l - 100)) / 100) * (s / 100);
  const hPrime = h / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  let r = 0,
    g = 0,
    b = 0;

  if (hPrime >= 0 && hPrime <= 1) {
    r = c;
    g = x;
  } else if (hPrime > 1 && hPrime <= 2) {
    r = x;
    g = c;
  } else if (hPrime > 2 && hPrime <= 3) {
    g = c;
    b = x;
  } else if (hPrime > 3 && hPrime <= 4) {
    g = x;
    b = c;
  } else if (hPrime > 4 && hPrime <= 5) {
    r = x;
    b = c;
  } else if (hPrime > 5 && hPrime <= 6) {
    r = c;
    b = x;
  }

  const m = (l / 100) - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};
