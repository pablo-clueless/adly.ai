import { render, screen } from "@testing-library/react";

import Page from "../page";

jest.mock("@/components/shared", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
  Footer: () => <div data-testid="footer">Footer</div>,
  TagHeader: () => <div data-testid="tag-header">TagHeader</div>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: () => <button data-testid="button">Button</button>,
}));

jest.mock("next/link", () => ({
  Link: () => <a data-testid="lin">Button</a>,
}));

jest.mock("@/components/ui/accordion", () => ({
  Accordion: () => <div data-testid="accordion">Accordion</div>,
  AccordionContent: () => <div data-testid="accordion-content">AccordionContent</div>,
  AccordionItem: () => <div data-testid="accordion-item">AccordionItem</div>,
  AccordionTrigger: () => <div data-testid="accordion-trigger">AccordionTrigger</div>,
}));

describe("Page", () => {
  it("renders main sections", () => {
    render(<Page />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("accordion")).toBeInTheDocument();
  });

  it("how it works", () => {
    render(<Page />);

    expect(screen.getByText("Connect Your Accounts")).toBeInTheDocument();
    expect(screen.getByText("Set Your Goals")).toBeInTheDocument();
    expect(screen.getByText("AI Takes Over")).toBeInTheDocument();
    expect(screen.getByText("Watch Performance Grow")).toBeInTheDocument();
  });

  it("benefits", () => {
    render(<Page />);

    expect(screen.getByText("Save Time & Resources")).toBeInTheDocument();
    expect(screen.getByText("Increase ROAS")).toBeInTheDocument();
    expect(screen.getByText("Scale Effortlessly")).toBeInTheDocument();
    expect(screen.getByText("Data-Driven Decisions")).toBeInTheDocument();
  });

  it("features", () => {
    render(<Page />);

    expect(screen.getByText("Google Ads integration")).toBeInTheDocument();
    expect(screen.getByText("Automated Ad Management")).toBeInTheDocument();
    expect(screen.getByText("Competitor Analysis")).toBeInTheDocument();
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Market Insight")).toBeInTheDocument();
    expect(screen.getByText("Business Intelligence and Data Aggregation")).toBeInTheDocument();
  });
});
