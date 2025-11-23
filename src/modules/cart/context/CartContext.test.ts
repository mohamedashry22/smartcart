import { cartReducer } from "./cartReducer";
import type { CartState } from "../../../shared/types/cart";
import type { Product } from "../../../shared/types/catalog";

const initialState: CartState = { items: {}, totalItems: 0, totalPrice: 0 };

const product: Product = {
  id: "p1",
  sku: "SKU123",
  title: "Test Product",
  description: "Test",
  price: 5,
  imageUrl: "https://example.com/image.jpg",
  lqipDataUrl: "",
  availableStock: 10,
  categoryId: "produce",
  subcategoryId: "leafy",
  tags: [],
  unit: "ct",
};

describe("cartReducer", () => {
  it("adds a product and updates totals", () => {
    const next = cartReducer(initialState, { type: "ADD_ITEM", product });
    expect(next.totalItems).toBe(1);
    expect(next.totalPrice).toBe(5);
  });

  it("updates quantity", () => {
    const state = cartReducer(initialState, { type: "ADD_ITEM", product });
    const next = cartReducer(state, { type: "UPDATE_QUANTITY", productId: product.id, quantity: 3 });
    expect(next.items[product.id].quantity).toBe(3);
    expect(next.totalItems).toBe(3);
    expect(next.totalPrice).toBe(15);
  });

  it("removes when quantity goes to zero", () => {
    const state = cartReducer(initialState, { type: "ADD_ITEM", product });
    const next = cartReducer(state, { type: "UPDATE_QUANTITY", productId: product.id, quantity: 0 });
    expect(next.items[product.id]).toBeUndefined();
    expect(next.totalItems).toBe(0);
  });
});
