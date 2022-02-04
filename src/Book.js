import React from 'react';
import PropTypes from 'prop-types';
import { convertBase64 } from './tools.js';

const styles = {
  li: {
    border: '1px solid red',
    margin: '5px',
  },
  img: {
    objectFit: 'cover',
    width: '145px',
    height: '205px',
    border: '1px solid black',
    textAlign:'center',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '147px',
    height: '100%',
  },
  inputFile: {
    color: 'transparent',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

function Book({ book, index, redactBook, removeBook }) {
  let modalInputFile = React.createRef();
  let modalInputAuthor = React.createRef();
  let modalInputTitle = React.createRef();
  // Hooks
  let [modalIsShown, setModalVisibility] = React.useState(false);
  let [contentIsShown, setContentVisibility] = React.useState(true);
  let [newImageIsSet, setNewImageFlag] = React.useState(false);
  let [newImage, setNewImage] = React.useState(book.base64Image);

  function toggleVisibility() {
    modalIsShown ? modalIsShown = false : modalIsShown = true;
    contentIsShown ? contentIsShown = false : contentIsShown = true;
    setContentVisibility(contentIsShown);
    setModalVisibility(modalIsShown);
  };

  let newInputImg = async () => {
    const inputImage = modalInputFile.current.files[0];
    const base64Image = await convertBase64(inputImage);
    setNewImage(base64Image);
    setNewImageFlag(true);
  }

  function saveChanges() {
    if (modalInputAuthor.current.value ||
        modalInputTitle.current.value ||
        newImageIsSet) {
          redactBook(book.id, modalInputAuthor.current.value, modalInputTitle.current.value, newImage);
        };
    toggleVisibility();
  };

  function closeButtonFnc() {
    setNewImage(book.base64Image);
    toggleVisibility();
  }

  return (
    <li style = { styles.li }>
      {modalIsShown && 
        (<div style ={ styles.modalBody }>
          <img src={ newImage } alt="No image" style={ styles.img }/>
          <input style = { styles.inputFile } type="file" ref={ modalInputFile } onChange={ () => newInputImg() }/>
          <input type="text" placeholder="Author" ref={ modalInputAuthor }/>
          <input type="text" placeholder="Title" ref={ modalInputTitle }/>
          <button onClick = {() => closeButtonFnc()}>Close</button>
          <button onClick = { () => saveChanges() }>Save changes</button>
        </div>)
      }
      {contentIsShown && 
        (<div style = { styles.content }>
          <img src={ book.base64Image } alt="No image" style={ styles.img }/>
          <p>{ book.author }</p>
          <p>{ book.title }</p>
          <button onClick = {() => removeBook(book.id)} >Remove book</button>
          <button onClick = { () => toggleVisibility() }>Redact book</button>
        </div>)
      }
    </li>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  index: PropTypes.number,
  redactBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
};

export default Book;
