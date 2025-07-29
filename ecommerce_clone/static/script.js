const BASE_API_URL = "http://127.0.0.1:8000/products";

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const resultCount = document.getElementById("result-count");
const breadcrumb = document.getElementById("breadcrumb-category");
const pageTitle = document.getElementById("page-title");

let currentCategory = null;

// Render star rating
function ratingStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="${i <= rating ? "text-yellow-400" : "text-gray-300"}">&#9733;</span>`;
  }
  return stars;
}

// Render products
function renderProducts(products) {
  productList.innerHTML = "";

  resultCount.textContent = `${products.length} result(s)${
    currentCategory ? " in " + currentCategory : ""
  }`;

  breadcrumb.textContent = currentCategory || "All Products";
  pageTitle.textContent = currentCategory || "All Products";

  products.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded shadow p-4 flex flex-col items-center text-center";

    card.innerHTML = `
      <img src="${item.image_url || "https://via.placeholder.com/150"}" alt="${item.title}" class="w-24 h-36 object-contain mb-2" />
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

// Render categories
function renderCategories(categories) {
  categoryList.innerHTML = "";

  const allBtn = document.createElement("li");
  allBtn.innerHTML = `<a href="#" class="hover:underline text-blue-600">All</a>`;
  allBtn.addEventListener("click", () => {
    currentCategory = null;
    fetchAndRenderProducts();
  });
  categoryList.appendChild(allBtn);

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" class="hover:underline">${cat}</a>`;
    li.addEventListener("click", () => {
      currentCategory = cat;
      fetchAndRenderProducts();
    });
    categoryList.appendChild(li);
  });
}

// Fetch products and render
function fetchAndRenderProducts() {
  const url = currentCategory
    ? `${BASE_API_URL}?category=${encodeURIComponent(currentCategory)}`
    : BASE_API_URL;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data.items);
      renderCategories(data.categories);
    })
    .catch((err) => {
      console.error("Failed to load product data:", err);
    });
}

// Initial load
fetchAndRenderProducts();
