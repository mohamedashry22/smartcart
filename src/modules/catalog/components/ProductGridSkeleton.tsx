import { Skeleton, SimpleGrid } from "@mantine/core";

export const ProductGridSkeleton = () => (
  <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
    {Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton height={180} radius="md" />
        <Skeleton height={12} radius="sm" />
        <Skeleton height={12} width="60%" radius="sm" />
        <Skeleton height={28} width="40%" radius="md" />
      </div>
    ))}
  </SimpleGrid>
);
