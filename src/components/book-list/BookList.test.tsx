import React from "react";

import { render, screen } from "@testing-library/react";

import { BooksContext } from "../../context/BooksProvider";
import BookList from "./BookList";
import { mockBookList } from "../../test/mock-data";

const mockBookContext = React.createContext(mockBookList);

describe("Book list tests", () => {
  it("should display title", () => {
    render(<BookList />);

    expect(screen.getByText("Book List")).toBeInTheDocument();
  });

  it("should display no records message when book list empty", () => {
    render(<BookList />);

    expect(screen.getByText("No records to display")).toBeInTheDocument();
  });

  it("should display the list of books when context has books", () => {
    jest.mock("../../context/BooksProvider", () => ({
        __esModule: true,
        default: mockBookContext
    }));
    
    render(
      <BooksContext.Provider value={mockBookList}>
        <BookList />
      </BooksContext.Provider>
    );

    const bookTitleElements = screen.getAllByTestId("book-title");

    expect(bookTitleElements.length).toBe(mockBookList.length);
  });
});
