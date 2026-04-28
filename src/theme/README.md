# 🎨 Theme Configuration Guide

## Overview
Yeh centralized theme system hai. Ek file se change karo, poora app update hota hai!

## Files

### 1. `theme.ts`
**Main theme configuration with all colors, fonts, gradients**
- Light mode colors
- Dark mode colors
- Shared styles (gradients, shadows, transitions)
- Typography settings

### 2. `constants.ts`
**Pre-converted color values for easy use**
- Ready-to-use color constants
- Tailwind utility combinations
- Fonts, gradients, shadows

### 3. `index.ts`
**Exports everything - use this for imports**

## Usage Examples

### Import Colors
```typescript
import { COLORS_LIGHT, COLORS_DARK } from "@/theme";

// Light mode
const bgColor = COLORS_LIGHT.bg;
const textColor = COLORS_LIGHT.text;
const primaryColor = COLORS_LIGHT.primary;

// Dark mode
const darkBg = COLORS_DARK.bg;
```

### Import Fonts
```typescript
import { FONTS } from "@/theme";

const fontFamily = FONTS.body; // Poppins with fallbacks
```

### Import Gradients
```typescript
import { GRADIENTS } from "@/theme";

<div style={{ background: GRADIENTS.primary }} />
```

### Import Shadows
```typescript
import { SHADOWS } from "@/theme";

<div style={{ boxShadow: SHADOWS.glow }} />
```

### Get Theme Values
```typescript
import { THEME } from "@/theme";

// Light mode colors
THEME.light.primary // "145 63% 35%"
THEME.light.primarySoft // "145 50% 94%"

// Dark mode colors
THEME.dark.background // "200 20% 8%"
THEME.dark.foreground // "150 14% 92%"
```

## How to Update Global Theme

### Change Primary Color
Go to `theme.ts` → Find `light.primary` and `dark.primary` → Update HSL value

Example:
```typescript
// Before
primary: "145 63% 35%", // Green

// After
primary: "210 100% 50%", // Blue (everywhere!)
```

### Change Font
Go to `theme.ts` → Update `fonts.primary`

```typescript
fonts: {
  primary: "Inter", // Changed from Poppins
  fallback: "...",
}
```

### Change Shadows
Go to `theme.ts` → Update `shared.shadows`

```typescript
shadows: {
  glow: "0 4px 16px -4px hsl(210 100% 50% / 0.25)", // New color
}
```

## CSS Variables (Auto-synced)

Your `index.css` uses CSS variables that match this theme:
- `--primary`, `--primary-soft`
- `--accent`, `--accent-soft`
- `--muted`, `--border`
- `--sidebar-*`
- etc.

Tailwind automatically reads these from CSS, so when you update theme colors, CSS gets them too!

## Professional Standards ✅

- ✅ Centralized configuration
- ✅ No duplicate values
- ✅ Easy to maintain
- ✅ Type-safe (TypeScript)
- ✅ HSL format (best for theming)
- ✅ Light & dark modes built-in
- ✅ Accessible defaults
