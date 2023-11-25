import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.id == uid) {
                console.log(`${doc.id} => ${JSON.stringify(doc.data().name)}`);
                document.getElementById('name').value = doc.data().name
                document.getElementById('country').value = doc.data().country
                document.getElementById('phone').value = doc.data().phone
                document.getElementById('address').value = doc.data().address
            }
        });
        // ...
    } else {
        // User is signed out
        // ...
    }
});


const btnAccount = document.getElementById('BtnAccount')
btnAccount.addEventListener('click', async () => {
    const name = document.getElementById('name').value  
    const country = document.getElementById('country').value  
    const phone = document.getElementById('phone').value  
    const address = document.getElementById('address').value
    // localStorage.setItem('Name', document.getElementById('name').value)
    // localStorage.setItem('Country', document.getElementById('country').value)
    // localStorage.setItem('Phone', document.getElementById('phone').value)
    // localStorage.setItem('Address', document.getElementById('address').value)
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const washingtonRef = doc(db, "users", uid);
            await updateDoc(washingtonRef, {
                name,
                country,
                phone,
                address
            });
            alert('Account details updated')
        }
    });
    // ...
})




const btn = document.getElementById("logout");
btn.addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Logged out Successfully.");
        localStorage.setItem('logged', false)
        window.location.href = 'index.html';

        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        alert('Cant logout The Account')
    });
})

function a() {
    const cartPseudo = document.getElementById('cart');
    const productInCart = localStorage.getItem('products');
    const parsedProducts = JSON.parse(productInCart) || []; // Parse the string as JSON, or use an empty array if null or undefined
    const productCount = parsedProducts.length;
    cartPseudo.setAttribute('data-value', productCount);
  }
  
  setInterval(a, 1000);