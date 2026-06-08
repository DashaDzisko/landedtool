import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/atoms/text";

function CardVariants() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h1">Card variants</h1>
      <p className="text-small text-muted">
        Depth via color layering — minimal shadows
      </p>
      <div className="grid w-full grid-cols-3 gap-5 max-sm:grid-cols-1">
        <div className="bento-card flex flex-col gap-2 p-6">
          <Text variant="eyebrow" as="span">
            Default
          </Text>
          <Text variant="small">bento-card · #1A1A1A</Text>
        </div>
        <div className="bento-card-featured flex flex-col gap-2 p-6">
          <Text variant="eyebrow" as="span" className="text-on-primary/70">
            Featured
          </Text>
          <Text variant="small" className="text-on-primary">
            bento-card-featured · #F2C1D1
          </Text>
        </div>
        <div className="bento-card-accent flex flex-col gap-2 p-6">
          <Text
            variant="eyebrow"
            as="span"
            className="text-[var(--color-on-accent-blue)]/70"
          >
            Accent
          </Text>
          <Text variant="small" className="text-[var(--color-on-accent-blue)]">
            bento-card-accent · #C5D8E1
          </Text>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Cards",
  component: CardVariants,
} satisfies Meta<typeof CardVariants>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {};
