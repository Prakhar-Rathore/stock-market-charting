import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getStorage,ref} from "firebase/storage";

//Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8R3fR-bFLVOOp1RL8A7uwPq5Ee_FZBoo",
  authDomain: "stockmarketcharting-8c469.firebaseapp.com",
  databaseURL: "https://stockmarketcharting-8c469-default-rtdb.firebaseio.com",
  projectId: "stockmarketcharting-8c469",
  storageBucket: "stockmarketcharting-8c469.appspot.com",
  messagingSenderId: "23251165237",
  appId: "1:23251165237:web:5d0e9582142c2a4162d17c",
  measurementId: "G-CZTFM3P0V6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);

