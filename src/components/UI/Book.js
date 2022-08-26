import classes from "./Book.module.css";
import React, { useContext } from "react";
import Button from "./Button";
import BookContext from "../../store/book-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";

const Book = ({ book, onAddToReadedList, onAddToReadingList, onShowModal }) => {
  const bookCtx = useContext(BookContext);

  return (
    <div className={classes.book} key={book.id}>
      <img
        src={
          book.cover
            ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg?default=false`
            : "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif"
        }
        alt="no cover found"
      ></img>
      <h4>{book.title}</h4>
      <h5>by: {book.author}</h5>
      {!book.readed ? (
        <Button onClick={() => onAddToReadingList(book)}>
          {!book.currentlyReading ? (
            "Add to reading list"
          ) : (
            <p>
              Currently Reading <FontAwesomeIcon icon={faBookBookmark} />
            </p>
          )}
        </Button>
      ) : (
        <p id="readed">
          Book readed <FontAwesomeIcon icon={faCheckCircle} />
        </p>
      )}
      {!book.readed && (
        <Button onClick={() => onAddToReadedList(book)}>Mark as readed</Button>
      )}
      <Button
        onClick={() => {
          onShowModal();
          bookCtx.getIdForModal(book.id);
        }}
      >
        Details
      </Button>
    </div>
  );
};

export default Book;
