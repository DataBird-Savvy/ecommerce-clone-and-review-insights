const API_URL = "http://127.0.0.1:8000/products";

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const resultCount = document.getElementById("result-count");

let allProducts = [];
let currentCategory = null;

// ⭐ Render products to the DOM
function renderProducts(products) {
  productList.innerHTML = "";

  resultCount.textContent = `${products.length} results${currentCategory ? " in " + currentCategory : ""}`;

  products.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded shadow p-4 flex flex-col items-center text-center";

    const ratingStars = (rating) => {
      let stars = "";
      for (let i = 1; i <= 5; i++) {
        stars += `<span class="${i <= rating ? "text-yellow-400" : "text-gray-300"}">&#9733;</span>`;
      }
      return stars;
    };

    card.innerHTML = `
      <img src="${item.image_url || 'https://via.placeholder.com/150'}" alt="${item.title}" class="w-24 h-36 object-contain mb-2" />
      <h3 class="text-sm font-semibold text-blue-700 hover:underline">${item.title}</h3>
      <div class="text-sm mb-1">${ratingStars(item.rating || 3)}</div>
      <p class="text-green-700 font-bold mb-1">£${parseFloat(item.price).toFixed(2)}</p>
      <p class="text-sm text-green-600 mb-2">${item.availability}</p>
      <button class="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
        Add to basket
      </button>
    `;

    productList.appendChild(card);
  });
}

// ⭐ Render category filters
function renderCategories(categories) {
  categoryList.innerHTML = "";

  const allBtn = document.createElement("li");
  allBtn.innerHTML = `<a href="#" class="hover:underline text-blue-600">All</a>`;
  allBtn.addEventListener("click", () => {
    currentCategory = null;
    renderProducts(allProducts);
  });
  categoryList.appendChild(allBtn);

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" class="hover:underline">${cat}</a>`;
    li.addEventListener("click", () => {
      currentCategory = cat;
      const filtered = allProducts.filter(p => p.category === cat);
      renderProducts(filtered);
    });
    categoryList.appendChild(li);
  });
}

// ⭐ Fetch and initialize data
fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.items;
    renderProducts(allProducts);
    renderCategories(data.categories);
  })
  .catch((err) => {
    console.error("Failed to load product data:", err);
  });
