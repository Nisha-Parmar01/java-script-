function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart Data:", cart);

  let cartBody = document.getElementById("cartBody");
  let grandTotalEl = document.getElementById("grandTotal");

  if (!cartBody || !grandTotalEl) {
    console.error("Element not found");
    return;
  }

  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="6">Cart is empty</td></tr>`;
    grandTotalEl.innerText = "0";
    return;
  }

  cartBody.innerHTML = "";
  let grandTotal = 0;

 cart.forEach((item, index) => {
  let price = item.price || 0;
  let total = price * item.qty;
  grandTotal += total;

  cartBody.innerHTML += `
    <tr>
      <td><img src="${item.image}" width="60"></td>
      <td>${item.title}</td>
      <td>
        <input type="number" min="1" value="${item.qty}"
          onchange="updateQty(${index}, this.value)">
      </td>
      <td>₹${price.toFixed(2)}</td>
      <td>₹${total.toFixed(2)}</td>
      <td>
        <button onclick="removeItem(${index})">X</button>
      </td>
    </tr>
  `;
});

  grandTotalEl.innerText = grandTotal.toFixed(2);
}

function updateQty(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (newQty < 1) newQty = 1; 

  cart[index].qty = Number(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();        
  updateCartCount();   
}


function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();       
  updateCartCount();   
}

document.addEventListener("DOMContentLoaded", function () {
  renderCart();
});
