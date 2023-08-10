// create a cloud function to update the percent change

const functions = require("firebase-functions");
const { admin, db, auth } = require("../../config/firebasev8");

 const updatePercent = functions.firestore
  .document("companies/{companyName}/stocks/{exchangeName}/data/recent")
  .onUpdate(async (change, context) => {
    const { companyName, exchangeName } = context.params;
    const companyDoc = await db.collection("companies").doc(companyName).get();
    const companyData = companyDoc.data();
    const recentDoc = await db
      .collection("companies")
      .doc(companyName)
      .collection("stocks")
      .doc(exchangeName)
      .collection("data")
      .doc("recent")
      .get();
    const recentData = recentDoc.data();

    if (recentData.changepct === undefined) {
      return;
    } else {
      await db.collection("companies").doc(companyName).update({
        changepct: recentData.changepct,
      });
    }
  });

  module.exports = updatePercent;

  