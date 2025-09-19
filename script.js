const loadData = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory( data.categories ))
}


let cart = [];
let total = 0;

const loadFoods = ( id ) => {

  document.getElementById('food-container')?.classList?.add('hidden')
  document.getElementById('loading-spinner')?.classList?.remove('hidden')

  // fetching with conditions
  const idUrl = id 
  ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}` 
  : "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";

  const catButtons = document.querySelectorAll(".btn-category")
  catButtons.forEach(btn => {
    btn.classList.remove("active")
  })

  const currentBtn = document.getElementById(`cat-btn-${id}`)
  currentBtn?.classList?.add('active')
  console.log(currentBtn)
  fetch(idUrl)
  .then(res => res.json())
  .then(data => displayFoods( data.foods ))
}


const loadFoodDetails = ( id ) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.details))
}


// const loadRandomData = () => {
//   const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
//   fetch(url)
//   .then(res => res.json())
//   .then(data => 
//     {
//     displayFoods( data.foods )
//   })
// }


const displayCategory = ( categories ) => 
  {
    const catContainer = document.getElementById( "category-container" )
    catContainer.innerHTML = "";
    for(let cat of categories){

        const categoryCard = document.createElement("div");
        categoryCard.innerHTML = `
        <button id="cat-btn-${cat.id}"
        onclick="loadFoods(${ cat.id })" 
        class="btn 
        justify-center 
        btn-block 
        shadow 
        btn-category">
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

  foods.forEach(( food ) => {
    const foodCart = document.createElement('div')
    foodCart.innerHTML = `
              <div class="p-5 
              bg-white 
              flex 
              gap-3 
              shadow 
              rounded-xl">
            <div class="img 
            flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                onclick="loadFoodDetails(${food.id})"
                class="w-[160px] 
                rounded-xl 
                h-[160px] 
                object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl 
              font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge 
              badge-warning">${food.category}</div>

              <div class="divider 
              divider-end">
                <h2 class="text-yellow-600 
                font-semibold">
                  $ <span class="food-price">${food.price}</span> BDT
                </h2>
              </div>

              <button onclick="addToCart(this)" class="btn 
              btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
    `


    foodContainer
    .append(foodCart)
  });
    document.getElementById('food-container').classList.remove('hidden')
  document.getElementById('loading-spinner')?.classList.add('hidden')
}


const displayDetails = ( food ) => {
  const detailsContainer = document.getElementById( 'details-container' );
  detailsContainer.innerHTML = `
        <div>
        <h2 class="text-3xl font-bold">${food.title}</h2>
        
      </div>
        <div class="badge badge-primary">
        ${food.area}
      </div>
      <a href="${food.video}" target="_blank" class="btn-warning">Watch Video</a>
  `;

  
document.getElementById("my_modal_3").showModal()
}


loadData()
// loadRandomData()
loadFoods()




// document.getElementById('food-container').addEventListener('click', (e) => {

// })



const addToCart = (btn, event) => {
  event?.stopImmediatePropagation();
  const card = btn.parentNode.parentNode
  //  console.log(card)
  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;
  const foodPriceNum = Number(foodPrice);


  const selectedItem = {
    foodTitle: foodTitle,
    foodImg: foodImg, 
    foodPrice: foodPriceNum
  };
  cart.push(selectedItem)
  total = total + foodPriceNum;
  displayCart(cart)
  displayTotal(total)
};


  const displayTotal = (val) => {
    document.getElementById('cart-total').innerHTML = val
  }


const displayCart = (cart) => {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = "";
  for(let item of cart){
    const newItem = document.createElement("div")
    newItem.innerHTML = `
    <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">
            <div class="img">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold food-title">
                ${item.foodTitle}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="item-price">${item.foodPrice}</span> BDT
                </h2>
              </div>
            </div>
            <div onclick="removeCart(this)"
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
    `;
    cartContainer.append(newItem)
  }
}



const removeCart = (btn) => {
  const item = btn.parentNode;
  const foodTitle = item.querySelector('.food-title').innerText
  const foodPrice = Number(item.querySelector('.item-price').innerText)
  cart = cart.filter(item => item.foodTitle != foodTitle);

  total = total - foodPrice
  // total = 0
  // cart.forEach(item => (total += item.foodPrice))
  displayCart(cart)
  displayTotal(total)
}