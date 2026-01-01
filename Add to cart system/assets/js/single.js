let productid = Number(localStorage.getItem('productid'));

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
    addToCart(singleproduct.id);
  };

})
.catch(err => console.log(err));
