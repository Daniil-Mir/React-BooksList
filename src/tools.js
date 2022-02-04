import React from 'react';

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    
    if (file !== undefined) {
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } else {
      resolve(undefined);
    }
  });
};

export { convertBase64 };
