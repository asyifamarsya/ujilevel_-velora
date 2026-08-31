const productContainer = document.getElementById("produk");

let allProducts = [];
let activeCategory = "all";

// FETCH PRODUCT 
async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Gagal mengambil data produk");
    }

    const data = await response.json();

    allProducts = data;

    renderProducts(allProducts);

  } catch (error) {
    console.error(error);

    productContainer.innerHTML = `
      <div class="text-center text-red-500 py-10">
        Gagal memuat produk.
      </div>
    `;
  }
}

//  FILTER CATEGORY 
function filterCategory(category, event) {

  activeCategory = category;

  let filteredProducts;

  if (category === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(
      (item) => item.category === category
    );
  }

  renderProducts(filteredProducts);

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("bg-pink-500", "text-white");
    btn.classList.add("bg-white", "text-pink-900");
  });

  if (event) {
    event.target.classList.remove("bg-white", "text-pink-900");
    event.target.classList.add("bg-pink-500", "text-white");
  }
}

// RENDER PRODUCT 
function renderProducts(products) {

  let hasil = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  `;

  products.forEach((product) => {

    hasil += `
      <div class="bg-[#FFE8E8] rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">

        <!-- IMAGE -->
        <div class="bg-white h-64 flex items-center justify-center p-6">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="h-44 object-contain hover:scale-105 transition duration-300"
          >
        </div>

        <!-- CONTENT -->
        <div class="p-5 flex flex-col flex-1">

          <h2 class="text-lg font-semibold text-gray-800 h-[60px] overflow-hidden">
            ${product.title.substring(0, 40)}...
          </h2>

          <p class="text-sm text-pink-500 mt-2 capitalize">
            ${product.category}
          </p>

          <p class="text-2xl font-bold text-gray-900 mt-4">
            Rp ${(product.price * 16000).toLocaleString("id-ID")}
          </p>

        </div>

      </div>
    `;
  });

  hasil += `</div>`;

  productContainer.innerHTML = hasil;
}

// ADD TO CART 
function addToCart(id) {

  const product = allProducts.find(
    (item) => item.id === id
  );

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct =
    cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      quantity: 1
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Produk berhasil ditambahkan");
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});