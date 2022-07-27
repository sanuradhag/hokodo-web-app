import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockBook } from "../../test/mock-data";
import SingleBook from "./SingleBook";

describe("Single book tests", () => {
  afterEach(cleanup);

  it("should display the book title", () => {
    render(<SingleBook book={mockBook} />);

    const titleElement = screen.getByTestId("book-title");

    expect(titleElement.textContent).toBe(mockBook.title);
  });

  it("should display the book author", () => {
    render(<SingleBook book={mockBook} />);

    const authorElement = screen.getByTestId("book-author");

    expect(authorElement.textContent).toBe(mockBook.author);
  });

  it("should display more info button on hover", async () => {
    render(
      <MemoryRouter>
        <SingleBook book={mockBook} />
      </MemoryRouter>
    );

    const bookWrapperElement = screen.getByTestId("book-wrapper-element");

    fireEvent.mouseOver(bookWrapperElement);

    await waitFor(() => screen.findByTestId("see-more-details"));

    expect(screen.getByTestId("see-more-details").textContent).toBe(
      "See more details"
    );
  });

  it("should hide more info button on mouse leave", async () => {
    render(
      <MemoryRouter>
        <SingleBook book={mockBook} />
      </MemoryRouter>
    );

    const bookWrapperElement = screen.getByTestId("book-wrapper-element");

    fireEvent.mouseOver(bookWrapperElement);

    await waitFor(() => screen.findByTestId("see-more-details"));

    expect(screen.getByTestId("see-more-details").textContent).toBe(
      "See more details"
    );

    fireEvent.mouseOut(bookWrapperElement);

    expect(screen.queryByText("See more details")).toBe(null);
  });

  it("should not display more info button on hover when hideDetailsLabel is true", async () => {
    render(
      <MemoryRouter>
        <SingleBook book={mockBook} hideDetailsLabel/>
      </MemoryRouter>
    );

    const bookWrapperElement = screen.getByTestId("book-wrapper-element");

    fireEvent.mouseOver(bookWrapperElement);

    expect(screen.queryByText("See more details")).toBe(null);
  });
});
