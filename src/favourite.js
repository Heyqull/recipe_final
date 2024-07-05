const favouritesList = document.getElementById('favourites-list');

const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
//fetch data from the local storage
favourites.forEach((favourite) => {
  const favouriteItem = document.createElement('li');
  favouriteItem.innerHTML = `
    <h2>${favourite.title}</h2>
    <img src="${favourite.image}" alt="Meal Image">
    <p>Category: ${favourite.category}</p>
    <p>Area: ${favourite.area}</p>
    <p>Tags: ${favourite.tags}</p>
    <button class="remove-btn">Remove</button>
  `;
  favouritesList.appendChild(favouriteItem);

  const removeBtn = favouriteItem.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => {
    const confirmRemoval = confirm(`Are you sure you want to remove "${favourite.title}" from your favourites?`);

    if (confirmRemoval) {
      const index = favourites.indexOf(favourite);
      favourites.splice(index, 1);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      favouriteItem.remove();
    }
  });
});