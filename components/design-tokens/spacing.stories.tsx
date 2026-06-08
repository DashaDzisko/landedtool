import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/atoms/text";

const tokens = [
  { name: "Page", var: "--space-page", value: "32px", class: "app-page" },
  { name: "Section", var: "--space-section", value: "20px", class: "app-section" },
  { name: "Card", var: "--space-card", value: "20px", class: "p-5" },
  { name: "Block", var: "--space-block", value: "16px", class: "gap-4" },
];

function SpacingScale() {
  return (
    <div className="app-page max-w-2xl">
      <h1 className="text-h1">Spacing tokens</h1>
      <Text variant="muted">
        Unified rhythm — page 32px, section/card 20px, block 16px
      </Text>
      <ul className="flex flex-col gap-4">
        {tokens.map((t) => (
          <li
            key={t.name}
            className="flex items-center justify-between rounded-md border border-hairline bg-surface-1 px-5 py-3"
          >
            <span className="text-small font-medium">{t.name}</span>
            <code className="text-xs text-muted">
              {t.var} · {t.value}
            </code>
          </li>
        ))}
      </ul>
      <div className="app-section">
        <Text variant="eyebrow" as="span">
          app-section demo
        </Text>
        <div className="bento-card p-5">
          <Text variant="small">Card with p-5 (20px) padding</Text>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Spacing",
  component: SpacingScale,
} satisfies Meta<typeof SpacingScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
