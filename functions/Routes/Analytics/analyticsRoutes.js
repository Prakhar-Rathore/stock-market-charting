const express = require("express");
const analyticsRouter = express.Router();
const { db } = require("../../config/firebasev8");
const  dbn  = require("../../config/firebasev9");
const {
  orderBy,
  startAt,
  endAt,
  getDocs,
  collection,
  query,
  getDoc,
  where,
  doc,
  setDoc,
  addDoc,
} = require("firebase/firestore");

analyticsRouter.get("/byName", async (req, res) => {
    try {
        const companyName = req.query.name;
        const companyRef = collection(dbn, "companies");
        const companyDocCheck = query(
            companyRef,
            where("lowerCaseName", "==", companyName.toLowerCase())
        );
        const companyDocSnap = await getDocs(companyDocCheck);
        if (companyDocSnap.docs.length === 0) {
            res.status(400).send({ name: companyName, message: "company does not exist" });
            return;
        } else {
            const companyDoc = companyDocSnap.docs[0];
            const companyId = companyDoc.id;
            const companyStatsRef = await db.collection("companies")
                                      .doc(companyId)
                                      .collection("stocks")
                                      .doc("NSE")
                                      .collection("data")
                                      .doc("stats").get();

            const companyStats = await companyStatsRef.data();
            res.status(200).json({ success: true, data: companyStats });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

analyticsRouter.get("/byTicker", async (req, res) => {
    try {
        const companyTicker = req.query.ticker;

        const companyRef = collection(dbn, "companies");
        const companyDocCheck = query(
            companyRef,
            where("ticker", "==", companyTicker)
        );
        const companyDocSnap = await getDocs(companyDocCheck);
        if (companyDocSnap.docs.length === 0) {
            res.status(400).send({ message: "company does not exist" });
            return;
        } else {
            const companyDoc = companyDocSnap.docs[0];
            const companyId = companyDoc.id;
            
            const companyStatsRef = await db.collection("companies")
                                      .doc(companyId)
                                      .collection("stocks")
                                      .doc("NSE")
                                      .collection("data")
                                      .doc("stats").get();

            const companyStats = await companyStatsRef.data();
            res.status(200).json({ success: true, data: companyStats });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = analyticsRouter;

