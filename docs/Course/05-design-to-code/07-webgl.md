
## What it is

WebGL lets you show 3D graphics in the browser. Interactive 3D objects, particle effects, animated backgrounds, and immersive visual experiences. If you have seen a website with a rotating 3D product, floating particles, or an interactive globe, that is WebGL.

WebGL itself is very complex. But libraries like Three.js and React Three Fiber make it much easier.

> Note: Three.js and React Three Fiber are not installed in this repo today. Landed ships without them. They are optional add-ons you would install if a page (for example the promo landing page) actually needs a 3D effect.

## When to use it

Use WebGL when you want:
- 3D objects on your website (product viewers, 3D models)
- Interactive particle effects
- Animated 3D backgrounds
- Data visualizations in 3D
- Immersive experiences and creative portfolios

Do not use WebGL for regular app screens. It is heavy. It slows down pages and uses a lot of battery. Use it only when the 3D effect is the main feature, not decoration. The core Landed shell (chat + Kanban) does not need it.

## The libraries

### Three.js

The most popular WebGL library. It handles the complex 3D math for you. You create scenes, add objects, set up lights, and move a camera.

```bash
npm install three
```

### React Three Fiber

A React wrapper for Three.js. Since Landed uses React (Next.js 16), this is the best way to add 3D. You write 3D scenes using React components.

```bash
npm install @react-three/fiber @react-three/drei
```

`@react-three/drei` is a helper library with ready-made components like cameras, lights, text, and loaders.

## A simple example

A spinning 3D box:

```jsx
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function SpinningBox() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#f4a988" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <SpinningBox />
      <OrbitControls />
    </Canvas>
  )
}
```

The box uses the project's salmon primary. You do not need to write this yourself. Ask AI:

"Add a 3D spinning box to the promo hero using React Three Fiber. The box should rotate slowly and the user can drag to rotate it. Use the salmon primary color."

## Loading 3D models

You can use 3D models made in Blender or downloaded from the web. Common formats are `.glb` and `.gltf`.

Ask AI: "Load a 3D model from /public/models/scene.glb and show it in a canvas. The user can rotate it with their mouse."

Good places to find free 3D models:
- Sketchfab (sketchfab.com)
- Poly Pizza (poly.pizza)
- Three.js examples

## Common effects

### Floating particles

"Add a particle background to the promo hero. 200 small salmon dots floating slowly in 3D space over the dark canvas. Use React Three Fiber."

### Animated gradient background

"Create an animated gradient blob background using WebGL shaders. Smooth, slow movement. Colors: salmon and light blue on a dark background."

### Product viewer

"Build a 3D viewer. Load the model from /public/models/product.glb. The user can rotate and zoom with their mouse. Add soft lighting."

## Performance

WebGL is heavy. Follow these rules:

- **Keep it simple.** A few objects is fine. Hundreds of detailed objects will make the page slow.
- **Use lazy loading.** Do not load 3D content until the user scrolls to it.
- **Add a fallback.** Some old phones and browsers do not support WebGL. Show a static image instead.
- **Test on mobile.** 3D is much slower on phones. Reduce quality or hide 3D on small screens.

Ask AI: "Add a check for WebGL support. If the browser does not support it, show a static image instead of the 3D scene."

## Tips

- Start with React Three Fiber, not plain Three.js. It fits better with React projects.
- Use `@react-three/drei` for ready-made helpers. Cameras, controls, text, loading bars. It saves a lot of work.
- Do not add WebGL to every page. Use it on one key page, like the promo hero.
- 3D is hard to debug. If something does not show, check the camera position and lighting first. Often the object is there but the camera is pointing somewhere else.
- AI is good at writing basic Three.js code. But for very complex scenes, you might need to learn some basics or reference the Three.js docs.
