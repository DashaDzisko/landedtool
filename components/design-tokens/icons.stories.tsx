import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/atoms/icon";
import {
  ArrowSquareOut,
  Briefcase,
  CaretDown,
  ChatCircle,
  Gear,
  MagnifyingGlass,
  Plus,
  Sparkle,
  SquaresFour,
  Trash,
} from "@phosphor-icons/react";

const icons = [
  { name: "Sparkle", icon: Sparkle, weight: "fill" as const },
  { name: "SquaresFour", icon: SquaresFour },
  { name: "Briefcase", icon: Briefcase },
  { name: "Gear", icon: Gear },
  { name: "MagnifyingGlass", icon: MagnifyingGlass },
  { name: "ChatCircle", icon: ChatCircle },
  { name: "Plus", icon: Plus, weight: "bold" as const },
  { name: "CaretDown", icon: CaretDown },
  { name: "ArrowSquareOut", icon: ArrowSquareOut },
  { name: "Trash", icon: Trash },
];

function IconGallery() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-h1">Phosphor icons</h1>
      <p className="text-small text-muted">
        @phosphor-icons/react — default weight regular, fill for brand sparkle
      </p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {icons.map(({ name, icon, weight }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-md border border-hairline bg-surface-1 p-4"
          >
            <Icon icon={icon} size="md" weight={weight} />
            <span className="text-xs text-muted">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Design Tokens/Icons",
  component: IconGallery,
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
