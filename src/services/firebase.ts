// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyColu08r-bcH8E9zedhtpSFH0SsZNA7tlg",
  authDomain: "reactchat-28657.firebaseapp.com",
  projectId: "reactchat-28657",
  storageBucket: "reactchat-28657.appspot.com",
  messagingSenderId: "338582167056",
  appId: "1:338582167056:web:778ccbbe89a9a364223495",
  measurementId: "G-D21TW4051N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);

