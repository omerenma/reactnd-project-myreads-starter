import React, { Component } from "react";

class BookShelfs extends Component {
  render() {
    const { title, data } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid" key={data.id}>{data}</ol>
        </div>
      </div>
    );
  }
}

export default BookShelfs;
