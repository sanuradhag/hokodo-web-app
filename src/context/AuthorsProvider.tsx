import React, { useState } from "react";

import { Book } from "../types/book";

const authors = new Map<string, Book[]>();

export const AuthorContext = React.createContext({
  findBooksBySameAuthor: (
    bookId: string | undefined,
    books: Book[]
  ): { book: Book | undefined; otherBooks: Book[] } => {
    return {
      book: undefined,
      otherBooks: [],
    };
  },
});

const AuthorsProvider = (props: AuthorsProviderProps): JSX.Element => {
  const { children } = props;
  const [authorsMap, setAuthorsMap] = useState(authors);

  const findBooksBySameAuthor = (bookId: string | undefined,books: Book[]): { book: Book | undefined; otherBooks: Book[] } => {
    let otherBooks: Book[] = [];
    let currentBook: Book | undefined = undefined;

    const currentBookFromList = books.find((book: Book) => book.id === bookId);

    if (currentBookFromList) {
      currentBook = currentBookFromList;
      const booksBySameAuthor = authors?.get(currentBookFromList.author); // check in the cache
      if (booksBySameAuthor) {
        otherBooks = booksBySameAuthor;
      } else {
        const newList: Book[] = books.filter(
          (book: Book) => book.author === currentBookFromList.author
        );
        const newMap = authorsMap.set(currentBookFromList.author, newList);
        setAuthorsMap(newMap); // add the author and author's book to cache
      }
    }

    return {book: currentBook,otherBooks};
  };

  return (
    <AuthorContext.Provider
      value={{
        findBooksBySameAuthor,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};

interface AuthorsProviderProps {
  children: React.ReactNode;
}

export default AuthorsProvider;
