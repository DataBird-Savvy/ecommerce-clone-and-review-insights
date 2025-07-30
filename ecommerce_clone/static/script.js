const BASE_API_URL = "http://127.0.0.1:8000/products";

const productList = document.getElementById("product-list");
const categoryList = document.getElementById("category-list");
const resultCount = document.getElementById("result-count");
const breadcrumb = document.getElementById("breadcrumb-category");
const pageTitle = document.getElementById("page-title");
const pageInfo = document.getElementById("page-info");
const nextBtn = document.getElementById("next-btn");

let currentCategory = null;
let currentPage = 1;
const itemsPerPage = 20;
let totalPages = 1;
let currentProducts = [];

// Render star rating
function ratingStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="${i <= rating ? "text-yellow-400" : "text-gray-300"}">&#9733;</span>`;
  }
  return stars;
}

// Render products for current page
function renderProducts(products) {
  productList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = products.slice(start, end);

  resultCount.textContent = `${products.length} result(s)${currentCategory ? " in " + currentCategory : ""}`;
  breadcrumb.textContent = currentCategory || "All Products";
  pageTitle.textContent = currentCategory || "All Products";
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  pageProducts.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded shadow p-4 flex flex-col items-center text-center";

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

  // Disable next button on last page
  nextBtn.disabled = currentPage >= totalPages;
  nextBtn.classList.toggle("opacity-50", nextBtn.disabled);
}

// Render categories
function renderCategories(categories) {
  categoryList.innerHTML = "";

  const allBtn = document.createElement("li");
  allBtn.innerHTML = `<a href="#" class="hover:underline text-blue-600">All</a>`;
  allBtn.addEventListener("click", () => {
    currentCategory = null;
    currentPage = 1;
    fetchAndRenderProducts();
  });
  categoryList.appendChild(allBtn);

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" class="hover:underline">${cat}</a>`;
    li.addEventListener("click", () => {
      currentCategory = cat;
      currentPage = 1;
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
      currentProducts = data.items;
      totalPages = Math.ceil(currentProducts.length / itemsPerPage);
      renderCategories(data.categories);
      renderProducts(currentProducts);
    })
    .catch((err) => {
      console.error("Failed to load product data:", err);
    });
}

// Handle "Next" button
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderProducts(currentProducts);
  }
});

// Initial load
fetchAndRenderProducts();
