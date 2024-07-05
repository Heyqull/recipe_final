//fetch data from api after button is clicked
function buttonClicked(){
    var recipe = document.getElementById("recipe_input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
   .then((response) => response.json())
   .then((data) => {
      const meals = data.meals.slice(0, 10);
      const mealListHtml = meals.map((meal) => {
        return `
          <div class="meal-item">
            <a href="meal.html?id=${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </a>
            <h2>${meal.strMeal}</h2>
          </div>
        `;
      }).join("");
      document.getElementById("meal-list").innerHTML = mealListHtml;
    });
  }

//slideshow
let slideshowImages = [
    "https://cityofwebster.com/ImageRepository/Document?documentID=11405",
    "https://us.sodexo.com/files/live/sites/com-us/files/inspired-thinking/2022/5126-collage.jpg",
    "https://tillamookchc.org/wp-content/uploads/2020/08/FOOD-900x200.png",
    "https://archive-yaleglobal.yale.edu/sites/default/files/images/foodBanner.jpg",
    "https://sabakerys.com/images/ban_horecas.jpg"
  ];
  
  let slideshowIndex = 0;
  
  function createSlideshow() {
    const slideshowContainer = document.getElementById("slideshow-container");
    const slideshow = document.getElementById("slideshow");
    const slideshowDots = document.getElementById("slideshow-dots");
  
    slideshowImages.forEach((image, index) => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = `Slideshow image ${index + 1}`;
      slideshow.appendChild(img);
  
      const dot = document.createElement("span");
      dot.onclick = () => {
        slideshowIndex = index;
        updateSlideshow();
      };
      slideshowDots.appendChild(dot);
    });
  
    updateSlideshow();
    setInterval(() => {
      slideshowIndex = (slideshowIndex + 1) % slideshowImages.length;
      updateSlideshow();
    }, 5000);
  }
  
  function updateSlideshow() {
    const slideshow = document.getElementById("slideshow");
    const slideshowDots = document.getElementById("slideshow-dots");
  
    Array.from(slideshow.children).forEach((img, index) => {
      img.style.opacity = index === slideshowIndex ? 1 : 0;
    });
  
    Array.from(slideshowDots.children).forEach((dot, index) => {
      dot.classList.toggle("active", index === slideshowIndex);
    });
  }
  
  createSlideshow();
  
  function buttonClicked(){
    var recipe = document.getElementById("recipe_input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
   .then((response) => response.json())
   .then((data) => {
  const meals = data.meals.slice(0, 10);
      const mealListHtml = meals.map((meal) => {
        return `
          <div class="meal-item">
            <a href="meal.html?id=${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </a>
            <h2>${meal.strMeal}</h2>
          </div>
        `;
      }).join("");
      document.getElementById("meal-list").innerHTML = mealListHtml;
    });
  }

  