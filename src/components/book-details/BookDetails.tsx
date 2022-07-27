/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthorContext } from "../../context/AuthorsProvider";
import { BooksContext } from "../../context/BooksProvider";
import { Book } from "../../types/book";
import SingleBook from "../single-book/SingleBook";

const BookDetails = (): JSX.Element => {
  let { bookId } = useParams();
  let navigate = useNavigate();

  const books = React.useContext(BooksContext);
  const authorContext = React.useContext(AuthorContext);
  const { findBooksBySameAuthor } = authorContext;
  const {book, otherBooks} = findBooksBySameAuthor(bookId, books)

  return (
    <div className="py-5 px-10 bg-bg">
      <div className="w-full flex justify-end mb-10">
        <button
          className="rounded-lg bg-green-dark text-bg font-semibold p-2"
          onClick={() => navigate("../")}
        >
          Go back
        </button>
      </div>

      {!book && <div className="text-3xl h-screen font-bold text-red text-center m-auto flex justify-center items-center">Invalid book id</div>}

      {book && (
        <div className="">
          <div className="font-bold text-4xl text-green-dark text-center mb-10" data-testid="book-details">
            {book.title}(ISBN-{book.isbn}) - {book?.author}
          </div>
          <div className="flex">
            <SingleBook hideDetailsLabel book={book} />
            <img src={book?.cover} alt="cover" className="ml-10 w-80 h-96"/>
          </div>
        </div>
      )}

      {otherBooks?.length > 1 && (
        <div className="">
          <div className="font-semibold text-xl text-green-dark mt-10 mb-5" data-testid="more-by-author">
            More by {book?.author}
          </div>
          <div className="flex flex-wrap">
            {otherBooks
              .filter((book: Book) => book.id !== bookId)
              .map((book: Book) => (
                <SingleBook key={book.id} book={book} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
