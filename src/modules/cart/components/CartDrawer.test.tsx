import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { CartDrawer } from "./CartDrawer";

jest.mock("../hooks/useCart", () => ({
  useCart: () => ({
    state: { items: {}, totalItems: 0, totalPrice: 0 },
    clear: jest.fn(),
  }),
}));

describe("CartDrawer", () => {
  it("shows empty cart message", () => {
    render(
      <MantineProvider>
        <CartDrawer opened onClose={jest.fn()} />
      </MantineProvider>
    );
    expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
  });
});
