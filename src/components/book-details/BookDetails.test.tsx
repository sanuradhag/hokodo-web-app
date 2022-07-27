import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AuthorContext } from "../../context/AuthorsProvider";
import { BooksContext } from "../../context/BooksProvider";
import { mockBookList, mockBook } from "../../test/mock-data";
import { Book } from "../../types/book";
import BookDetails from "./BookDetails";

const findBooksBySameAuthor = (
    bookId: string | undefined,
    books: Book[]
  ): { book: Book | undefined; otherBooks: Book[] } => {
    return {
      book: mockBook,
      otherBooks: mockBookList,
    };
  }

const mockBookContext = React.createContext(mockBookList);
const mockAuthorContext = React.createContext({
    findBooksBySameAuthor
});

describe("Book details tests", () => {
  it("should display invalid book message when book can not be found", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({
        bookId: "book-id",
      }),
    }));

    jest.mock("../../context/BooksProvider", () => ({
      __esModule: true,
      default: mockBookContext,
    }));

    render(
      <MemoryRouter>
        <BookDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Invalid book id")).toBeInTheDocument();
  });

  it("should display the book details and book list", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({
        bookId: mockBookList[0].id,
      }),
    }));

    jest.mock("../../context/BooksProvider", () => ({
      __esModule: true,
      default: mockBookContext,
    }));

    jest.mock("../../context/AuthorsProvider", () => ({
      __esModule: true,
      default: mockAuthorContext,
    }));

    render(
      <MemoryRouter>
        <BooksContext.Provider value={mockBookList}>
          <AuthorContext.Provider value={{findBooksBySameAuthor}}>
            <BookDetails />
          </AuthorContext.Provider>
        </BooksContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("book-details")).toBeInTheDocument();
    expect(screen.getByTestId("more-by-author")).toBeInTheDocument();
    expect(screen.getAllByTestId("book-title").length).toBe(mockBookList.length + 1); // more by other plus the book detail card
  });
});
