// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCwPiphOzA_geUoQHbI-97XkV1C_IZyLio",

  authDomain: "kangamschool.firebaseapp.com",

  projectId: "kangamschool",

  storageBucket: "kangamschool.appspot.com",
  databaseURL: "https://kangamschool-default-rtdb.firebaseio.com",

  messagingSenderId: "479471655669",

  appId: "1:479471655669:web:0fe87cd2051ac78df043bc",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
export { db };
