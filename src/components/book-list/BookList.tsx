import React from "react";

import { BooksContext } from "../../context/BooksProvider";
import { Book } from "../../types/book";
import SingleBook from "../single-book/SingleBook";

const BookList = (): JSX.Element => {
  const books = React.useContext(BooksContext);
  
  return (
    <div className="px-10">

      <div className="font-bold text-5xl text-green-dark text-center pt-10">
        Book List
      </div>

      <div className="flex align-top items-center flex-wrap mt-10 h-[calc(100vh_-_6rem)] overflow-auto" data-testid="book-list-wrapper">
        {books?.map((book: Book) => (
          <SingleBook key={book.id} book={book} />
        ))}

        {books.length === 0 && (
          <div className="text-3xl font-bold text-red text-center m-auto">
            No records to display
          </div>
         )}
      </div>
    </div>
  );
};

export default BookList;
