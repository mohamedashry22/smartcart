import { MantineProvider as BaseMantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";

export const MantineProvider = ({ children }: PropsWithChildren) => (
  <BaseMantineProvider
    defaultColorScheme="light"
    theme={{
      fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      primaryColor: "green",
      headings: { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif" },
    }}
  >
    {children}
  </BaseMantineProvider>
);
