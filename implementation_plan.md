# GhostRight Rebranding & Formatting Plan

## Goal Description
Execute a complete rebranding to "GhostRight" with a LinkedIn-inspired "Corporate Blue" aesthetic. Fix AI output formatting issues using a robust sanitization layer.

## User Review Required
> [!IMPORTANT]
> - New color palette will replace the existing "Obsidian & Emerald" look.
> - A new file `src/utils/sanitizeOutput.js` will be created.

## Proposed Changes

### UI Logic & Sanitization
#### [NEW] [sanitizeOutput.js](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/utils/sanitizeOutput.js)
- Implement aggressive regex replacements:
    - Strip `**` (bold).
    - Strip `_` and `*` (italics).
    - Parse literal `\n`.
    - Trim whitespace.
- This will replace the usage of the old `sanitizer.js` logic.

#### [MODIFY] [App.jsx](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/App.jsx)
- Import `sanitizeOutput` from `utils/sanitizeOutput.js`.
- Apply sanitization to the API response before setting state.
- Replace `mist-bg` div with new `ShaderBackground` component.

### Styling & Assets (Priority 2 & 3)
#### [MODIFY] [tailwind.config.js](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/tailwind.config.js)
- Update colors to LinkedIn-inspired palette:
    - Primary: `#0a66c2`
    - Background: `#1b1f23`
    - Surfaces: `#242a30`
    - Text: `#e2e8f0`

#### [NEW] [ShaderBackground.jsx](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/components/ShaderBackground.jsx)
- Create a component for the detailed animated radial gradient background.

#### [NEW] [GhostSymbol.jsx](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/components/GhostSymbol.jsx)
- SVG component for the logo (fountain pen nib / ghost).

#### [NEW] [GhostWordmark.jsx](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/components/GhostWordmark.jsx)
- SVG component for the text "GhostRight".

#### [MODIFY] [Header.jsx](file://wsl.localhost/Ubuntu/home/nyx/ghost/ui/src/components/Header.jsx)
- Integrate `GhostSymbol` and `GhostWordmark`.
- Remove old text logo.

## Verification Plan

### Automated Tests
- None available in the project.

### Manual Verification
1.  **Build & Run**:
    - Run `npm run dev` in `ui` directory.
    - Open the localhost URL in browser.
2.  **Visual Inspection**:
    - Verify the "GhostRight" logo in the header.
    - Verify the background is a "slow-moving gradient mesh" (Deep Blue/Cool Gray).
    - Verify the color scheme matches the LinkedIn palette.
3.  **Functional Testing**:
    - Input sample data and click "Generate".
    - Inspect the output in the `ChromiumDisplay` area.
    - **Pass Condition**: Output text has NO `**`, `_`, or `*` characters. Newlines are rendered correctly. No surrounding quotes.
