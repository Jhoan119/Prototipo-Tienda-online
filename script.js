
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartIcon = document.querySelector('.bi-bag-heart');
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCart = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <strong>${item.name}</strong><br>
        Precio: $${item.price.toLocaleString()}<br>
        Cantidad: ${item.quantity}
      `;
      cartItemsContainer.appendChild(div);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toLocaleString()}`;
  }

  function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
    cartSidebar.classList.add("show");
  }

  const products = [
    { id: 1, name: "Camisa Colorida Abstracta", price: 79900 },
    { id: 2, name: "Camisa Floral Tropical", price: 74900 },
    { id: 3, name: "Camisa Floral Vintage", price: 69900 },
    { id: 4, name: "Camisa Blanca con Rosas", price: 64900 },
    { id: 5, name: "Suéter con camisa blanca", price: 82000 },
    { id: 6, name: "Pantalón corto", price: 82000 },
    { id: 7, name: "Blusa marrón", price: 82000 },
    { id: 8, name: "Camisa azul manga larga", price: 82000 },
    { id: 9, name: "Camisa cuadros manga larga", price: 82000 },
    { id: 10, name: "Camisa blanca manga larga", price: 82000 },
    { id: 11, name: "Camisa negra manga corta", price: 82000 },
    { id: 12, name: "Camisa Style Mach manga corta", price: 82000 },
  ];

  // Botón para añadir al carrito
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      const id = parseInt(button.getAttribute("data-id"));
      const product = products.find(p => p.id === id);
      if (product) {
        addToCart(product);
      }
    });
  });

  // Mostrar carrito al hacer clic en el ícono
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    updateCartDisplay();
    cartSidebar.classList.add("show");
  });

  // Cerrar carrito
  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("show");
  });

  // Mostrar el carrito si ya tiene productos
  if (cart.length > 0) {
    updateCartDisplay();
  }

  