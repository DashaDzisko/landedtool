
## The basic idea

You have a design in Figma. You want it in code. There are several ways to get there, from simple to advanced.

## Method 1: Screenshots

The simplest way. Take a screenshot of your design and share it with your AI tool.

"Build this component. Here is a screenshot of the design."

This works, but AI guesses some values. It might get the exact spacing or font size slightly wrong.

**When to use:** Quick prototypes. When you do not need pixel-perfect results.

## Method 2: Screenshots with specs

Take a screenshot and also write down the key values.

"Build this application card component. Here is a screenshot. The card has 20px padding, 12px border radius, Strichpunkt Sans at 15px, and background color #1a1a1a."

This is much better. AI gets the structure from the screenshot and the exact values from your specs.

**When to use:** When you want results closer to your design but do not want to set up MCP.

## Method 3: Figma MCP

Connect Figma directly to your AI tool (see the Figma MCP guide). AI reads the design file itself. Landed already has the Figma MCP connected and a Figma file for the app, so this is the method to reach for here.

"Build this component from my Figma frame: [link]"

This gives the best results because AI reads the exact values from Figma.

**When to use:** When you want the most accurate result and you have MCP set up.

## Exporting assets from Figma

AI cannot create your images, icons, or illustrations from the design file. You need to export these from Figma.

### Icons

Landed already uses `@phosphor-icons/react` for most of its icons, so you often do not need to export at all. For custom marks that are not in that set:

1. Select the icon in Figma.
2. Right panel > Export > SVG.
3. Click Export.
4. Put the SVG file in your project's `/public` folder (the app keeps SEO and marketing images there too).

Use SVG for icons. They scale to any size and stay sharp.

### Images

1. Select the image in Figma.
2. Right panel > Export > PNG at 2x.
3. Click Export.
4. Put the image in your project's `/public` folder.

Export at 2x so images look good on high-resolution screens.

### Tips for exporting

- Name your files clearly. `promo-hero.png` is better than `image-1.png`.
- Use lowercase and dashes. `application-card-icon.svg`, not `ApplicationCardIcon.SVG`.
- Keep all assets in one folder. Do not scatter them around the project.

## Design tokens

Design tokens are the values from your design system: colors, fonts, spacing, border radius. They are the bridge between your design and your code.

You can get tokens from Figma in a few ways:

### Figma variables

If you use Figma variables, your tokens are already organized. Figma MCP can read these directly.

### Plugins

Figma plugins like "Tokens Studio" can export your design tokens as JSON. You can give this file to AI and ask it to wire the values up.

### Where tokens live in Landed

This project uses Tailwind CSS v4, so there is no `tailwind.config.ts`. The tokens live as CSS variables in `app/globals.css`, inside an `@theme inline` block. That means classes like `bg-canvas`, `text-ink`, and `text-primary` map straight to those variables. When you bring a component over from Figma, ask AI to reuse the existing tokens (for example the salmon primary `#f4a988` and the dark surfaces) instead of pasting raw hex values.

## Tips

- Start with the method that feels easy. Screenshots work fine for your first component.
- You can mix methods. Use screenshots for layout and specs for exact values.
- Always check the result in the browser. Figma and the browser render things differently. Small differences are normal. The dev server runs at `http://localhost:3009`.
- When something does not match, tell AI the specific difference. "The padding should be 20px, not 16px."
