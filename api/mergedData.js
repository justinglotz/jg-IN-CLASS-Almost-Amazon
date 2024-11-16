import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

// GET BOOK DETAILS
const getBookDetails = (firebasekey) => new Promise((resolve, reject) => {
  getSingleBook(firebasekey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id)
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

export default getBookDetails;

// GET AUTHOR DETAILS
const getAuthorDetails = (firebasekey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebasekey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey)
      .then((booksByThisAuthor) => resolve({ ...authorObject, booksByThisAuthor }));
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails };
