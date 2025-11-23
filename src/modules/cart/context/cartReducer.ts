import type { CartAction, CartItem, CartState } from "../../../shared/types/cart";

export const initialCartState: CartState = {
  items: {},
  totalItems: 0,
  totalPrice: 0,
};

const computeTotals = (items: Record<string, CartItem>) => {
  const allItems = Object.values(items);
  const totalItems = allItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = allItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  return { totalItems, totalPrice: Number(totalPrice.toFixed(2)) };
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items[action.product.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      const items = {
        ...state.items,
        [action.product.id]: { product: action.product, quantity },
      };
      return { ...state, items, ...computeTotals(items) };
    }
    case "REMOVE_ITEM": {
      const items = { ...state.items };
      delete items[action.productId];
      return { ...state, items, ...computeTotals(items) };
    }
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        const items = { ...state.items };
        delete items[action.productId];
        return { ...state, items, ...computeTotals(items) };
      }
      const existingItem = state.items[action.productId];
      if (!existingItem) return state;
      const items = {
        ...state.items,
        [action.productId]: { ...existingItem, quantity: action.quantity },
      };
      return { ...state, items, ...computeTotals(items) };
    }
    case "RESET":
      return initialCartState;
    default:
      return state;
  }
};
