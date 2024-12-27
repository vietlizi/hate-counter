// Import necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration (use your config from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBw2RWEDVqK0KM5IgM_d-c-bGRHNbLOO1Q",
  authDomain: "marriage-wishes-8e687.firebaseapp.com",
  projectId: "marriage-wishes-8e687",
  storageBucket: "marriage-wishes-8e687.firebasestorage.app",
  messagingSenderId: "378539803932",
  appId: "1:378539803932:web:272d5685c41bc71a4226d9",
  measurementId: "G-80L6RPJKJ7"
};

// Initialize Firebase app and other services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// DOM elements
const loveSymbol = document.getElementById('loveSymbol');
const wishBox = document.getElementById('wishBox');
const wishForm = document.getElementById('wishForm');
const flowers = document.getElementById('flowers');
const wishesList = document.getElementById('wishesList');

// Authentication: Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("User signed in anonymously.");
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

// Function to load and display wishes from Firestore
const loadWishes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'wishes'));
    const wishes = querySnapshot.docs.map(doc => doc.data());
    wishesList.innerHTML = wishes.map(wish => `<li><strong>${wish.name}</strong>: ${wish.wish}</li>`).join('');
  } catch (error) {
    console.error("Error loading wishes:", error);
  }
};

// Initial loading of wishes
loadWishes();

// Automatically display the wish box when the page loads
wishBox.style.display = 'block';

// Handle form submission to add wish to Firestore
wishForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const wish = document.getElementById('wish').value;

  if (name && wish) {
    try {
      // Add new wish to Firestore
      await addDoc(collection(db, 'wishes'), {
        name: name,
        wish: wish,
        createdAt: new Date().toISOString()
      });

      showFlowers(); // Show flowers after submission
      wishForm.reset(); // Reset the form

      loadWishes(); // Reload wishes after adding a new one
    } catch (error) {
      console.error("Error submitting wish:", error);
    }
  }
});

// Show falling flowers animation after a new wish is submitted
const showFlowers = () => {
  flowers.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = `${Math.random() * 100}vw`;
    flower.style.animationDuration = `${Math.random() * 2 + 3}s`;
    flowers.appendChild(flower);
  }

  // Clear flowers after animation
  setTimeout(() => {
    flowers.innerHTML = '';
  }, 3000);
};
