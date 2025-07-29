async function loadProducts(skip = 0, limit = 6) {
  try {
    const res = await fetch(`/products?skip=${skip}&limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // clear previous data

    data.items.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow-md p-4";

      card.innerHTML = `
        <img src="${product.image_url}" alt="${product.title}" class="w-full h-60 object-cover rounded" />
        <h2 class="text-xl font-semibold mt-2">${product.title}</h2>
        <p class="text-gray-600">${product.price}</p>
        <p class="text-sm text-green-600">${product.availability}</p>
        <p class="text-sm">Rating: ${product.rating}</p>
        <a href="${product.url}" class="text-blue-500 hover:underline text-sm" target="_blank">View Product</a>
      `;

      productList.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to load products:", error);
    document.getElementById("product-list").innerHTML =
      "<p class='text-red-500'>Failed to load products. Please try again later.</p>";
  }
}

// Load products on page load
window.onload = () => {
  loadProducts();
};
