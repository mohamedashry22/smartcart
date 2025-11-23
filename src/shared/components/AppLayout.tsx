import type { PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";
import { CartDrawer } from "../../modules/cart/components/CartDrawer";
import { useDisclosure } from "@mantine/hooks";
import { useCart } from "../../modules/cart/hooks/useCart";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { state } = useCart();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <AppHeader totalItems={state.totalItems} onCartOpen={open} />
      <main className="mx-auto w-full max-w-screen-xl px-4 py-6">{children}</main>
      <CartDrawer opened={opened} onClose={close} />
    </div>
  );
};
