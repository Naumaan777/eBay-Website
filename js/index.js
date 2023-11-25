import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzZTOJPWdD_1-aA73_WJyxYOEjthJwxP4",
    authDomain: "ecommerce-website-3d42f.firebaseapp.com",
    projectId: "ecommerce-website-3d42f",
    storageBucket: "ecommerce-website-3d42f.appspot.com",
    messagingSenderId: "952174919940",
    appId: "1:952174919940:web:c7bcfc4d3663592dc7d051",
    measurementId: "G-X9HDJQ3PS0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
// var localname = localStorage.getItem('Name')
// if (localname && localname.length > 10) {
//     localname = localname.slice(0, 8) + "..."
// }
// else {
//     localname = localname
// }
if (localStorage.getItem('logged') == 'true') {
    // document.getElementById('na').innerText = localname || "My Account";
    document.getElementById('n').setAttribute('onclick', 'window.location.href="myDetails.html"')
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (doc.id == uid) {
                    console.log(`${doc.id} => ${JSON.stringify(doc.data().name)}`);
                    if (doc.data().name.length > 10) {
                        document.getElementById('na').innerHTML = (doc.data().name).slice(0, 8) + " ..."
                    }
                    else {
                        document.getElementById('na').innerHTML = doc.data().name
                    }
                }
            });
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}
else {
    document.getElementById('na').innerText = "My Account"
    document.getElementById('n').setAttribute('onclick', 'window.location.href="login.html"')
}





var p1 = document.getElementById('p1')
var p2 = document.getElementById('p2')
var p3 = document.getElementById('p3')
var p4 = document.getElementById('p4')
var p5 = document.getElementById('p5')
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => {
        var rForP5 = Math.floor(Math.random() * res.products.length)
        rForP5 = JSON.parse(rForP5)
        var rForP1 = Math.floor(Math.random() * res.products.length - 10)
        rForP1 = JSON.parse(rForP5)
        console.log(res.products);
        console.log(rForP5);
        for (var i = rForP1; i < rForP1 + 11; i++) {
            p1.innerHTML += `
            <div class="mainProduct">
            <div class="img">
            <img
                src="${res.products[i].thumbnail}">
            <span>NEW</span>
            </div>
            <p class="detailMain"><b>${(res.products[i].title).slice(0, 23) + "..."}</b> <hr/ style='margin:10px 0; background-color: white; opacity: 0.4'> <p>${(res.products[i].description).slice(0, 50) + ' ...'}</p></p>
            <div class="price">
            <h1>$ ${((res.products[i].price) * (res.products[i].discountPercentage) / 100).toFixed(3)}</h1><small>$ ${res.products[i].price}</small>
            </div>
            <button onclick="product(${i})">ORDER NOW</button>
                         </div>
            `
        }
        for (var i = 0; i < res.products.length; i++) {
            if (res.products[i].category == "laptops") {
                p2.innerHTML += `
            <div class="mainProduct oo">
            <div class="img">
            <img
                src="${res.products[i].thumbnail}">
            <span>NEW</span>
            </div>
            <p class="detailMain"><b>${(res.products[i].title).slice(0, 23) + "..."}</b> <hr/ style='margin:10px 0; background-color: white; opacity: 0.4'> <p>${(res.products[i].description).slice(0, 50) + ' ...'}</p></p>
            <div class="price">
            <h1>$ ${((res.products[i].price) * (res.products[i].discountPercentage) / 100).toFixed(3)}</h1><small>$ ${res.products[i].price}</small>
            </div>
            <button onclick="product(${i})">ORDER NOW</button>
                             </div>
            `
            }
        }
        for (var i = 0; i < res.products.length; i++) {
            if (res.products[i].category == "smartphones")
                p3.innerHTML += `
            <div class="mainProduct tt">
            <div class="img">
            <img
                src="${res.products[i].thumbnail}">
            <span>NEW</span>
            </div>
            <p class="detailMain"><b>${(res.products[i].title).slice(0, 23) + "..."}</b> <hr/ style='margin:10px 0; background-color: white; opacity: 0.4'> <p>${(res.products[i].description).slice(0, 50) + ' ...'}</p></p>
            <div class="price">
            <h1>$ ${((res.products[i].price) * (res.products[i].discountPercentage) / 100).toFixed(3)}</h1><small>$ ${res.products[i].price}</small>
            </div>
            <button onclick="product(${i})">ORDER NOW</button>
                         </div>
            `
        }
        for (var i = 0; i < res.products.length; i++) {
            if (res.products[i].category == "home-decoration" || res.products[i].category == "skincare")
                p4.innerHTML += `
            <div class="mainProduct ff">
            <div class="img">
            <img
                src="${res.products[i].thumbnail}">
            <span>NEW</span>
            </div>
            <p class="detailMain"><b>${(res.products[i].title).slice(0, 23) + "..."}</b> <hr/ style='margin:10px 0; background-color: white; opacity: 0.4'> <p>${(res.products[i].description).slice(0, 50) + ' ...'}</p></p>
            <div class="price">
            <h1>$ ${((res.products[i].price) * (res.products[i].discountPercentage) / 100).toFixed(3)}</h1><small>$ ${res.products[i].price}</small>
            </div>
            <button onclick="product(${i})">ORDER NOW</button>
            </div>
            `
        }
        p5.innerHTML = `
        <div class="mainProduct" style="padding: 0;">
        <div class="img" style='width: 100%'>
        <img src="${res.products[rForP5].thumbnail}" style="height: auto; object-fit: contain; width: 100%;">
        <span style="width: auto; height: auto; padding: 5px 10px; border-radius: 0px; right: -30px">Featured</span>
        </div>
        <p class="detailMain"><b>${(res.products[rForP5].title).slice(0, 23) + "..."}</b> <hr/ style='margin:10px 0; background-color: white; opacity: 0.4'> <p>${(res.products[rForP5].description).slice(0, 50) + ' ...'}</p></p>
        <div class="price" style="margin-top: 30px;">
        <h1>$ ${((res.products[rForP5].price) * (res.products[rForP5].discountPercentage) / 100).toFixed(3)}</h1><small>$ ${res.products[rForP5].price}</small>
        </div>
        <button onclick="product(${rForP5})">ORDER NOW</button>
                        </div>
                        `
        function product(index) {
            if (localStorage.getItem('logged') == "true") {

                var currentProduct = res.products[index]
                currentProduct = JSON.stringify(currentProduct)
                console.log(currentProduct);
                localStorage.setItem('Current Product', currentProduct)
                window.location.href = "productpage.html"
            }
            else {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        location.replace('login.html')
                    }
                })
            }
        }
        window.product = product
    }
    );

window.addEventListener('scroll', function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2000) {
        document.getElementById('i').style.opacity = '1';
        document.getElementById('i').style.visibility = 'visible';
        document.getElementById('ii').style.bottom = '20px';
        document.getElementById('ii').style.transform = 'rotate(360deg)';
    }
});



document.getElementById('iii').addEventListener('click', () => {
    document.getElementById('innerii').classList.toggle('open')
})
document.getElementById('-').addEventListener('click', () => {
    document.getElementById('innerii').classList.toggle('open')
})
var open = false
document.getElementById('+').addEventListener('click', () => {
    if (!open) {
        document.getElementById('u').style.visibility = "visible"
        document.getElementById('u').style.opacity = "1"
        open = true
    }
    else {
        document.getElementById('u').style.visibility = "hidden"
        document.getElementById('u').style.opacity = "0"
        open = false
    }
})

document.getElementById("chatBtn").addEventListener('click', () => {
    if (localStorage.getItem('logged') == "true") {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    if (doc.id == uid) {
                        console.log(`${doc.id} => ${JSON.stringify(doc.data().name)}`);
                        Swal.fire({
                            title: 'Submit your Feed Back',
                            input: 'text',
                            inputAttributes: {
                                autocapitalize: 'on'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Send FeedBack',
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading()
                        }).then(async(result) => {
                            if (result.isConfirmed) {
                                try {
                                    const docRef = await addDoc(collection(db, "feedback"), {
                                        sentby: doc.data().name,
                                        feedBack: result.value
                                    });
                                    console.log("Document written with ID: ", docRef.id);
                                } catch (e) {
                                    console.error("Error adding document: ", e);
                                }

                                Swal.fire({
                                    title: `${doc.data().name} Thanks For Your Feed Back`,
                                    text: "Feedback Submitted"
                                })
                            }
                        })
                    }
                });
                // ...
            }
        });
    }
    if (localStorage.getItem('logged') == "false") {
        Swal.fire({
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                location.replace('login.html')
            }
        })
    }
})
function a() {
    const cartPseudo = document.getElementById('cart');
    const productInCart = localStorage.getItem('products');
    const parsedProducts = JSON.parse(productInCart) || []; // Parse the string as JSON, or use an empty array if null or undefined
    const productCount = parsedProducts.length;
    cartPseudo.setAttribute('data-value', productCount);
}

setInterval(a, 1000);