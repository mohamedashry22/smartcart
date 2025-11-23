import type { Product } from "./catalog";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalItems: number;
  totalPrice: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "RESET" };
