
## What is MCP

MCP stands for Model Context Protocol. It is a way to connect external tools to your AI. When you connect Figma through MCP, your AI tool can see your Figma designs directly. It can read layers, colors, fonts, spacing, and component structures.

Without MCP, you have to take screenshots and describe your design. With MCP, AI reads the design file itself.

## This project already uses it

Landed ships with the Figma MCP connected, and there is a Figma design file for the app. That means you can read the real design straight into code. When you point Claude at a frame from the Landed file, it reads the exact colors, fonts, and spacing and writes code that matches the design, instead of you re-describing it.

## Why this matters for designers

You already have your designs in Figma. With Figma MCP, you can say:

"Build this component based on my Figma design."

AI sees the exact design. It reads the colors, sizes, fonts, and layout. It writes code that matches your design closely. You spend less time explaining and fixing.

## How to set it up

Figma has two ways to connect: a remote server (recommended) and a desktop server. The remote server is easier and has the latest features.

### Option A: Remote server (recommended)

This connects to Figma's cloud. You do not need the Figma desktop app.

In Claude Code:

1. Open your terminal and start Claude Code.
2. Type `/mcp` to open the MCP settings.
3. Select `figma` from the list.
4. Select "Authenticate".
5. A browser page opens. Click "Allow Access" to connect your Figma account.
6. Go back to the terminal. You should see "Authentication successful. Connected to figma."
7. Type `/mcp` again to check that the Figma server shows as connected.

That is it. Now you can paste Figma links and Claude reads the design.

### Option B: Desktop server

This runs through the Figma desktop app on your computer. Use this if your company requires it.

1. Open the Figma desktop app.
2. Open a design file.
3. Switch to Dev Mode (the toggle in the toolbar).
4. With nothing selected on the canvas, click to enable the MCP server in the right sidebar.
5. In your terminal, run: `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`
6. Restart Claude Code.
7. Type `/mcp` to check that the Figma server is connected.

### In Cursor

Cursor also supports MCP connections. You add the Figma MCP server in Cursor settings.

Check the Cursor docs for the latest instructions, as this changes often.

## How to use it

Once connected, you can give AI a Figma link and it will read the design.

"Look at this Figma frame and build it as a React component: [paste Figma link]"

AI reads the frame and creates code that matches the design. It gets the colors, spacing, fonts, and layout from the file.

You can also ask it to read specific parts:

"What font size is the heading in this Figma frame?"
"What colors are used in this component?"

## What AI can read from Figma

- Layer names and structure
- Colors (fills, strokes)
- Font family, size, weight, line height
- Padding and spacing
- Border radius
- Component variants
- Auto layout settings

## What AI cannot do well

- Complex gradients and blending modes may not translate perfectly.
- Custom illustrations and icons need to be exported as images separately.
- Animations are not in Figma files. You need to describe those yourself.

## Tips

- Name your Figma layers clearly. If your layers are called "Frame 237" and "Rectangle 14", AI gets confused. Name them "Chat Panel", "Kanban Column", "Application Card".
- Use auto layout in Figma. It maps to flexbox in CSS. AI translates it better.
- Use Figma variables for your design tokens (colors, spacing). AI can read these and use them in code. Landed already has its tokens as CSS variables in `app/globals.css`, so ask AI to reuse those instead of inventing new values.
- Start with one component at a time. Do not ask AI to build an entire page from Figma in one go.
