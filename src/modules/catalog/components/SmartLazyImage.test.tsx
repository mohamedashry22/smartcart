import { render, screen, waitFor } from "@testing-library/react";
import { SmartLazyImage } from "./SmartLazyImage";

describe("SmartLazyImage", () => {
  it("replaces LQIP with full image when intersecting", async () => {
    const src = "https://smartcart.com/image.jpg";
    render(<SmartLazyImage src={src} alt="smartcartAlt" lqip="data:image/png;base64,AAA" />);
    const img = screen.getByAltText("smartcartAlt") as HTMLImageElement;

    expect(img.src).toContain("data:image/png;base64");
    await waitFor(() => expect(img.src).toContain(src));
  });
});
