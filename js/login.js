import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

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

const btn = document.getElementById('loginBtn')
btn.addEventListener('click', () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            if (user) {
                if (!user.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            Swal.fire({
                                title: "Verify Your ID",
                                text: `Verification Email Sent to ${user.email}`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                              })
                        });
                } else {
                    Swal.fire({
                        text: `User Signed Up !`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                      }).then(()=>{
                          window.location.href = 'index.html'
                          localStorage.setItem('logged', true)
                        });
                    // ...
                }
                const uid = user.uid;
                // ...
            }
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
              else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
                Swal.fire({
                  text: `This email Is Not Signed Up`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
              else if (errorMessage === "Firebase: Error (auth/missing-password).") {
                Swal.fire({
                  text: `Enter Password First`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
              else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                Swal.fire({
                  text: `Wrong Password Entered`,
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
              }
        });
})

const forgot = document.getElementById('forgot')
forgot.addEventListener('click', () => {
    const email = document.getElementById('email').value
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            Swal.fire({
                text: `You can reset your password email sent on ${email}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            console.log(email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
})

function checkAdmin(){
    Swal.fire({
        title: 'Enter Key To Go To Dashboard',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Login To Dashboard',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            if(result.value == "helloAmAdmin123"){
                Swal.fire({
                    icon: "success",
                    title: `Successfully Logged In To Dashboard`,
                    text: "Admin Approved",
                    showConfirmButton: false
                }).then(
                    setTimeout(()=>{
                        location.replace('./admin.html')
                    },2000)
                )

            }
            else{                
                Swal.fire({
                    icon: "error",
                    title: `Wrong Key Entered`,
                    text: "Admin Dis-Approved"
                })
            }
        }
    })
}
window.checkAdmin = checkAdmin