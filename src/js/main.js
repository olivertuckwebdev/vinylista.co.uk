// Cart dropdown

let cartButton = document.querySelector('.cart');
let miniCart = document.querySelector('.mini-cart');

cartButton.addEventListener('click', function() {
  if (miniCart.style.display === 'none') {
    miniCart.style.display = 'block';
  } else {
    miniCart.style.display = 'none';
  }
});

// Search button

let searchSubmit = document.querySelector('.site-search button');

searchSubmit.onclick = function(e) {
  e.preventDefault();
  location.href = '/search-results.html';
};
