import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8sUgd1GWivtyesnvxucGHUtK73j9D41k",
  authDomain: "waizly-test.firebaseapp.com",
  projectId: "waizly-test",
  storageBucket: "waizly-test.appspot.com",
  messagingSenderId: "670776291455",
  appId: "1:670776291455:web:05ab804d0b243b3d7e8f4a",
  measurementId: "G-57ZMSMK0L6",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
