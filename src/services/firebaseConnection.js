
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBCk7fKP2mus1jjP1IF7umF2xm3b-JgjjE",
  authDomain: "devlinks-e9c4f.firebaseapp.com",
  projectId: "devlinks-e9c4f",
  storageBucket: "devlinks-e9c4f.appspot.com",
  messagingSenderId: "356022019023",
  appId: "1:356022019023:web:5e93a2f699148fe96b68ba",
  measurementId: "G-8R76MD2JY6"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};
