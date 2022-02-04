import React from 'react';
import { convertBase64 } from './tools.js';

function AddBook({ addBook }) {

  // Hook
  const [preViewImage, setPreViewImage] = React.useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    const imageFile = event.target.elements.image.files[0];
    const author = event.target.elements.author.value;
    const title = event.target.elements.title.value;

    const base64Image = await convertBase64(imageFile);

    author && title && addBook(author, title, base64Image);

    event.target.elements.author.value = '';
    event.target.elements.title.value = '';
    event.target.elements.image.files = [];
  };

  const preView = async (event) => {
    const imageFile = event.target.files[0];
    const base64Image = await convertBase64(imageFile);
    setPreViewImage(base64Image);
  }

  const styles = {
    form: {
      padding: '1rem',
      margin: '1rem',
      display: 'flex', 
      flexDirection: 'column',
      border: '1px solid #cccccc'
    },
    input: {
      margin: '5px',
    },
    img: {
      objectFit: 'cover',
      width: '145px',
      height: '205px',
    },
    button: {
      margin: '5px',
      width: '100px',
    }
  };

  return (
    <form style={ styles.form } onSubmit={submitHandler}>
      <input style={ styles.input } type="file" id="image" onChange={ (e) => {
        preView(e)
       } 
      }/>
      <img style={ styles.img } src={ preViewImage } alt="No pre view image (not required)" id="preViewImage"/>
      <input  style={ styles.input } type="text" placeholder="Author (required)" id="author"/>
      <input  style={ styles.input } type="text" placeholder="Title (required)" id="title"/>
      <button style={ styles.button } type="submit">Add book</button>
    </form>
  )
};

export default AddBook;
