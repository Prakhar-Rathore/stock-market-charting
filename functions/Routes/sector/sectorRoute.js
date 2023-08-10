const express = require("express");
const sectorRouter = express.Router();
const dbn = require("../../config/firebasev9");
const sectorRouteFunctions = require("./sectorRoutesFunctions");
const { getDocs, collection, getDoc, doc } = require("firebase/firestore");

const getCollectionRef = (dbref, collectionname) => {
  return collection(dbref, collectionname);
};

sectorRouter.get("/getSectorData", async (req, res) => {
  try {
    const sectorsDocRef = doc(dbn, "sectors", "NSE");
    const docSnap = await getDoc(sectorsDocRef);
    if (docSnap.exists()) {
      const sector_details_doc_coll = getCollectionRef(
        dbn,
        "sectors/NSE/sector_details"
      );
      const sector_details_doc_snap = await getDocs(sector_details_doc_coll);
      var sector_details_doc_arr = [];
      sector_details_doc_snap.forEach((doc) => {
        re = sectorRouteFunctions.dfsStringObjectParser(doc.data());
        sector_details_doc_arr.push({ name: doc.id, data: re });
      });
      // console.log(sector_details_doc_arr);
      res.status(200).json(sector_details_doc_arr);
    } else {
      return res.status(404).json({
        message: "Sector data not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

module.exports = { sectorRouter };
