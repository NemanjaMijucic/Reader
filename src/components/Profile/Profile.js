import classes from "./Profile.module.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookContext from "../../store/book-context";
import Book from "../UI/Book";
import { Fragment } from "react";
import Button from "../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Layout/Footer";

const Profile = () => {
  const bookCtx = useContext(BookContext);
  const [countOfReadedBooks, setCountOfReadedBooks] = useState(
    bookCtx.readedBooks.length
  );
  const [countOfCurrentBooks, setCountOfCurrentBooks] = useState(
    bookCtx.readedBooks.length
  );

  useEffect(() => {
    setCountOfCurrentBooks(bookCtx.currReadingbooks.length);
    setCountOfReadedBooks(bookCtx.readedBooks.length);
  }, [bookCtx.currReadingbooks, bookCtx.readedBooks]);

  const renderBooks = (books) => {
    return books.map((book) => {
      return (
        <Book
          book={book}
          onAddToReadingList={bookCtx.setBooksToLS}
          key={book.id}
          onAddToReadedList={bookCtx.addToReadedBooksList}
          onShowModal={bookCtx.showModalHandler}
        />
      );
    });
  };

  const CurrentlyReading = () => {
    return (
      <Fragment>
        <div className={classes.profilecontainer}>
          <h3>Currnetly Reading Books ({countOfCurrentBooks})</h3>
          <div className={classes.profilebooks}>
            {renderBooks(bookCtx.currReadingbooks)}
          </div>
        </div>
      </Fragment>
    );
  };

  const ReadedBooks = () => {
    return (
      <Fragment>
        <div className={classes.profilecontainer}>
          <h3>Readed Books ({countOfReadedBooks})</h3>
          <div className={classes.profilebooks}>
            {renderBooks(bookCtx.readedBooks)}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className={classes.profile}>
      <div className={classes["profile-title"]}>
        <div>
          <Link to="/Reader">
            <Button className={classes.link}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              Back to main page
            </Button>
          </Link>
        </div>
        <div>
          <h2>Nemanja Mijucic</h2>
          <p>"A reader lives a thousand lives before he dies" </p>
        </div>
      </div>

      <CurrentlyReading />
      <ReadedBooks />
      <Footer />
    </div>
  );
};

export default Profile;
