
## What it is

GSAP stands for GreenSock Animation Platform. It is a powerful animation library used by professional studios and agencies. If you have seen a website with impressive scroll animations, text reveals, or smooth parallax effects, it probably uses GSAP.

GSAP is more complex than Framer Motion, but it can do more. It is the industry standard for advanced web animations.

> Note: GSAP is not installed in this repo today. Landed ships without it. It is an optional add-on you would install if a feature (for example an animated promo landing page) needs scroll or timeline effects.

## When to use it

Use GSAP when you need:
- Scroll-triggered animations with precise control
- Timeline animations (step 1, then step 2, then step 3 in sequence)
- Text animations (letters appearing one by one)
- Parallax scrolling effects
- Pinning elements while scrolling (an element stays in place while content scrolls)
- Complex animations that CSS and Framer Motion cannot handle

## How to install it

```bash
npm install gsap
```

GSAP also has a plugin called ScrollTrigger for scroll-based animations, plus a React helper:

```bash
npm install gsap @gsap/react
```

Or ask AI: "Install GSAP with ScrollTrigger plugin."

## Key concepts

### Tweens

A tween is a single animation. You tell GSAP what to animate, from what state, to what state, and how long.

```jsx
gsap.to(".box", { x: 200, duration: 1 })
```

This moves the element with class "box" 200px to the right over 1 second.

- `gsap.to()` - animate from current state to a new state
- `gsap.from()` - animate from a state to the current state
- `gsap.fromTo()` - animate from one state to another

### Timelines

A timeline lets you chain animations. One happens after another.

```jsx
const tl = gsap.timeline()
tl.from(".heading", { opacity: 0, y: 30, duration: 0.5 })
  .from(".description", { opacity: 0, y: 20, duration: 0.4 })
  .from(".button", { opacity: 0, scale: 0.9, duration: 0.3 })
```

The heading appears first, then the description, then the button.

### ScrollTrigger

ScrollTrigger connects animations to scroll position. Elements animate when you scroll to them.

```jsx
gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".feature-card",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 0.6,
  stagger: 0.2
})
```

The feature cards fade in and move up when you scroll to them. `stagger: 0.2` makes each card animate 0.2 seconds after the previous one.

### Pinning

Pin an element so it stays on screen while the user scrolls.

```jsx
gsap.to(".hero-image", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    pin: true,
  }
})
```

The hero image stays pinned while the hero section scrolls past.

## How to use GSAP in React/Next.js

GSAP needs a small setup in React. You use `useRef` and `useEffect` (or GSAP's `useGSAP` hook).

Ask AI: "Set up GSAP with ScrollTrigger in my Next.js project. Create a reusable hook I can use on any component."

AI will create the setup for you. You do not need to understand the React details.

## How to ask AI for GSAP animations

"Add a scroll-triggered animation to the promo page feature section. When the user scrolls to it, the heading fades in from the left and the three cards fade in from below with a stagger of 0.2 seconds. Use GSAP ScrollTrigger."

"Create a text reveal animation for the promo hero heading. Each word appears one by one from below. Use GSAP SplitText or split the text into spans."

"Add a parallax effect to the promo hero. The background moves slower than the content when scrolling. Use GSAP ScrollTrigger."

## GSAP vs Framer Motion

| | Framer Motion | GSAP |
|---|---|---|
| Best for | React component animations | Scroll and timeline animations |
| Difficulty | Easier | Harder |
| Scroll animations | Basic | Very powerful |
| Timelines | Limited | Full control |
| Text animations | Manual | Built-in plugins |
| Bundle size | Smaller | Larger |

You can use both in the same project. Framer Motion for component animations (hover, appear). GSAP for scroll effects and complex timelines.

## Tips

- Start with simple scroll animations. Fade in + move up on scroll is enough to make a page feel alive.
- Clean up animations when components unmount. Ask AI to handle this. "Make sure GSAP animations are cleaned up when the component unmounts."
- Use the GSAP docs at gsap.com. They have great visual examples.
- Do not overdo it. A few well-placed scroll animations are better than every element moving on scroll.
