import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductCard } from "./ProductCard";

const mockAdd = jest.fn();

jest.mock("../../cart/hooks/useCart", () => ({
  useCart: () => ({
    addItem: mockAdd,
    state: { items: { prod1: { quantity: 2 } } },
  }),
}));

const product = {
  id: "prod1",
  sku: "S1",
  title: "Test Product",
  description: "desc",
  price: 10,
  imageUrl: "https://example.com/img.jpg",
  lqipDataUrl: "",
  availableStock: 5,
  categoryId: "c1",
  subcategoryId: "s1",
  tags: ["tag"],
  unit: "ct",
  badge: "sale" as const,
};

describe("ProductCard", () => {
  const renderCard = () =>
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

  it("shows quantity on button", () => {
    renderCard();
    const button = screen.getByRole("button", { name: /Add/ });
    expect(button).toHaveTextContent("2");
  });

  it("calls addItem on click", () => {
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /Add/ }));
    expect(mockAdd).toHaveBeenCalledWith(product);
  });
});
