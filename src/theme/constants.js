/**
 * Theme Constants - Quick Access
 * Use these for consistent styling across the app
 */

import { THEME } from "./theme";

// ============ COLORS (Light Mode) ============
export const COLORS_LIGHT = {
  bg: `hsl(${THEME.light.background})`,
  text: `hsl(${THEME.light.foreground})`,
  card: `hsl(${THEME.light.card})`,
  primary: `hsl(${THEME.light.primary})`,
  primarySoft: `hsl(${THEME.light.primarySoft})`,
  accent: `hsl(${THEME.light.accent})`,
  accentSoft: `hsl(${THEME.light.accentSoft})`,
  warning: `hsl(${THEME.light.warning})`,
  destructive: `hsl(${THEME.light.destructive})`,
  border: `hsl(${THEME.light.border})`,
  muted: `hsl(${THEME.light.muted})`,
  sidebar: `hsl(${THEME.light.sidebarBackground})`,
};

// ============ COLORS (Dark Mode) ============
export const COLORS_DARK = {
  bg: `hsl(${THEME.dark.background})`,
  text: `hsl(${THEME.dark.foreground})`,
  card: `hsl(${THEME.dark.card})`,
  primary: `hsl(${THEME.dark.primary})`,
  primarySoft: `hsl(${THEME.dark.primarySoft})`,
  accent: `hsl(${THEME.dark.accent})`,
  accentSoft: `hsl(${THEME.dark.accentSoft})`,
  warning: `hsl(${THEME.dark.warning})`,
  destructive: `hsl(${THEME.dark.destructive})`,
  border: `hsl(${THEME.dark.border})`,
  muted: `hsl(${THEME.dark.muted})`,
  sidebar: `hsl(${THEME.dark.sidebarBackground})`,
};

// ============ FONTS ============
export const FONTS = {
  primary: THEME.fonts.primary,
  body: THEME.typography.fontFamily,
};

// ============ GRADIENTS ============
export const GRADIENTS = {
  primary: THEME.shared.gradients.primary,
  accent: THEME.shared.gradients.accent,
  surface: THEME.shared.gradients.surface,
};

// ============ SHADOWS ============
export const SHADOWS = {
  sm: THEME.shared.shadows.sm,
  md: THEME.shared.shadows.md,
  lg: THEME.shared.shadows.lg,
  glow: THEME.shared.shadows.glow,
};

// ============ TRANSITIONS ============
export const TRANSITIONS = {
  base: THEME.shared.transitions.base,
  smooth: THEME.shared.transitions.smooth,
};

// ============ TAILWIND UTILITIES ============
export const TAILWIND_STYLES = {
  // Text
  textPrimary: "text-foreground",
  textMuted: "text-muted-foreground",
  textSecondary: "text-secondary-foreground",

  // Background
  bgPrimary: "bg-primary",
  bgCard: "bg-card",
  bgMuted: "bg-muted",

  // Borders
  borderBase: "border border-border",
  borderPrimary: "border-2 border-primary",

  // Shadows
  shadowSm: "shadow-sm",
  shadowMd: "shadow-md",
  shadowLg: "shadow-lg",

  // Components
  button: "px-4 py-2 rounded-md font-medium transition-colors",
  input: "px-3 py-2 rounded-md border border-input bg-background",
  card: "rounded-lg border border-border bg-card p-4",
};
