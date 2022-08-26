import classes from "./Main.module.css";
import React, { useContext } from "react";
import Book from "../UI/Book";
import BookContext from "../../store/book-context";

const Main = ({ books }) => {
  const bookCtx = useContext(BookContext);

  return (
    <div className={classes.main}>
      {books.map((book) => {
        return (
          <Book
            book={book}
            onAddToReadingList={bookCtx.setBooksToLS}
            key={book.id}
            onAddToReadedList={bookCtx.addToReadedBooksList}
            onShowModal={bookCtx.showModalHandler}
          />
        );
      })}
    </div>
  );
};

export default Main;
