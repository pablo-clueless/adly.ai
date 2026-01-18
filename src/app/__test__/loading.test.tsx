import { render, screen } from "@testing-library/react";

import Loading from "../loading";

describe("Loading", () => {
  it("renders loading screen", () => {
    render(<Loading />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
