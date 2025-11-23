import type { CartAction, CartItem, CartState } from "../../../shared/types/cart";
import type { Product } from "../../../shared/types/catalog";

export interface CartContextValue {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export type { CartState, CartAction, CartItem };
