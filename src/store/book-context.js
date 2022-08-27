import React, { useState, useEffect } from "react";

const BookContext = React.createContext({
  currReadingbooks: [],
  readedBooks: [],
  showModal: "",
  idForModal: "",
  error: "",
  setBooksToLS: () => {},
  addToReadedBooksList: () => {},
  showModalHandler: () => {},
  getIdForModal: () => {},
  setErrorHandler: () => {},
});

export const BookContextProvider = (props) => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [readedBooks, setReadedBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idForModal, setIdForModal] = useState("");
  const [error, setError] = useState(false);

  const addToReadingList = (item) => {
    item.currentlyReading = true;

    let readingBooks = [];
    if (!localStorage.getItem("books")) {
      readingBooks.push(item);
      localStorage.setItem("books", JSON.stringify(readingBooks));
    }

    if (localStorage.getItem("books") !== null) {
      readingBooks = JSON.parse(localStorage.getItem("books"));
      setCurrentlyReading(readingBooks);
      const found = readingBooks.some((book) => book.title === item.title);
      if (!found) {
        readingBooks = [...readingBooks, item];
        localStorage.setItem("books", JSON.stringify(readingBooks));
      }
    }
    setCurrentlyReading(readingBooks);
  };

  //function for readed books
  const addToReadedBooksList = (item) => {
    let readedBooksList = [];
    item.readed = true;
    if (!localStorage.getItem("readedBooks")) {
      readedBooksList.push(item);
      localStorage.setItem("readedBooks", JSON.stringify(readedBooksList));
    }

    if (localStorage.getItem("readedBooks")) {
      readedBooksList = JSON.parse(localStorage.getItem("readedBooks"));
      const found = readedBooksList.some((book) => book.title === item.title);

      if (!found) {
        readedBooksList = [...readedBooksList, item];
        localStorage.setItem("readedBooks", JSON.stringify(readedBooksList));
      }
    }

    setReadedBooks(readedBooksList);

    //deleteing from currently reading array in LS when clicked on readed book
    if (currentlyReading) {
      setCurrentlyReading(
        currentlyReading.filter((book) => book.id !== item.id)
      );
      localStorage.removeItem("books");
      localStorage.setItem("books", JSON.stringify(currentlyReading));
    }
  };

  //function for showing modal with book info
  const showModalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const getIdForModal = (id) => {
    setIdForModal(id);
  };

  useEffect(() => {
    if (localStorage.getItem("books")) {
      setCurrentlyReading(JSON.parse(localStorage.getItem("books")));
    }

    if (localStorage.getItem("readedBooks")) {
      setReadedBooks(JSON.parse(localStorage.getItem("readedBooks")));
    }
  }, []);

  // //function for showing error
  // const setErrorHandler = () => {
  //   setError(true);
  // };

  return (
    <BookContext.Provider
      value={{
        currReadingbooks: currentlyReading,
        readedBooks: readedBooks,
        showModal: showModal,
        idForModal: idForModal,
        error: error,
        setBooksToLS: addToReadingList,
        addToReadedBooksList: addToReadedBooksList,
        showModalHandler: showModalHandler,
        getIdForModal: getIdForModal,
        setErrorHandler: setError,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContext;
