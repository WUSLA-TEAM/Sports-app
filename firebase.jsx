// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvWO-dR8hG98vZf25nFotwj3HC_h9eDps",
  authDomain: "sportsapp-30ea1.firebaseapp.com",
  projectId: "sportsapp-30ea1",
  storageBucket: "sportsapp-30ea1.appspot.com",
  messagingSenderId: "545734657516",
  appId: "1:545734657516:web:6dad9f0beadf72d6f6ecc9",
  measurementId: "G-CRV4PJTMV2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
