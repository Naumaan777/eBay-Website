import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

async function appS() {
    try {
      // Get the product data from the local storage
      const productsData = JSON.parse(localStorage.getItem('products'));
  
      // Check if there are any products in the local storage
      if (!productsData || !Array.isArray(productsData)) {
        console.error('No products found in local storage or data is not an array.');
        return;
      }
  
      // Initialize Firestore
      const db = getFirestore(app);
  
      // Loop through each product in the local storage data
      for (const product of productsData) {
        // Extract the name and price of each product
        const { title, price, qaun } = product;
  
        // Create a new document in the "orders" collection with only the name and price
        await addDoc(collection(db, 'orders'), {
          name: title,
          price: price,
          quan: qaun
        });
      }
  
      console.log('All products added to Firestore successfully.');
    } catch (e) {
      console.error('Error adding products to Firestore: ', e);
    }
    Swal.fire({
        title: `Purchased !`,
        text: `Order sent to admin, Wait for its approval | Transaction Amount Deducted ${tp}`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
    setTimeout(() => {
        location.replace('./index.html')
        localStorage.removeItem('products')
    }, 2000)
  }
  
  // Make the appS function accessible from the global scope
  window.appS = appS;
  