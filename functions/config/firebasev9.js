const {initializeApp} = require('firebase/app');
const {getFirestore} = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC8R3fR-bFLVOOp1RL8A7uwPq5Ee_FZBoo",
    authDomain: "stockmarketcharting-8c469.firebaseapp.com",
    databaseURL: "https://stockmarketcharting-8c469-default-rtdb.firebaseio.com",
    projectId: "stockmarketcharting-8c469",
    storageBucket: "stockmarketcharting-8c469.appspot.com",
    messagingSenderId: "23251165237",
    appId: "1:23251165237:web:5d0e9582142c2a4162d17c",
    measurementId: "G-CZTFM3P0V6"
  };

//init firebase app
initializeApp(firebaseConfig);

//init services
const dbn = getFirestore();

module.exports = dbn;