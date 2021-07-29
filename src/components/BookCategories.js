import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "../styles/styles.css";

class BookCategories extends Component {
  state = {
    books: [],
  };

  update = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((book) => {
      this.setState({ books: book });
    });
  };
  render() {
    const { id, books, image, shelf, title, author } = this.props;
    return (
      <li key={id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${image})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={(e) => {
                  this.update(books, e.target.value);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    );
  }
}

export default BookCategories;
