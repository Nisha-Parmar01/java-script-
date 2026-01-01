document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartBody = document.getElementById("cartBody");
    let grandTotalEl = document.getElementById("grandTotal");

    cartBody.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
        let total = item.price * item.qty;
        grandTotal += total;

        cartBody.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="60"></td>
                <td>${item.title}</td>
                <td>
                    <input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)">
                </td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${total.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">X</button>
                </td>
            </tr>
        `;
    });

    grandTotalEl.innerText = grandTotal.toFixed(2);
});


function updateQty(index, newQty) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].qty = Number(newQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); 
}


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); 
}
