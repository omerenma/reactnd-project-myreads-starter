import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      booksResult: [],
      searchResult: [],
      state: false,
    };
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((data) => {
        this.setState({ books: data });
        window.location.reload("/");
      });
    });
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ booksResult: books }));
  }
  render() {
    const { data } = this.props;
    const { query, booksResult, searchResult } = this.state;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <form>
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(e) => {
                    this.setState({ query: e.target.value });
                    BooksAPI.search(e.target.value).then((data) => {
                      this.setState({ searchResult: data });
                    });
                  }}
                  //onChange={(e) => this.updateQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchResult && Array.isArray(searchResult)
                ? searchResult.map((book) => {
                    let bookShelf = data.find((b) => b.id === book.id);
                    if (bookShelf) {
                      book.shelf = bookShelf.shelf;
                    } else {
                      book.shelf = "none";
                    }
                    return (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            {!book.imageLinks ||
                            book.imageLinks === undefined ? null : (
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
                            )}

                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
                                onChange={(e) => {
                                  this.update(book, e.target.value);
                                  this.props.history.push("/");
                                }}
                              >
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                {/* <option value={book.shelf}>{book.shelf}</option> */}
                                <option value="currentlyReading">
                                  Currently reading
                                </option>
                                <option value="wantToRead">Want to read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
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

export default withRouter(Search);
