import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMWtNqS5aMhd2jnaTMTt0bMf3sQMu-HAA",
  authDomain: "password-manager-5a32a.firebaseapp.com",
  projectId: "password-manager-5a32a",
  storageBucket: "password-manager-5a32a.appspot.com",
  messagingSenderId: "76400488085",
  appId: "1:76400488085:web:9293466d9d7f223d91b59c",
  measurementId: "G-7RM96GCBYY",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(firebaseApp);
export const provider = new GoogleAuthProvider();
export const firebaseAuth = getAuth(firebaseApp);
//connectAuthEmulator(auth, "http://localhost:9099");

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    console.log(`User is signed in as ${user.email}`);
  }``
});
