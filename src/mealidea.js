let categories = [];
let meals = [];

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
 .then(response => response.json())
 .then(data => {
    categories = data.categories;
    generateCategoryList();
  });
//list all available meal categories
function generateCategoryList() {
  const categoryList = document.getElementById("category-list");

  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.onclick = () => {
      displayMeals(category.strCategory);
    };

    const categoryImage = document.createElement("img");
    categoryImage.src = category.strCategoryThumb;
    categoryImage.alt = category.strCategory;

    const categoryName = document.createElement("p");
    categoryName.textContent = category.strCategory;

    categoryDiv.appendChild(categoryImage);
    categoryDiv.appendChild(categoryName);
    categoryList.appendChild(categoryDiv);
  });
}
//display all available meals for the selected categories
function displayMeals(category) {
    const mealList = document.getElementById("meal-list");
    const categoryNameElement = document.querySelector("h2"); 
    categoryNameElement.textContent = `${category}`; 
    mealList.innerHTML = "";
  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     .then(response => response.json())
     .then(data => {
        meals = data.meals;
        displayMealList();
      });
  
      window.scrollTo({
        top: categoryNameElement.offsetTop - 50,
        behavior: 'smooth'
      });
  }

function displayMealList() {
  const mealList = document.getElementById("meal-list");

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");

    const mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;

    const mealName = document.createElement("p");
    mealName.textContent = meal.strMeal;

    mealDiv.appendChild(mealImage);
    mealDiv.appendChild(mealName);
    mealList.appendChild(mealDiv);
  });
}