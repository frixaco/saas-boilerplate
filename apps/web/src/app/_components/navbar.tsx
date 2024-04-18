"use client";

import { Button } from "@/components/ui/button";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import { usePostHog } from "posthog-js/react";

export default function Navbar() {
  const posthog = usePostHog();

  return (
    <nav>
      <TailwindIndicator />
      <Button
        onClick={() => {
          posthog.capture("my event", { property: "value" });
        }}
      >
        PostHog test
      </Button>
    </nav>
  );
}
