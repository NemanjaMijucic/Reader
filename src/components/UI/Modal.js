import { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import BookContext from "../../store/book-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Modal.module.css";

//background div when displaying modal
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

//div where content for modal will be displayed
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//function for content for modal
const Content = ({ books, bookCtx }) => {
  return books
    .filter((book) => book.id === bookCtx.idForModal)
    .map((book) => {
      console.log(book, bookCtx.idForModal, "jel radi");
      return (
        <div className={classes.info}>
          <div>
            <img
              src={
                book.cover
                  ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg?default=false`
                  : "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif"
              }
              alt="no cover found"
            ></img>
          </div>
          <div>
            <ul>
              <li>
                <h3>{book.title}</h3>
              </li>
              <li>id: {book.id}</li>
              <li>author: {book.author}</li>

              <li>language: {book.language ? book.language[0] : "unknown"}</li>

              <li>
                published: {book.publishDate ? book.publishDate : "unknown"}
              </li>
              <li>publisher: {book.publisher ? book.publisher : "unknown"}</li>
              <li>
                readed status:
                {book.readed ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={classes.icon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={classes.icon}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      );
    });
};

const portalElement = document.getElementById("overlays");

const Modal = ({ books }) => {
  const bookCtx = useContext(BookContext);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={bookCtx.showModalHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <Content books={books} bookCtx={bookCtx} key={Math.random()} />
          <Button onClick={bookCtx.showModalHandler} key={Math.random()}>
            Close details
          </Button>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
