import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book.js';

const styles = {
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }
};

function BooksList(props) {
  return (
    <ul style = { styles.ul }>
      {
        props.books.map((book, index) => {
          return <Book 
                      key = { book.id }
                      book = { book }
                      index = { index }
                      redactBook = { props.redactBook }
                      removeBook = { props.removeBook }
                  />
        })    
      }
    </ul>
  )
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  redactBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
};


export default BooksList;
