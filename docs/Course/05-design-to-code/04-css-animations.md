
## Why start with CSS

CSS can handle most simple animations without any extra library. Hover effects, fade-ins, smooth transitions, loading spinners. No packages to install. No extra code. It just works.

Use CSS animations first. Only reach for a library when CSS cannot do what you need.

## Transitions

A transition makes a change happen smoothly instead of instantly. You add it to an element, and when a property changes (like color or size), it animates.

```css
.button {
  background-color: #f4a988;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #ef9d78;
}
```

The button color changes smoothly over 0.2 seconds when you hover. Those two values are the project's salmon primary and its hover shade.

### In Tailwind

Tailwind v4 has transition classes built in, and Landed exposes its tokens as utility classes (so `bg-primary` maps to the salmon variable in `app/globals.css`):

```html
<button class="bg-primary hover:bg-primary-hover transition-colors duration-200">
  Click me
</button>
```

Common Tailwind transition classes:
- `transition-all` - animate everything that changes
- `transition-colors` - animate color changes
- `transition-opacity` - animate fade in/out
- `transition-transform` - animate movement, scale, rotation
- `duration-200` - 200 milliseconds
- `duration-300` - 300 milliseconds
- `ease-in-out` - smooth start and end

## Fade in on page load

Make elements appear smoothly when the page loads.

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
```

The element fades in and moves up slightly. This is a subtle effect that makes pages feel polished. It works well for chat messages arriving or a new application card appearing on the canvas.

## Hover effects designers use most

### Scale on hover

```html
<div class="hover:scale-105 transition-transform duration-200">
  Application card
</div>
```

The card grows slightly when you hover. Good for cards and clickable items.

### Shadow on hover

```html
<div class="shadow-sm hover:shadow-lg transition-shadow duration-200">
  Application card
</div>
```

The shadow gets bigger on hover. Makes elements feel interactive. On the dark canvas (`#0d0d0d`), a lighter surface like `#242424` often reads better than a heavy shadow, so try lifting the background too.

### Underline slide in

Good for navigation links. The underline slides in from the left on hover instead of appearing instantly.

Ask AI: "Add an underline slide-in animation on hover for the nav links. The underline should slide in from the left using a pseudo-element, in the salmon primary color."

## Loading spinner

A simple spinner for loading states:

```html
<div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
```

Tailwind's `animate-spin` rotates the element forever. Perfect for loading buttons and page loaders. The chat panel also uses a typing indicator while the agent replies, which is the same idea done with keyframes.

## How to ask AI for CSS animations

Be specific about what moves, how fast, and when.

**Bad:** "Add some animations."

**Good:** "Add a hover effect to the application cards. When you hover, the card moves up 4px and the background lifts to the #242424 surface. Use a 200ms transition."

**Good:** "When a new chat message appears, fade it in from below. It should take 0.3 seconds."

## When CSS is not enough

CSS cannot do these things well:
- Scroll-triggered animations (elements animate as you scroll down)
- Complex timelines (step 1, then step 2, then step 3)
- Physics-based animations (spring, bounce with realistic motion)
- Animating between page transitions

For these, use Framer Motion or GSAP. See the next guides.

## Tips

- Keep animations subtle. Small movements (4-8px) and short durations (200-300ms) feel professional. Big movements feel distracting.
- Use `ease-in-out` for most animations. It starts and ends smoothly.
- Do not animate too many things at once. One or two animated elements per view is enough.
- Test animations on slower devices. What feels smooth on your laptop might feel laggy on a phone.
