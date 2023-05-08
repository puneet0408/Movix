
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage  } from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdnaQl769vI0mhX7AncaVxM0VX1rwoBIA",
  authDomain: "movix-app-692cf.firebaseapp.com",
  projectId: "movix-app-692cf",
  storageBucket: "movix-app-692cf.appspot.com",
  messagingSenderId: "746608256736",
  appId: "1:746608256736:web:a7cbb9a08cfc687762d285"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app); 
export const Firestore = getFirestore(app); 