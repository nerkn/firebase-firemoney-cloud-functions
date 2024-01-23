// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";

export const fire = initializeApp();
import { getFirestore } from "firebase-admin/firestore";
// Your web app's Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyC6RsZ0ZA8VrsM4VMhiDGfhOQLdZPfe97c",
  authDomain: "firemoney-2024.firebaseapp.com",
  projectId: "firemoney-2024",
  storageBucket: "firemoney-2024.appspot.com",
  messagingSenderId: "68035763513",
  appId: "1:68035763513:web:28593dc64a46766d9e5ce8",
};
*/

// Initialize Firebase
export const fireDb = getFirestore(fire);
//export const auth = getAuth(fire);
