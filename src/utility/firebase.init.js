// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgq-kVA4j4akQjlC1qhIIZtEN1PjekQaw",
  authDomain: "medicamphub-c53a6.firebaseapp.com",
  projectId: "medicamphub-c53a6",
  storageBucket: "medicamphub-c53a6.firebasestorage.app",
  messagingSenderId: "514759184709",
  appId: "1:514759184709:web:069b0999a9948822fc6e2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
