import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

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

// DELETE BOOKS BEFORE AUTHOR
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
