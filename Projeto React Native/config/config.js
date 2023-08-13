// Import the functions you need from the SDKs you need
import Firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKscI4IF-C4o7bKNJbb9M7QQJSKBBNwjw",
  authDomain: "proj-474b6.firebaseapp.com",
  projectId: "proj-474b6",
  storageBucket: "proj-474b6.appspot.com",
  messagingSenderId: "569489320506",
  appId: "1:569489320506:web:22928203b5963574696303"
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();