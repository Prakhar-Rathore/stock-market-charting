var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stockmarketcharting-8c469-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

const auth = admin.auth();
module.exports = { admin, db, auth };
