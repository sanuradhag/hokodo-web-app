import React, { useState } from "react";

import { Book } from "../types/book";

const authors = new Map<string, Book[]>();

export const AuthorContext = React.createContext({
  authors,
  setAuthors: (author: string, bookList: Book[]) => {},
});

const AuthorsProvider = (props: AuthorsProviderProps): JSX.Element => {
  const { children } = props;
  const [authorsMap, setAuthorsMap] = useState(authors);

  return (
    <AuthorContext.Provider
      value={{
        authors: authorsMap,
        setAuthors: (author: string, bookList: Book[]) => {
          const newMap = authorsMap.set(author, bookList);
          setAuthorsMap(newMap);
        },
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
