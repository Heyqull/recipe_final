const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');
let mealData;

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then((response) => response.json())
  .then((data) => {
    //meal details is shown here
    const meal = data.meals[0];
    document.getElementById("meal-title").innerHTML = meal.strMeal;
    document.getElementById("meal-image").src = meal.strMealThumb;
    const instructions = meal.strInstructions.split('\n').filter(Boolean);
    const instructionParagraphs = instructions.map(instruction => `<p>${instruction}</p>`).join('');
    document.getElementById("meal-instructions").innerHTML = instructionParagraphs;
    const ingredients = [];
    for (let i = 1; i <= 9; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    //ingredient list
    const ingredientList = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    document.getElementById("meal-ingredients").innerHTML = ingredientList;
    //youtube video
    const youtubeUrl = meal.strYoutube;
    const videoId = youtubeUrl.split('v=')[1];
    document.getElementById("meal-video").src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById("meal-category").innerHTML = `Category: ${meal.strCategory}`;
    document.getElementById("meal-area").innerHTML = `Area: ${meal.strArea}`;
    document.getElementById("meal-tags").innerHTML = `Tags: ${meal.strTags}`;

    mealData = {
      id: mealId,
      title: meal.strMeal,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      ingredients: ingredients,
      videoId: videoId,
      category: meal.strCategory,
      area: meal.strArea,
      tags: meal.strTags,
    };
  });
//add to favourite
const favouriteBtn = document.getElementById('favourite-btn');
favouriteBtn.addEventListener('click', () => {
  const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  const isFavourite = favourites.find((favourite) => favourite.id === mealId);

  if (!isFavourite) {
    favourites.push(mealData);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    favouriteBtn.textContent = 'Added to Favourites';
  } else {
    
    const index = favourites.indexOf(isFavourite);
    favourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    favouriteBtn.textContent = 'Add to Favourites';
  }
});