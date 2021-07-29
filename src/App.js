import React, {Component} from "react";
import * as BooksAPI from "./components/BooksAPI";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BookCategories from "./components/BookCategories";
import BookShelfs from "./components/BookShelfs";
import Search from "./components/Search";
import HelperFunction from "./components/HelperFunction";

import "./App.css";
import "./styles/styles.css";

class BooksApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      showSearchPage: false,
    };
  }
 

  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState({ data: data }));
  }

  render() {
    const { data } = this.state;
    return (
      <div className="app">
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>ReactND Read App</h1>
                </div>
                <div className="list-books-content">
                  {HelperFunction.booksShelf.map((shelfname) => {
                    return (
                      <BookShelfs
                        key={shelfname.title}
                        title={shelfname.title}
                        data={data.map((book) => {
                          if (book.shelf === shelfname.value) {
                            return (
                              <BookCategories
                              key={book.id}
                                id={book.id}
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
                  <Link to="/search">
                    <button
                      onClick={() => this.setState({ showSearchPage: true })}
                    >
                      Add a book
                    </button>
                  </Link>
                </div>{" "}
                *
              </div>
            )}
          />

          <Switch>
            <Route
              path="/search"
              render={() => (
                <Search
                  data={data.map((books) => {
                    return books;
                  })}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
