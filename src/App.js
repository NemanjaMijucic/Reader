import React, { Fragment, useState, useContext } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Main from "./components/Layout/Main";
import Footer from "./components/Layout/Footer";
import Profile from "./components/Profile/Profile";
import Loader from "./components/UI/Loader";
import Modal from "./components/UI/Modal";
import BookContext from "./store/book-context";

const App = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bookCtx = useContext(BookContext);
  const error = bookCtx.error;

  const getBooks = (books) => {
    setBooks(books);
  };
  const getLoadingState = (loading) => {
    setIsLoading(loading);
  };

  const errorDiv = (
    <div id="error">
      <p>Ups! Something went wrong...</p>
    </div>
  );

  return (
    <Fragment>
      <Route path="/Reader" exact>
        {bookCtx.showModal && <Modal books={books} />}
        <Header getBooks={getBooks} getLoadingState={getLoadingState} />
        {isLoading && <Loader />}
        {error && !isLoading && errorDiv}
        {!isLoading && !error && <Main books={books} />}
        <Footer />
      </Route>
      <Route path="/profile/">
        <Profile />
        {bookCtx.showModal && <Modal books={books} />}
      </Route>
    </Fragment>
  );
};

export default App;

//create folder for every component with css and js file.
