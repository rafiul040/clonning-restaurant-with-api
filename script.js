const loadData = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.categories))
}


const loadFoods = (id) => {
  const idUrl = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
  fetch(idUrl)
  .then(res => res.json())
  .then(data => displayFoods(data.foods))
}


const loadRandomData = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
  fetch(url)
  .then(res => res.json())
  .then(data => displayFoods(data.foods))
}


const displayCategory = (categories) => {
    console.log(categories)
    const catContainer = document.getElementById("category-container")
    catContainer.innerHTML = "";
    for(let cat of categories){

        const categoryCard = document.createElement("div");
        categoryCard.innerHTML = `
        <button onclick="loadFoods(${cat.id})" class="btn justify-center btn-block shadow btn-category">
            <img
              src="${cat?.categoryImg}"
              alt="${cat?.categoryName}"
              class="w-10"
            />${cat.categoryName}
          </button>
        `
        catContainer.append(categoryCard)
    }
}



const displayFoods = ( foods ) => {
  const foodContainer = document.getElementById('food-container');
  foodContainer.innerHTML = '';

  foods.forEach((food) => {
    const foodCart = document.createElement('div')
    foodCart.innerHTML = `
              <div class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${food.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `


    foodContainer.append(foodCart)
  })
}

loadData()
loadRandomData()