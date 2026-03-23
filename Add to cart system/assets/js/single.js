let productid = JSON.parse(localStorage.getItem('productid'));

if (!productid) {
  alert("No product selected!");
  window.location = "index.html";
}

console.log("Product ID:", productid);

fetch('https://fakestoreapi.com/products/' + productid)
.then(res => res.json())
.then(singleproduct => {

  document.getElementById('image').src = singleproduct.image;
  document.getElementById('title').innerText = singleproduct.title;

  let oldPrice = (singleproduct.price + 200).toFixed(0);
  let discount = Math.floor(((oldPrice - singleproduct.price) / oldPrice) * 100);

  document.getElementById("price").innerText = "₹" + singleproduct.price;
  document.getElementById("oldPrice").innerText = "₹" + oldPrice;
  document.getElementById("discount").innerText = discount + "% OFF";

  document.getElementById("rating").innerText =
    singleproduct.rating.rate + " ⭐ (" + singleproduct.rating.count + " reviews)";

  document.getElementById("category").innerText = singleproduct.category;
  document.getElementById("description").innerText = singleproduct.description;

  document.getElementById("addCartBtn").onclick = () => {
    let qty = Number(document.getElementById("qty").value);
    addToCart(singleproduct.id, qty);
  };

})
.catch(err => console.log(err));