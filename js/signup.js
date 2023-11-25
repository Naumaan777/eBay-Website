import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth();

const btn = document.getElementById('signBtn')
btn.addEventListener('click', () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value  
    const name = document.getElementById('name').value  
    const country = document.getElementById('country').value  
    const phone = document.getElementById('phone').value  
    const address = document.getElementById('address').value  

    if (!name || !email || !password || !country || !phone || !address) {
      Swal.fire({
        text: `Please fill all the fields`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return; // Return early if any field is missing
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        try {
            const docRef = await setDoc(doc(db, "users", user.uid), {
              name,
              country,
              phone,
              address,
              email,
              uid: user.uid
            });
            // console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          Swal.fire({
            text: `User Signed Up !`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(()=>{
            window.location.href = 'login.html'
          }
          )
        // localStorage.setItem('Name', name)
        // localStorage.setItem('Country', country)
        // localStorage.setItem('Phone', phone)
        // localStorage.setItem('Address', address)
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          Swal.fire({
            text: `Invalid Email Address`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        Swal.fire({
          text: `Password Should Be Atleast 6 Characters Long`,
          icon: 'error',
          confirmButtonText: 'OK'
      });
        }
        else if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          Swal.fire({
            text: `This email Is Already Taken`,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        }
        else {
          console.log(errorMessage);
        }
    });
})