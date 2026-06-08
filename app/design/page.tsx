"use client";

import { DesignSystemShowcase } from "@/components/design-system/showcase";
import { AppProviders } from "@/components/providers/app-providers";

export default function DesignPage() {
  return (
    <AppProviders>
      <DesignSystemShowcase />
    </AppProviders>
  );
}
