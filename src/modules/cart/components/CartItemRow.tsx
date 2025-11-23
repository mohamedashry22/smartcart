import { ActionIcon, Group, Image, NumberInput, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { CartItem } from "../../../shared/types/cart";
import { fallbackImage } from "../../catalog/api/foodImagePool";
import { useCart } from "../hooks/useCart";

interface Props {
  item: CartItem;
}

export const CartItemRow = ({ item }: Props) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <Group wrap="nowrap" align="flex-start" gap="sm">
      <Image
        src={item.product.imageUrl}
        alt={item.product.title}
        w={72}
        h={72}
        radius="md"
        fit="cover"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.src = fallbackImage;
        }}
      />
      <Stack gap={4} style={{ flex: 1 }}>
        <Group gap={6} justify="space-between">
          <Text fw={600} size="sm" lineClamp={2}>
            {item.product.title}
          </Text>
          <ActionIcon variant="subtle" color="red" onClick={() => removeItem(item.product.id)} aria-label="Remove">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        <Text size="xs" c="dimmed">
          {item.product.unit} • {item.product.tags.slice(0, 2).join(", ")}
        </Text>
        <Group gap="sm" justify="space-between" align="center">
          <Text fw={600}>${item.product.price.toFixed(2)}</Text>
          <NumberInput
            size="xs"
            w={96}
            min={1}
            max={item.product.availableStock || 99}
            value={item.quantity}
            onChange={(val) => updateQuantity(item.product.id, Number(val || 1))}
          />
        </Group>
        <Group gap={4}>
          <Text size="xs" c="dimmed">
            Line total:
          </Text>
          <Text fw={600} size="sm">
            ${(item.quantity * item.product.price).toFixed(2)}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
};
