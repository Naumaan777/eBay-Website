import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc,doc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

async function getUserCountAndDisplay() {
    try {
        // Initialize Firestore

        // Reference to the "users" collection
        const usersCollectionRef = collection(db, 'users');

        // Get the documents in the collection
        const querySnapshot = await getDocs(usersCollectionRef);

        // Get the number of documents (users) in the collection
        const numberOfUsers = querySnapshot.size;

        // Display the number of users in the <p> tag with ID "user"
        const userCountElement = document.getElementById('user');
        userCountElement.innerText = `${numberOfUsers} +`;
    } catch (e) {
        console.error('Error getting user count:', e);
        // Display an error message in case of an error
        const userCountElement = document.getElementById('user');
        userCountElement.innerText = 'Error fetching user count';
    }
}

// Call the function to get the number of users and display it
getUserCountAndDisplay();

async function getOrderSumAndDisplay() {
    try {

        // Reference to the "orders" collection
        const ordersCollectionRef = collection(db, 'orders');

        // Get the documents in the collection
        const querySnapshot = await getDocs(ordersCollectionRef);

        // Initialize a variable to store the total order sum
        let totalOrderSum = 0;

        // Loop through each document in the "orders" collection
        querySnapshot.forEach((doc) => {
            // Get the price variable from the document data
            const price = doc.data().price;

            // Parse the price to a numerical value (assuming it's in the format "$ xxx.xx")
            const priceNumber = parseFloat(price.replace('$', '').replace(',', ''));

            // Add the price of this order to the total order sum
            totalOrderSum += priceNumber;
        });

        // Display the total order sum in the <p> tag with ID "orderSum"
        const orderSumElement = document.getElementById('money');
        orderSumElement.innerText = `$ ${totalOrderSum.toFixed(2)}`;
    } catch (e) {
        console.error('Error getting order sum:', e);
        // Display an error message in case of an error
        console.log(e);
    }
}

// Call the function to get the order sum and display it
getOrderSumAndDisplay();


const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
    document.getElementById('all').innerHTML += "<li>"+doc.data().name+"</li>"
});
const querySnapshot1 = await getDocs(collection(db, "orders"));
querySnapshot1.forEach((doc) => {
    document.getElementById('all1').innerHTML += "<li>"+doc.data().name+"</li>"
});
const querySnapshot2 = await getDocs(collection(db, "feedback"));
querySnapshot2.forEach((doc) => {
    document.getElementById('carousle').innerHTML += `<div class="carInn">
    <h1>${doc.data().sentby}</h1>
    <p>${doc.data().feedBack}</p>
</div>`
});

async function getOrderDataForScatterChart() {
    try {
      // Initialize Firestore
  
      // Reference to the "orders" collection
      const ordersCollectionRef = collection(db, 'orders');
  
      // Get the documents in the collection
      const querySnapshot = await getDocs(ordersCollectionRef);
  
      // Initialize arrays to store the scatter plot data
      const scatterData = [];
  
      // Loop through each document in the "orders" collection
      querySnapshot.forEach((doc) => {
        // Get the x-axis (e.g., order ID) and y-axis (e.g., revenue) data for each data point
        const orderId = doc.data().name;
        const price = doc.data().price;
        const revenue = parseFloat(price.replace('$', '').replace(',', ''));
  
        // Add the data point to the scatterData array
        scatterData.push({ x: orderId, y: revenue });
      });
  
      console.log('Scatter Data:', scatterData);
  
      // Create a new Chart.js chart as a scatter chart
      const ctx = document.getElementById('scatterChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Most Revenue Generated By Products',
              data: scatterData,
              backgroundColor: '#aa1e22',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Product Name',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Revenue',
              },
            },
          },
        },
      });
    } catch (e) {
      console.error('Error getting order data for scatter chart:', e);
    }
  }
  
  // Call the function to fetch order data and create the scatter chart
  getOrderDataForScatterChart();
  
async function getOrderDataForScatterChart2() {
    try {
      // Initialize Firestore
  
      // Reference to the "orders" collection
      const ordersCollectionRef = collection(db, 'orders');
  
      // Get the documents in the collection
      const querySnapshot = await getDocs(ordersCollectionRef);
  
      // Initialize arrays to store the scatter plot data
      const scatterData = [];
  
      // Loop through each document in the "orders" collection
      querySnapshot.forEach((doc) => {
        // Get the x-axis (e.g., order ID) and y-axis (e.g., revenue) data for each data point
        const orderId = doc.data().name;
        const revenue = doc.data().quan;
  
        // Add the data point to the scatterData array
        scatterData.push({ x: orderId, y: revenue });
      });
  
      console.log('Scatter Data:', scatterData);
  
      // Create a new Chart.js chart as a scatter chart
      const ctx = document.getElementById('scatterChart2').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'Most No Of Products Purchased',
              data: scatterData,
              backgroundColor: '#aa1e22',
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Name of Product',
              },
            },
            y: {
              title: {
                display: true,
                text: 'No Of Orders',
              },
            },
          },
        },
      });
    } catch (e) {
      console.error('Error getting order data for scatter chart:', e);
    }
  }
  
  // Call the function to fetch order data and create the scatter chart
  getOrderDataForScatterChart2();
  