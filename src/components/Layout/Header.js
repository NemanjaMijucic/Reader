import React, { useContext, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faSearch,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import BookContext from "../../store/book-context";

const Header = (props) => {
  const [searchString, setSearchString] = useState("");
  const bookCtx = useContext(BookContext);

  //entered text in input
  const searchStringHandler = (e) => {
    setSearchString(e.target.value);
  };

  //fetching books from API
  const fetchBooks = async (e) => {
    props.getLoadingState(true);
    bookCtx.setErrorHandler(false);
    e.preventDefault();
    try {
      const result = await fetch(
        `https://openlibrary.org/search.json?title=${searchString}&limit=20`
      );

      const data = await result.json();
      console.log(data);
      if (!data.docs.length) {
        throw new Error("no books found");
      }

      const transformedBooks = data.docs.map((book) => {
        return {
          readed: false,
          currentlyReading: false,
          title: book.title,
          author: book.author_name,
          cover: book.cover_i,
          id: book.edition_key[0],
          publishDate: book.publish_date[0],
          publisher: book.publisher[0],
          language: book.language,
        };
      });

      props.getLoadingState(false);
      props.getBooks(transformedBooks);
      setSearchString("");
    } catch (error) {
      if (error) {
        props.getLoadingState(false);

        bookCtx.setErrorHandler(true);
      }
    }
  };

  return (
    <header className={classes.header}>
      <div>
        <h1>
          Reader App <FontAwesomeIcon icon={faBookOpen} />{" "}
        </h1>
      </div>
      <div className={classes.formholder}>
        <form onSubmit={fetchBooks}>
          <Input
            className={classes.input}
            type="text"
            name="search"
            placeholder="type here to find book"
            onChange={searchStringHandler}
            value={searchString}
          />
          <Button type="submit" onClick={fetchBooks} className={classes.button}>
            Find Book <FontAwesomeIcon icon={faSearch} />
          </Button>
        </form>
      </div>

      <Link to="/profile">
        <Button className={classes.link}>
          Go to profile <FontAwesomeIcon icon={faArrowAltCircleRight} />{" "}
        </Button>
      </Link>
    </header>
  );
};

export default Header;
