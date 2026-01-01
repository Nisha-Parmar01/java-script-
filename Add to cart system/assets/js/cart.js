function addToCart(productId) {

  let token = localStorage.getItem("token");
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!token || isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", window.location.href);
    localStorage.setItem("pendingCartProduct", productId);
    window.location.href = "loginsystem.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {

      let exists = cart.find(item => item.id === product.id);

      if (exists) {
        exists.qty += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
}


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.getElementById("usercart");

  let totalQty = 0;
  cart.forEach(item => totalQty += item.qty);

  if (badge) badge.innerText = totalQty;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
