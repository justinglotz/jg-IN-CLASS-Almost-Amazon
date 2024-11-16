import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
  <div class="text-white">
    <h5>${obj.first_name} ${obj.last_name}</h5>
    <p class="card-text bold">${obj.favorite ? '<span class="badge badge-info favorite-badge"><i class="fa-solid fa-heart" aria-hidden="true"></i> Favorite</span>' : ''}</p>
    <p class="email">Author Email: ${obj.email}</p>
    <i class="fas fa-edit btn btn-info" id="update-author-btn--${obj.firebaseKey}"></i>
    <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i>
    <h5>Books: </h5>
  </div>`;
  let bookString = '';
  obj.booksByThisAuthor.forEach((book) => {
    bookString += `
    <div class="card">
        <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${book.title}</h5>
            <p class="card-text bold">${book.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${book.firebaseKey}"></i>
            <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
            <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>
    `;
  });

  renderToDOM('#view', domString);
  renderToDOM('#store', bookString);
};
export default viewAuthor;
