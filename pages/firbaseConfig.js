import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEKUcqWSJzhF3s53bk4SccVUQUxYhomtw",
  authDomain: "bajafirebase.firebaseapp.com",
  projectId: "bajafirebase",
  storageBucket: "bajafirebase.appspot.com",
  messagingSenderId: "194551742091",
  appId: "1:194551742091:web:695c8672bc1583eab3de8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
