
## What it is

Framer Motion is an animation library for React. It makes animations easier to build than with plain CSS. You wrap your elements in special components and describe how they should animate.

If you have used Figma's prototyping animations, Framer Motion feels familiar. You set a start state, an end state, and the library handles the movement between them.

> Note: Framer Motion is not installed in this repo today. Landed ships without it. It is an optional add-on you would install if a feature needs animations that CSS cannot handle.

## When to use it

Use Framer Motion when you need:
- Elements that animate when they appear on screen
- Page transitions (smooth change between pages)
- Drag interactions
- Spring and bounce physics
- Animations that depend on scroll position
- Animated layouts (items that move when a list changes)

For simple hover effects and transitions, CSS is enough. Framer Motion is for the next level.

## How to install it

```bash
npm install framer-motion
```

Or ask AI: "Install framer-motion."

## Basic examples

### Fade in when element appears

```jsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  This content fades in and moves up.
</motion.div>
```

`initial` is the start state. `animate` is the end state. `transition` controls the speed.

### Animate when scrolled into view

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  This appears when you scroll to it.
</motion.div>
```

`whileInView` triggers the animation when the element becomes visible. `viewport={{ once: true }}` means it only animates once, not every time you scroll past it.

### Hover animation

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Click me
</motion.button>
```

The button grows on hover and shrinks when you click. The spring physics make it feel alive.

### Stagger children

When you have a list of items and want them to appear one after another (for example the application cards inside a Kanban column):

```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {applications.map((app) => (
    <motion.div
      key={app.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {app.role}
    </motion.div>
  ))}
</motion.div>
```

Each item appears 0.1 seconds after the previous one.

## How to ask AI to add Framer Motion

"Add a fade-in animation to the application cards. Use Framer Motion. The cards should fade in and move up when they appear. Stagger them 0.1 seconds apart."

"Add a page transition between the board view and the detail view. When switching, the old view fades out and the new one fades in. Use Framer Motion AnimatePresence."

"Make a new chat message animate in. It should slide up from 20px below with a spring animation. Use Framer Motion."

## Tips

- Use `once: true` on scroll animations. Without it, elements re-animate every time you scroll past them. That gets annoying.
- Spring animations feel more natural than linear ones. Use `type: "spring"` for interactive elements like buttons and cards.
- Do not animate everything. Pick 2 or 3 elements per view. Too many animations are distracting.
- Framer Motion adds to your bundle size. If you only need simple hover effects, stick with CSS.
- Test on mobile. Some animations that feel smooth on desktop can be slow on phones.
