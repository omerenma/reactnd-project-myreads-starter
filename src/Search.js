import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      booksResult: [],
      state: false,
    };
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((data) => {
        this.setState({ books: data });
      })
    // .then(() => {
    //   BooksAPI.getAll().then((data) => {
    //     this.setState({ books: data });
    //   });
    // });
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    
  };

 

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ booksResult: books }));
  }
  render() {
    const { data } = this.props;
    const { query, booksResult } = this.state;
    const bookSearch =
      query === ""
        ? "Please enter some text"
        : booksResult.filter((f) =>
            f.title.toLowerCase().includes(query.toLowerCase())
          );

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
              //onClick={() => this.setState({ showSearchPage: false })}
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <form>
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(e) => this.updateQuery(e.target.value)}

                />
              </form>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {bookSearch && Array.isArray(bookSearch)
                ? bookSearch.map((book) => {
                    return (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${
                                  book.imageLinks.thumbnail
                                })`,
                              }}
                            />
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
                                onChange={(e) => this.update(book, e.target.value)}

                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value={book.shelf}>{book.shelf}</option>
                                <option value="currentlyReading">
                                  Currently reading
                                </option>
                                <option value="wantToRead">Want to read</option>
                                <option value="read">Read</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;