const loadData = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.categories))
}

const displayCategory = (categories) => {
    console.log(categories)
    const catContainer = document.getElementById("category-container")
    catContainer.innerHTML = "";
    for(let cat of categories){

        const categoryCard = document.createElement("div");
        categoryCard.innerHTML = `
        <button class="btn justify-center btn-block shadow btn-category">
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

loadData()