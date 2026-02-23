# Full UI Refresh Implementation Plan

This plan outlines a comprehensive visual overhaul of the ReDBox portal to align with modern, premium Software-as-a-Service (SaaS) design principles and remedy the current fragmented UI, as directed by the `design-taste-frontend` skill.

## Proposed Changes

### 1. Global Variables & Theming ([assets/styles/default-variables.scss](file:///Users/andrewbrazzatti/source/github/redbox-portal-2/assets/styles/default-variables.scss))
- **Typography**: Replace `Titillium Web` and `Roboto Condensed` with `Outfit` (or a similar high-end sans-serif like `Geist`/`Satoshi`) to remove the generic/dated feel. Apply a clean sans-serif stack.
- **Color Palette (The "Lila Ban" & Neutral bases)**:
  - Background defaults to `#f9fafb` (Off-white/light gray) instead of pure white/harsh contrasts.
  - Remove the jarring `#b1101a` (Bright Red) and `#500005` (Dark Burgundy) blocks in the header/nav.
  - Implement a Deep Slate / Zinc base for the primary navigation and headers to provide a premium neutral framing.
  - Select one refined accent color (e.g., a subdued Deep Rose or Cardinal) for primary actions to maintain the "ReDBox" identity without blinding saturation.
- **Borders & Shadows**: Introduce very subtle border colors (`#e2e8f0` equivalent) and disable heavy, dark borders on inputs/cards.

### 2. Base Styling & Micro-interactions ([assets/styles/default-theme.scss](file:///Users/andrewbrazzatti/source/github/redbox-portal-2/assets/styles/default-theme.scss))
- **Cards & Containers (Bento Paradigm)**:
  - Strip solid-color headers from cards.
  - Apply pure white (`#ffffff`) backgrounds to all major layout container cards.
  - Apply a large, elegant border radius (e.g., `2.5rem` for large sections/modals, `1rem` for smaller cards) and a soft diffusion shadow (`box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05)`).
- **Interactive UI States**:
  - Add fluid CSS transitions (`transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`) to all interactable elements (buttons, links, cards).
  - Add tactile feedback (`transform: scale(0.98)` or `translateY(1px)`) to `:active` states for buttons to simulate physical pushes.
  - Remove default generic blue/red hover states and replace them with slightly darkened/lightened variants of the base colors.
- **Spacing & Density (Level 4-7 Daily App Mode)**:
  - Standardize paddings (e.g., `padding: 2rem` inside cards).
  - Clean up table styles: remove high-contrast zebra striping in favor of clean, 1px bottom-borders.

### 3. Layout Restructuring ([views/default/default/layout.ejs](file:///Users/andrewbrazzatti/source/github/redbox-portal-2/views/default/default/layout.ejs) & partials)
- **Header & Navigation**:
  - Unify the top utility bar ("Welcome Local Admin") and the main navigation into a cohesive top-level experience.
  - Remove forced `text-transform: uppercase` on main menu links to improve modern readability.

## Verification Plan

### Automated Tests
- We will run `npm run test:mocha` and `npm run test:angular` to ensure our class changes or template changes did not break any underlying test selectors.

### Manual Verification
- **Visual Inspection**: We will use the `browser_subagent` to log into the Dev server (`http://localhost:1500/default/rdmp/login`) and visually verify the new styling on the Dashboard, Login page, and Record Editor.
- **Action Checks**: Verify hover states and active button micro-interactions function correctly.
