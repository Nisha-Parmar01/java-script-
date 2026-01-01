
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        let html = "";

        data.map(p => {
            html += `
        <div class="product-card">
            <a href="singleobject.html" class="product-link" onclick="viewProduct(${p.id})">
                <div class="product-img-box">
                    <img src="${p.image}" alt="">
                    <span class="wishlist"><i class="fa-regular fa-heart"></i></span>
                </div>

                <div class="product-info">
                    <h5>${p.title.substring(0, 40)}...</h5>
                    <p class="price">₹${p.price}</p>
                </div>
            </a>

             <button class="add-cart-btn" onclick="addToCart(${p.id})">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
        </div>
        `;
        });

        document.getElementById("productdata").innerHTML = html;
    })
    .catch((err)=>{
        console.log("somthing rong!"+err);
    })

    function viewProduct(id){
        localStorage.setItem('productid',JSON.stringify(id));
        window.location='singleobject.html';
    }



