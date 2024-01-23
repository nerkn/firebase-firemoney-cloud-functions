"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireDb = exports.fire = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase-admin/app");
exports.fire = (0, app_1.initializeApp)();
const firestore_1 = require("firebase-admin/firestore");
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
exports.fireDb = (0, firestore_1.getFirestore)(exports.fire);
//export const auth = getAuth(fire);
//# sourceMappingURL=firebase.js.map