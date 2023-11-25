var products = getStoredProducts()
addProduct()

function getStoredProducts() {
    var storedProducts = localStorage.getItem('products')
    return storedProducts ? JSON.parse(storedProducts) : [];
}
function updateStoredProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}
function addProduct() {
    document.getElementById("eL").innerHTML = "";
    if (products.length == 0) {
        document.getElementById('eL').innerHTML = "<h1 style='text-align: center; color: #ccc; font-weight: bolder; font-size: 22px; padding-bottom: 15px;'>Nothing To Show Here !</h1>"
        document.getElementById('checkOut').style.display = "none"
    }
    for (i = 0; i < products.length; i++) {
        document.getElementById("eL").innerHTML += `
        <li>
        <div class="aaa">
    <div>
    <img src="${products[i].img}">
    <p>${products[i].title.length > 30 ? `${products[i].title.slice(0, 30)}...` : products[i].title} </p>
    </div>
    <div class="aa">
    <p class="p">${products[i].price}</p>
    <i class="fa fa-trash" onclick="removeExpense(${i})"></i>
    </div>
    </div>
    <p class="q">${products[i].qaun}</p>
    </li>
    `;
    document.getElementById('checkOut').style.display = "flex"

    }
}

function removeExpense(index) {
    products.splice(index, 1);
    addProduct();
    updateStoredProducts();
}

function a() {
    const cartPseudo = document.getElementById('cart');
    const productInCart = localStorage.getItem('products');
    const parsedProducts = JSON.parse(productInCart) || []; // Parse the string as JSON, or use an empty array if null or undefined
    const productCount = parsedProducts.length;
    cartPseudo.setAttribute('data-value', productCount);
  }
  
  setInterval(a, 1000);