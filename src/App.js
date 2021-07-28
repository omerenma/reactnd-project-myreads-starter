import React from "react";
import * as BooksAPI from "./BooksAPI";
import BookCategories from "./BookCategories";
import BookShelfs from "./BookShelfs";
import Search from "./Search";

import { Route, Link } from "react-router-dom";
import "./App.css";

const book_shelve = [
  { title: "Currently reading", value: "currentlyReading" },
  { title: "Want to read", value: "wantToRead" },
  { title: "Read", value: "read" },
];
class BooksApp extends React.Component {
  state = {
    data: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState({ data: data }));
  }

  render() {
    const { data } = this.state;
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            data={this.state.data.map((books) => {
              return books;
            })}
          />
        ) : (
          // <div className="search-books">
          //   <div className="search-books-bar">
          //     <button
          //       className="close-search"
          //       onClick={() => this.setState({ showSearchPage: false })}
          //     >
          //       Close
          //     </button>
          //     <div className="search-books-input-wrapper">
          //       <input type="text" placeholder="Search by title or author" />
          //     </div>
          //   </div>
          //   <div className="search-books-results">
          //     <ol className="books-grid" />
          //   </div>
          // </div>
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {book_shelve.map((s) => {
                  return (
                    <BookShelfs
                      key={s.title}
                      title={s.title}
                      data={data.map((book) => {
                        if (book.shelf === s.value) {
                          return (
                            <BookCategories
                              key={book.id}
                              image={book.imageLinks.thumbnail}
                              shelf={book.shelf}
                              books={book}
                              title={book.title}
                              author={book.authors}
                            />
                          );
                        }
                      })}
                    />
                  );
                })}
              </div>

              <div className="open-search">
                <Route exact path="/search" render={() => <Search />} />
                <button onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
