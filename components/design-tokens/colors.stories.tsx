import type { Meta, StoryObj } from "@storybook/react";

const swatches = [
  { name: "Canvas", var: "--color-canvas", textClass: "text-foreground" },
  { name: "Surface 1", var: "--color-surface-1", textClass: "text-foreground" },
  { name: "Surface 3", var: "--color-surface-3", textClass: "text-foreground" },
  { name: "Primary pink", var: "--color-primary", textClass: "text-on-primary" },
  { name: "Accent blue", var: "--color-accent-blue", textClass: "text-[var(--color-on-accent-blue)]" },
  { name: "Ink", var: "--color-ink", textClass: "text-canvas" },
  { name: "Ink subtle", var: "--color-ink-subtle", textClass: "text-foreground" },
  { name: "On primary", var: "--color-on-primary", textClass: "text-foreground" },
];

function ColorSwatches() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h1">Color tokens</h1>
      <p className="text-small text-muted">
        Reference palette — #0D0D0D canvas, #F2C1D1 pink, #C5D8E1 blue
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col gap-2">
            <div
              className={`flex h-20 items-end rounded-lg border border-hairline p-3 ${s.textClass}`}
              style={{ background: `var(${s.var})` }}
            >
              <span className="text-small font-medium">{s.name}</span>
            </div>
            <code className="text-xs text-muted">{s.var}</code>
          </div>
        ))}
      </div>
      <h2 className="text-h2">Card variants</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bento-card p-4 text-small">bento-card</div>
        <div className="bento-card-featured p-4 text-small text-on-primary">
          bento-card-featured
        </div>
        <div className="bento-card-accent p-4 text-small text-[var(--color-on-accent-blue)]">
          bento-card-accent
        </div>
      </div>
      <h2 className="text-h2">Status colors</h2>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["saved", "--status-saved-bg", "--status-saved-text"],
            ["applied", "--status-applied-bg", "--status-applied-text"],
            ["screening", "--status-screening-bg", "--status-screening-text"],
            ["interview", "--status-interview-bg", "--status-interview-text"],
            ["offer", "--status-offer-bg", "--status-offer-text"],
            ["rejected", "--status-rejected-bg", "--status-rejected-text"],
            ["withdrawn", "--status-withdrawn-bg", "--status-withdrawn-text"],
          ] as const
        ).map(([name, bg, text]) => (
          <span
            key={name}
            className="rounded-sm px-2 py-0.5 text-xs font-medium capitalize"
            style={{
              background: `var(${bg})`,
              color: `var(${text})`,
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Colors",
  component: ColorSwatches,
} satisfies Meta<typeof ColorSwatches>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
