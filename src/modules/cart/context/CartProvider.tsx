import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { PropsWithChildren } from "react";
import type { Product } from "../../../shared/types/catalog";
import type { CartState } from "../../../shared/types/cart";
import { cartReducer, initialCartState } from "./cartReducer";
import type { CartContextValue } from "./types";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "smartcart:cart";
const loadState = (): CartState => {
  if (typeof window === "undefined") return initialCartState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;
    const parsed = JSON.parse(raw) as CartState;
    return parsed ?? initialCartState;
  } catch {
    return initialCartState;
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = useCallback((product: Product) => dispatch({ type: "ADD_ITEM", product }), []);
  const removeItem = useCallback((productId: string) => dispatch({ type: "REMOVE_ITEM", productId }), []);
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  );
  const clear = useCallback(() => dispatch({ type: "RESET" }), []);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [state, addItem, removeItem, updateQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
