import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockCatalogData } from "../api/mockProducts.factory";
import type { CatalogData } from "../../../shared/types/catalog";

const fetchCatalog = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockCatalogData;
};

export const useCatalog = () =>
  useQuery<CatalogData>({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
    staleTime: 1000 * 60 * 10,
  });

export const useProducts = () => {
  const { data, ...rest } = useCatalog();
  return {
    data,
    products: data?.products ?? [],
    categories: data?.categories ?? [],
    subcategories: data?.subcategories ?? [],
    ...rest,
  };
};

export const useProductById = (id: string | undefined) => {
  const { data, ...rest } = useCatalog();
  const product = useMemo(() => data?.products.find((item) => item.id === id), [data?.products, id]);
  return { product, ...rest };
};
