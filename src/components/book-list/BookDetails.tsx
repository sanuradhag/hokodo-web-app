/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthorContext } from "../../context/AuthorsProvider";
import { BooksContext } from "../../context/BooksProvider";
import { Book } from "../../types/book";
import SingleBook from "./SingleBook";

const BookDetails = (): JSX.Element => {
  const authorContext = React.useContext(AuthorContext);
  const { authors, setAuthors } = authorContext;
  const books = React.useContext(BooksContext);
  const [booksByAuthor, setBookByAuthor] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book>();

  let { bookId } = useParams();
  let navigate = useNavigate();

  const findBooksBySameAuthor = useCallback((): void => {
    const currentBookFromList = books.find((book: Book) => book.id === bookId);
    if (currentBookFromList) {
      setCurrentBook(currentBookFromList);
      const booksBySameAuthor = authors?.get(currentBookFromList.author);
      if (booksBySameAuthor) {
        setBookByAuthor(booksBySameAuthor);
      } else {
        const newList: Book[] = books.filter(
          (book: Book) => book.author === currentBookFromList.author
        );
        setAuthors(currentBookFromList.author, newList);
      }
    }
  }, [books, authors]);

  useEffect(() => {
    findBooksBySameAuthor();
  }, [authors, books]);

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

      {currentBook && (
        <div className="">
          <div className="font-bold text-4xl text-green-dark text-center mb-10">
            {currentBook.title}(ISBN-{currentBook.isbn}) - {currentBook?.author}
          </div>
          <div className="flex">
            <SingleBook hideDetailsLabel book={currentBook} />
            <img src={currentBook?.cover} alt="cover" className="ml-10 w-80 h-96"/>
          </div>
        </div>
      )}

      {booksByAuthor.length > 1 && (
        <div className="">
          <div className="font-semibold text-xl text-green-dark mt-10 mb-5">
            More by {currentBook?.author}
          </div>
          <div className="flex flex-wrap">
            {booksByAuthor
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
