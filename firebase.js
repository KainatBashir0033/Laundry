
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo3t7xO5tp1aSvEFJ_2LqvrJvFmrTuhiY",
  authDomain: "laundry-app-20185.firebaseapp.com",
  projectId: "laundry-app-20185",
  storageBucket: "laundry-app-20185.appspot.com",
  messagingSenderId: "1070252092005",
  appId: "1:1070252092005:web:000a1f2265bddb3139f48c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export {auth,db};