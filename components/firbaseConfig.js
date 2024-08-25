import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEKUcqWSJzhF3s53bk4SccVUQUxYhomtw",
  authDomain: "bajafirebase.firebaseapp.com",
  databaseURL: "https://bajafirebase-default-rtdb.firebaseio.com/",
  projectId: "bajafirebase",
  storageBucket: "bajafirebase.appspot.com",
  messagingSenderId: "194551742091",
  appId: "1:194551742091:web:695c8672bc1583eab3de8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
