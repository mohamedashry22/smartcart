import { getProductById as getById, productsById } from "./mockProducts.factory";
import type { Product } from "../../../shared/types/catalog";

export const getProductById = (id: string): Product | null => getById(id);

export const getProductSnapshot = (id: string): Product | undefined => productsById.get(id);
