import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { showAuthors } from '../pages/authors';
import { favoriteAuthors, getAuthors } from '../api/authorData';

// NAVIGATION EVENTS
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then(showBooks);
  });

  // ALL AUTHORS
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then(showAuthors);
  });

  // FAVORITE AUTHORS
  document.querySelector('#favorite-authors').addEventListener('click', () => {
    favoriteAuthors(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    getBooks(user.uid).then((books) => {
      const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchValue));
      showBooks(filteredBooks);
    });

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
