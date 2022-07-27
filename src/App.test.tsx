import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe('App tests', () => {
  afterEach(cleanup);

  it("should render the product list component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const headerElement = screen.getByText(/Book List/i);
    expect(headerElement).toBeInTheDocument();
  });
})