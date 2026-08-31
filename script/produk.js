  const productContainer =  // variabel
  document.getElementById("produk");

  let allProducts = []; // array
  let activeCategory = "all"; // ampe sini
  // FETCH PRODUCT 
  async function getProducts() {

    try {

      const response =
      await fetch("https://fakestoreapi.com/products");

      const data =
      await response.json();

      /* SIMPAN KE STATE */
      allProducts = data;

      renderProducts(data);

    } catch (error) {

      console.log(error);

    }
  }

  // RENDER PRODUCT 
  // FILTER CATEGORY 
  function filterCategory(category, event) {

    activeCategory = category;

    let filteredProducts;

    if (category === "all") {

      filteredProducts = allProducts;

    } else {

      filteredProducts =
      allProducts.filter((item) => {

        return item.category === category;

      });

    }

    renderProducts(filteredProducts);

    // ACTIVE BUTTON
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => {

        btn.classList.remove(
          "bg-pink-500",
          "text-white"
        );

        btn.classList.add(
          "bg-white",
          "text-pink-900"
        );

      });

    event.target.classList.remove(
      "bg-white",
      "text-pink-900"
    );

    event.target.classList.add(
      "bg-pink-500",
      "text-white"
    );
  }
  function renderProducts(products) {

    let hasil = `

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    `;

    products.forEach((element) => {

      hasil += `

      <div class="bg-[#FFE8E8] rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">

        <!-- IMAGE -->
        <div class="bg-white h-64 flex items-center justify-center p-6">

          <img 
            src="${element.image}" 
            class="h-44 object-contain hover:scale-105 transition duration-300"
          >

        </div>

        <!-- CONTENT -->
        <div class="p-5 flex flex-col flex-1">

          <!-- TITLE -->
          <h2 class="text-lg font-semibold text-gray-800 leading-snug h-[56px] overflow-hidden">
            ${element.title.substring(0, 45)}...
          </h2>

          <!-- CATEGORY -->
          <p class="text-sm text-pink-500 mt-2 capitalize">
            ${element.category}
          </p>

          <!-- PRICE -->
          <p class="text-2xl font-bold text-gray-900 mt-4">
            Rp ${(element.price * 16000).toLocaleString("id-ID")}
          </p>

          <!-- BUTTON -->
          <div class="flex gap-3 mt-auto pt-6">

            <!-- DETAIL -->
            <a
              href="detail.html?id=${element.id}"
              class="flex-1 text-center bg-[#D9CFC7] hover:bg-[#c9bdb5] text-gray-800 py-2 rounded-xl transition duration-300"
            >
              Detail
            </a>

            <!-- ADD CART -->
            <button
              onclick="addToCart(${element.id})"
              class="flex-1 bg-[#E6A4B4] hover:bg-pink-500 text-white py-2 rounded-xl transition duration-300"
            >
              + Keranjang
            </button>

          </div>

        </div>

      </div>

      `;
    });

    hasil += `</div>`;

    productContainer.innerHTML = hasil;
  }

  // ADD TO CART
function addToCart(id) {

  // Ambil produk dari state
  const product =
    allProducts.find((item) => item.id === id);

  // Ambil cart dari localStorage
  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah produk sudah ada
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

  // Simpan ke localStorage
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  // Update badge
  updateCartBadge();

  alert("Product Added To Cart");
}


// UPDATE CART BADGE
function updateCartBadge() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalItem =
    cart.reduce((total, item) => {

      return total + item.quantity;

    }, 0);

  const badge =
    document.getElementById("cartBadge");

  if (!badge) return;

  // Kalau kosong sembunyikan badge
  if (totalItem === 0) {

    badge.classList.add("hidden");

  } else {

    badge.classList.remove("hidden");
    badge.innerText = totalItem;

  }
}

// SEARCH PRODUCT
document
  .getElementById("searchInput")
  .addEventListener("input", function () {

    const keyword =
      this.value.toLowerCase();

    const filteredProducts =
      allProducts.filter((item) => {

        return item.title
          .toLowerCase()
          .includes(keyword);

      });

    renderProducts(filteredProducts);

  });

// INIT
getProducts();
updateCartBadge();