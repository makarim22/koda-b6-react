# Koda Design Specification

This document provides a technical specification of the Koda brand identity for implementation. Use these tokens and rules to ensure visual consistency across the application.

## 1. Design Principles
- **Editorial Minimalism:** High-contrast layouts with generous whitespace and clear hierarchy.
- **Premium Craftsmanship:** Subtle animations, refined typography, and intentional rounding to evoke a boutique coffee experience.

## 2. Visual Tokens

### Colors (Tailwind CSS)
| Role | Color Value | Tailwind Class |
| :--- | :--- | :--- |
| **Background (Main)** | `#f8fafc` | `bg-slate-50` |
| **Surface (Cards)** | `#ffffff` | `bg-white` |
| **Primary (Accents)** | `#09090b` | `bg-zinc-950` |
| **Secondary (Brand)** | `#fb923c` | `text-orange-400` |
| **Accent (Highlights)** | `#f97316` | `bg-orange-500` |
| **Text (Main)** | `#09090b` | `text-zinc-950` |
| **Text (Muted)** | `#71717a` | `text-zinc-500` |
| **Border (Subtle)** | `#e2e8f0` | `border-slate-200` |

### Typography
- **Primary Font:** `'Outfit', sans-serif`
- **Headings:** `font-extrabold`, `tracking-tighter`, `text-zinc-950`.
- **Subheadings:** `text-xs`, `uppercase`, `tracking-widest`, `font-semibold`.
- **Body:** `leading-relaxed`, `text-zinc-600`.

### Geometry & Elevation
- **Corner Radius:**
  - Containers/Cards: `rounded-3xl` (1.5rem)
  - Inputs/Buttons: `rounded-xl` (0.75rem)
- **Shadows:** `shadow-lg shadow-zinc-900/5` (Soft, diffused depth).
- **Glassmorphism:** `bg-white/70 backdrop-blur-md` for navigation bars.

## 3. Component Standards

### Primary Buttons
- **Style:** `bg-zinc-950 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200`
- **Interactions:** 
  - Hover: `hover:bg-zinc-900 hover:scale-[1.02]`
  - Click: `active:scale-[0.98]`

### Form Inputs
- **Style:** `bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all`
- **Labels:** Small, uppercase, muted text positioned above the input.

### Navigation (Sticky)
- **Blur:** 70% opacity with `backdrop-blur-md`.
- **Active State:** Underlined with `border-b-2 border-orange-400`.

## 4. Animation Guidelines
- **Content Entry:** Use `animate-fade-in-up` (opacity: 0 to 1, translate-y: 20px to 0) with a 0.6s ease-out.
- **Micro-interactions:** 200ms transitions for color and scale changes.
- **Dynamic Elements:** Slow-moving background blobs using `animate-blob` keyframes.

## 5. Global Config (Tailwind)
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      colors: {
        brand: {
          slate: '#f8fafc',
          zinc: '#09090b',
          orange: '#fb923c',
        }
      }
    }
  }
}
```
