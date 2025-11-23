import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { VirtualProductList } from "./VirtualProductList";

jest.mock("../../cart/hooks/useCart", () => ({
  useCart: () => ({
    addItem: jest.fn(),
    state: { items: {}, totalItems: 0 },
  }),
}));

const makeProduct = (id: string) => ({
  id,
  sku: id,
  title: `Product ${id}`,
  description: "desc",
  price: 10,
  imageUrl: "https://example.com/img.jpg",
  lqipDataUrl: "",
  availableStock: 5,
  categoryId: "c1",
  subcategoryId: "s1",
  tags: [],
  unit: "ct",
});

describe("VirtualProductList", () => {
  it("renders and loads more", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 600 });
    const products = Array.from({ length: 5 }, (_, i) => makeProduct(`p${i}`));
    render(
      <MemoryRouter>
        <VirtualProductList products={products} initialVisible={2} onVisibleChange={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText("Product p0")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Load more/ }));
    expect(screen.getByText("Loading more products…")).toBeInTheDocument();
  });
});
