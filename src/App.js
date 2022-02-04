import React from "react";
import "./style.css";
import BooksList from './BooksList.js';
import AddBook from './AddBook.js';

export default function App() {  
  // Hook
  let [booksList, setBooks] = React.useState(
    localStorage.getItem('booksList') ? 
    JSON.parse(localStorage.getItem('booksList')) :
    []
  );

  function setItem(booksList) {
    localStorage.setItem('booksList', JSON.stringify(booksList));
  };

  function redactBook(id, author = null, title = null, image = null) {
    booksList = booksList.map(book => {
      if (book.id === id) {
        author ? book.author = author : book.author;
        title ? book.title = title : book.title;
        image ? book.base64Image = image : book.base64Image;
      };
      return book;
    });

    setItem(booksList);
    setBooks(booksList);
  };

  function removeBook(id) {
    booksList = booksList.filter(book => 
      book.id !== id
    );

    setItem(booksList);
    setBooks(booksList);
  };

  function addBook(author, title, base64Image) {
    let book = {
      id: Date.now(),
      author,
      title,
      base64Image
    };
    booksList.push(book);
    setItem(booksList);
    setBooks([...booksList]);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <AddBook addBook = { addBook }/>
      <BooksList
        books = { booksList }
        redactBook = { redactBook }
        removeBook = { removeBook }
      />
    </div>
  );
}
