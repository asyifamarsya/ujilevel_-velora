// AMBIL ID DARI URL
const params = new URLSearchParams(window.location.search);

const id = params.get("id") || 1;

// FETCH DETAIL PRODUCT
fetch(`https://fakestoreapi.com/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    let detail = `

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <!-- LEFT IMAGE -->
        <div class="flex justify-center">

          <div class="bg-[#FFE8E8] rounded-3xl p-8 shadow-md">

            <img
              src="${product.image}"
              class="h-[320px] object-contain"
            >

          </div>

        </div>

        <!-- RIGHT CONTENT -->
        <div>

          <!-- CATEGORY -->
          <p class="text-pink-500 font-semibold text-sm uppercase tracking-wide">
            ${product.category}
          </p>

          <!-- TITLE -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mt-3">
            ${product.title}
          </h1>

          <!-- RATING -->
          <div class="flex items-center gap-3 mt-5">

            <div class="flex gap-1 text-yellow-400 text-2xl">
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
          </div>

            <span class="text-gray-500 text-sm">
              (${product.rating.count} ratings)
            </span>

            <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
              In Stock
            </span>

          </div>

          <!-- PRICE -->
          <h2 class="text-4xl font-bold text-gray-900 mt-6">
            Rp ${(product.price * 16000).toLocaleString("id-ID")}
          </h2>

          <!-- DESCRIPTION -->
          <p class="text-gray-600 leading-relaxed mt-6">
            ${product.description}
          </p>

          <!-- QUANTITY -->
          <div class="mt-8">

            <p class="text-lg font-bold mb-4">
              Quantity
            </p>

            <div class="flex items-center w-fit">

              <!-- MINUS -->
              <button
                id="minusBtn"
                class="w-12 h-12 bg-gray-200 text-xl font-bold rounded-l-xl hover:bg-gray-300 transition"
              >
                -
              </button>

              <!-- QTY -->
              <div
                id="qty"
                class="w-14 h-12 flex items-center justify-center bg-gray-100 text-lg font-semibold"
              >
                1
              </div>

              <!-- PLUS -->
              <button
                id="plusBtn"
                class="w-12 h-12 bg-gray-200 text-xl font-bold rounded-r-xl hover:bg-gray-300 transition"
              >
                +
              </button>

            </div>

          </div>

          <!-- BUTTON -->
          <div class="flex gap-4 mt-10">

            <!-- BUY -->
            <button
              onclick="buyNow(${product.id})"
              class="flex-1 py-4 bg-[#D9CFC7] hover:bg-[#c9bdb5] text-white text-lg font-bold rounded-2xl transition"
            >
              Buy Now
            </button>

            <!-- ADD TO CART -->
            <button
              onclick="addToCart(${product.id})"
              class="flex-1 py-4 bg-[#E6A4B4] hover:bg-pink-500 text-white text-lg font-bold rounded-2xl transition"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    `;

    document.getElementById("detail").innerHTML = detail;

    // QUANTITY BUTTON
    let quantity = 1;

    const qty = document.getElementById("qty");

    const plusBtn = document.getElementById("plusBtn");

    const minusBtn = document.getElementById("minusBtn");

    // PLUS
    plusBtn.addEventListener("click", () => {
      quantity++;

      qty.innerText = quantity;
    });

    // MINUS
    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;

        qty.innerText = quantity;
      }
    });
  });

// ADD TO CART
function addToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((item) => item.id === product.id);

      const quantity = parseInt(document.getElementById("qty").innerText);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          ...product,
          quantity: quantity,
          selected: false,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Product Added To Cart");
    });
}

// BUY NOW
function buyNow(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      const quantity = parseInt(document.getElementById("qty").innerText);

      const checkoutItem = [
        {
          ...product,
          quantity: quantity,
        },
      ];

      localStorage.setItem("checkoutItems", JSON.stringify(checkoutItem));

      window.location.href = "/view/payment.html";
    });
}

// FETCH POPULAR PRODUCT
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    let cards = "";

    products.slice(0, 4).forEach((item) => {
      cards += `

        <div class="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300">

          <!-- IMAGE -->
          <div class="bg-gray-100 rounded-2xl p-6 flex justify-center">

            <img
              src="${item.image}"
              class="h-52 object-contain"
            >

          </div>

          <!-- CONTENT -->
          <div class="mt-6">

            <!-- CATEGORY -->
            <p class="text-pink-500 text-sm uppercase">
              ${item.category}
            </p>

            <!-- TITLE -->
            <h3 class="text-xl font-bold mt-2 line-clamp-2 min-h-[60px]">
              ${item.title}
            </h3>

            <!-- RATING -->
            <div class="flex items-center gap-2 mt-4">

              <div class="flex gap-1 text-yellow-400 text-2xl">

              <i class='bx bxs-star'></i>
              </div>

              <span class="text-gray-500">
                ${item.rating.rate}
              </span>

            </div>

            <!-- PRICE -->
            <div class="flex items-center justify-between mt-6">

              <p class="text-2xl font-bold">
                Rp ${(item.price * 16000).toLocaleString("id-ID")}
              </p>

              <a href="?id=${item.id}">

                <button
                  class="w-12 h-12 rounded-full bg-[#E6A4B4] text-white hover:scale-110 transition"
                >
                  →
                </button>

              </a>

            </div>

          </div>

        </div>

      `;
    });

    document.getElementById("popular").innerHTML = cards;
  });
