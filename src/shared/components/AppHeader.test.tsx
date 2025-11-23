import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppHeader } from "./AppHeader";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AppHeader", () => {
  it("renders cart count", () => {
    render(
      <MemoryRouter>
        <AppHeader totalItems={5} onCartOpen={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    expect(screen.getByText("smartcart")).toBeInTheDocument();
  });
});
