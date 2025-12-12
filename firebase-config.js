// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get them from: https://console.firebase.google.com/

const firebaseConfig = {
  apiKey: "AIzaSyDRKZLIGPdnwmj3LiygP04nVDah2MM0p2c",
  authDomain: "voting-system-bb0db.firebaseapp.com",
  projectId: "voting-system-bb0db",
  storageBucket: "voting-system-bb0db.firebasestorage.app",
  messagingSenderId: "1039218846972",
  appId: "1:1039218846972:web:dee101dc18029106d77b79",
  measurementId: "G-GPR2S3YXSP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

