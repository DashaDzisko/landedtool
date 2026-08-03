
## What is responsive design

Responsive design means your app looks good on all screen sizes. Desktop, tablet, and phone. The layout changes to fit the screen.

You already know this from Figma. You design different versions for different screens. In code, you do the same thing with breakpoints.

## Breakpoints

A breakpoint is a screen width where the layout changes. Tailwind CSS has these breakpoints built in:

- **sm** - 640px (large phones)
- **md** - 768px (tablets)
- **lg** - 1024px (small laptops)
- **xl** - 1280px (desktops)
- **2xl** - 1536px (large screens)

In Tailwind, you write mobile styles first, then add changes for larger screens:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

This means:
- On mobile: 1 column
- On tablets (md): 2 columns
- On desktop (lg): 3 columns

## How to tell AI about responsive design

Be specific about what changes at each size.

**Bad:** "Make it responsive."

**Good:** "On mobile, stack the chat panel above the Kanban canvas. On desktop, put them side by side, chat on the left and canvas on the right."

**Good:** "On mobile, the Kanban board shows one status column at a time with a swipe. On desktop, show all columns in a row."

## What is fluid typography

Fluid typography means your text size changes smoothly as the screen gets bigger or smaller. Instead of jumping from 16px on mobile to 32px on desktop, the size flows between those values.

This makes your text look good on every screen, not just the breakpoints you defined.

## How fluid typography works

You use the CSS `clamp()` function. It takes three values:

```css
font-size: clamp(minimum, preferred, maximum);
```

Example:
```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

This means:
- Never smaller than 1rem (16px)
- Preferred size is 2.5vw (2.5% of the screen width)
- Never bigger than 2rem (32px)

The text smoothly scales between 16px and 32px depending on the screen size.

## Common fluid typography values

Here are values that work well for most projects:

```css
/* Body text */
font-size: clamp(1rem, 1vw + 0.75rem, 1.125rem);

/* H3 */
font-size: clamp(1.25rem, 1.5vw + 0.75rem, 1.5rem);

/* H2 */
font-size: clamp(1.5rem, 2vw + 1rem, 2rem);

/* H1 */
font-size: clamp(2rem, 3vw + 1rem, 3rem);

/* Display / Hero heading */
font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
```

## Where the type scale lives in Landed

This project keeps its type scale as CSS variables in `app/globals.css` (display 2.25rem, h1 1.625rem, h2 1.25rem, body 0.9375rem, and so on). If you want a heading to scale fluidly, edit the variable in that file and wrap the value in `clamp()`. That way every place that uses the token updates at once, and you keep one source of truth.

## How to ask AI to add fluid typography

"Add fluid typography to the project. Use CSS clamp() for the heading and body variables in app/globals.css. H1 should be between 26px and 40px. Body text between 15px and 17px."

Or for a specific element:

"Make the promo hero heading fluid. It should scale between 40px and 72px using clamp()."

## Tips

- Always design mobile first. Start with the smallest screen and add styles for bigger screens.
- Test on real screen sizes. Use the browser dev tools (F12, then click the phone icon) to check different widths.
- Fluid typography removes the need for many typography breakpoints. One clamp() value often replaces three or four media queries.
- Do not make body text too small on mobile. 16px is a safe minimum for good readability.
- Check your line lengths. On big screens, text lines should not be wider than about 700px. Use max-width on your text containers.
