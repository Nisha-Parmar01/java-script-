// loginsystem
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
    });
function loginsystem(event){
    event.preventDefault();

    let username = document.getElementById('username').value; 
    let password = document.getElementById('password').value;

    var users = JSON.parse(localStorage.getItem('users'));

    let c = {username, password}; 

    if(users == undefined){
        users = [];
    }
    users.push(c);

    localStorage.setItem('users', JSON.stringify(users));

    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var token = [];
    for(var i = 0; i <= 60; i++){
        let no = Math.floor(Math.random() * 62); 
        token.push(string[no]);
    }
    localStorage.setItem('token', token.join(''));  

    localStorage.setItem('isLoggedIn', "true"); 

    let pending = localStorage.getItem("pendingCartProduct");
    if (pending) {
        let product = JSON.parse(pending);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let exists = cart.find(i => i.id === product.id);
        if (!exists) {
            product.qty = 1;
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        localStorage.removeItem("pendingCartProduct");
    }


    let redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect; 


}


   



