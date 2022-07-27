/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";

import { api } from "../api";
import { BASE_URL } from "../constants";
import { Book, BookListResponse } from "../types/book";

const books: Book[] =[];

export const BooksContext = React.createContext(books);

const BooksProvider = React.memo((props: BooksProviderProps):JSX.Element => {
    const [bookList, setBookList] = useState<Book[]>(books);
    const { children } = props;

    const getBookList = useCallback(async () => {
        try {
          const response = await api.get<BookListResponse>(`${BASE_URL}/data.json`);
          setTimeout(() => {
            setBookList(response?.books);
          });
        } catch (e) {
          console.log("An error occurred while fetching the book list", e);
        }
      }, []);
    
      useEffect(() => {
        getBookList()
    
        return () => {
          setBookList([]);
        };
      }, []);
      
    return (
      <BooksContext.Provider value={bookList}>
        {children}
      </BooksContext.Provider>
    );
})

interface BooksProviderProps {
  children: React.ReactNode
}

export default BooksProvider;