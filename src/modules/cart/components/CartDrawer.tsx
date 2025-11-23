import { Button, Divider, Drawer, Group, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { CartItemRow } from "./CartItemRow";
import { useCart } from "../hooks/useCart";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ opened, onClose }: Props) => {
  const { state, clear } = useCart();
  const items = Object.values(state.items);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastTouchRef = useRef<number | null>(null);

  useEffect(() => {
    if (opened) {
      const scrollY = window.scrollY;
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [opened]);

  useEffect(() => {
    const target = scrollRef.current;
    if (!opened || !target) return;

    const isInside = (event: Event) => {
      const path = event.composedPath?.();
      if (path) return path.includes(target);
      return target.contains(event.target as Node);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isInside(event)) return;
      event.preventDefault();
      event.stopPropagation();
      target.scrollTop += event.deltaY;
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchRef.current = isInside(event) ? event.touches[0]?.clientY ?? null : null;
      if (!isInside(event)) event.preventDefault();
    };

    const handleTouchMove = (event: TouchEvent) => {
      const inside = isInside(event);
      if (!inside) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY == null || lastTouchRef.current == null) return;
      event.preventDefault();
      event.stopPropagation();
      target.scrollTop += lastTouchRef.current - currentY;
      lastTouchRef.current = currentY;
    };

    const opts: AddEventListenerOptions = { passive: false, capture: true };
    document.addEventListener("wheel", handleWheel, opts);
    document.addEventListener("touchstart", handleTouchStart, opts);
    document.addEventListener("touchmove", handleTouchMove, opts);

    return () => {
      document.removeEventListener("wheel", handleWheel, opts);
      document.removeEventListener("touchstart", handleTouchStart, opts);
      document.removeEventListener("touchmove", handleTouchMove, opts);
    };
  }, [opened]);

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="md"
      overlayProps={{ blur: 2 }}
      zIndex={3000}
      title={<Text fw={700}>Cart ({state.totalItems})</Text>}
      padding="md"
      transitionProps={{ duration: 200 }}
      lockScroll
      keepMounted
      withinPortal
      classNames={{ body: "flex flex-col h-full" }}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex-1 min-h-0 overflow-y-auto pr-1" ref={scrollRef}>
          <Stack gap="md" pb="lg">
            {items.length === 0 ? (
              <Text c="dimmed" ta="center">
                Your cart is empty
              </Text>
            ) : (
              items.map((item) => <CartItemRow key={item.product.id} item={item} />)
            )}
          </Stack>
        </div>
        <div className="sticky bottom-0 left-0 right-0 bg-white pb-4 pt-2">
          <Divider mb="sm" />
          <Stack gap={8}>
            <Group justify="space-between">
              <Text c="dimmed">Subtotal</Text>
              <Text fw={700}>${state.totalPrice.toFixed(2)}</Text>
            </Group>
            <Group gap="sm">
              <Button variant="light" onClick={clear} fullWidth>
                Clear
              </Button>
              <Button color="green" fullWidth onClick={() => onClose()}>
                Checkout
              </Button>
            </Group>
          </Stack>
        </div>
      </div>
    </Drawer>
  );
};
