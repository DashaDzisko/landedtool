import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";

function TypographyScale() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-h1">Typography</h1>
      <p className="text-small text-muted">
        Strichpunkt Sans · weights 300–700 · Google Fonts
        on display
      </p>
      <div className="flex flex-col gap-6 rounded-lg border border-hairline bg-surface-1 p-8">
        <Heading level="display">Display / 40px / 600</Heading>
        <Heading level="h1">H1 / 28px / 600</Heading>
        <Heading level="h2">H2 / 22px / 500</Heading>
        <Heading level="h3">H3 / 20px / 400</Heading>
        <Text>Body / 16px / 400 — default paragraph style for UI copy.</Text>
        <Text variant="small">Small / 13px / 400 — captions and buttons.</Text>
        <Text variant="muted">Muted / 13px / 400 — secondary hints (#909090).</Text>
        <Text variant="chat">Chat / 12px / 400 — agent panel messages.</Text>
        <Text variant="eyebrow">Eyebrow / 11px / 600 uppercase</Text>
        <p className="text-mono text-muted">Mono / 13px — JetBrains Mono</p>
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Typography",
  component: TypographyScale,
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
