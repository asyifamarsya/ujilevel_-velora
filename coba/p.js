const url = "https://fakestoreapi.com/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => {

    let hasil = `

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    `;

    data.forEach((element) => {

      hasil += `
<script>
      function toggleCart() {
        const cart = document.getElementById("sidebar-cart");
        const overlay = document.getElementById("cart-overlay");

        cart.classList.toggle("translate-x-full");
        overlay.classList.toggle("hidden");
      }
    </script>
    `;
    });

    hasil += `</div>`;

    document.getElementById("p").innerHTML = hasil;
  })