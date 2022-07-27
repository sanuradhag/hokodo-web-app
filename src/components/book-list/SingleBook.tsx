import { Book } from "../../types/book";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const SingleBook = ({ book, hideDetailsLabel }: BookProps): JSX.Element => {
  const { title, author, cover } = book;
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if(!hideDetailsLabel) {
      setShowDetails(true)
    }
  }
  const handleMouseLeave = () => {
    if(!hideDetailsLabel) {
      setShowDetails(false)
    }
  }
  return (
    <div
      className="my-3 mx-2 w-44 h-72 border border-green rounded shadow-lg hover:scale-110 ease-in duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!showDetails && (
        <Fragment>
          <img className="w-48 h-40 object-fill" src={cover} alt="book-cover" />
          <div className="flex flex-col justify-between h-[45%] px-2">
            <div className="font-bold text-center text-lg line-clamp-3">{title}</div>
            <div className="font-semibold text-center italic mb-1">{author}</div>
          </div>
        </Fragment>
      )}

      {(showDetails && !hideDetailsLabel) && (
         <div className="cursor-pointer h-[70%] my-10  flex justify-center items-center" >
          <Link className="text-center font-semibold text-green" to={`/book-list/${book.id}`}>See more details</Link>
         </div>
      )}
    </div>
  );
};

interface BookProps {
  book: Book;
  hideDetailsLabel?: boolean;
}

export default SingleBook;
