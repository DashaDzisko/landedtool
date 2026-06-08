import type { Preview } from "@storybook/react";
import React from "react";
import { AppProviders } from "./decorators";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
    backgrounds: {
      default: "canvas",
      values: [{ name: "canvas", value: "#0d0d0d" }],
    },
  },
  decorators: [
    (Story) => (
      <AppProviders>
        <div className="min-h-screen bg-canvas-mesh font-sans text-foreground">
          <Story />
        </div>
      </AppProviders>
    ),
  ],
};

export default preview;
