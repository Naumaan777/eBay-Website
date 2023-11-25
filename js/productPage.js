var products = getStoredProducts()
// addProduct()

function getStoredProducts() {
    var storedProducts = localStorage.getItem('products')
    return storedProducts ? JSON.parse(storedProducts) : [];
}

function updateStoredProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function add() {
    var title = document.getElementById('title')
    var img = document.getElementById('img')
    var price = document.getElementById('finalPrice')
    var quan = document.getElementById('quan')
    var cheatSheet = {
        title: title.innerHTML,
        img: img.src,
        price: price.innerHTML,
        qaun: quan.value
    }
    products.push(cheatSheet);
    // addProduct();
    updateStoredProducts();

    Swal.fire({
        title: `Product Added To Cart`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'View Cart'
    }).then((result) => {
/* Read more about isConfirmed, isDenied below */
if (result.isConfirmed) {
    let timerInterval
    Swal.fire({
      title: 'Redirecting',
      html: 'You will Redirected to cart after <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        location.replace('./cart.html' )
      }
    })
}
});

}

function a() {
    const cartPseudo = document.getElementById('cart');
    const productInCart = localStorage.getItem('products');
    const parsedProducts = JSON.parse(productInCart) || []; // Parse the string as JSON, or use an empty array if null or undefined
    const productCount = parsedProducts.length;
    cartPseudo.setAttribute('data-value', productCount);
  }
  
  setInterval(a, 1000);

















// function addExpense() {
//     document.getElementById("eL").innerHTML = "";
//     document.getElementById("eL").innerHTML = `<h1>Expense List</h1>`;

//     for (i = 0; i < expense.length; i++) {
//         document.getElementById("eL").innerHTML += `
//             <div class="list-item">
//                 <div class="expense-name">
//                     <h3>${expense[i].title}</h3>
//                 </div>
//                 <div class="expense-price">
//                     <p>${expense[i].cost}</p>
//                 </div>
//                 <div class="delete">
//                     <p><i class="fa fa-trash" onclick="removeExpense(${i})"></i></p>
//                 </div>
//             </div>
//         `;
//     }
// }

// function removeExpense(index) {
//     expense.splice(index, 1);
//     addExpense();
//     updateStoredExpenses();
// }