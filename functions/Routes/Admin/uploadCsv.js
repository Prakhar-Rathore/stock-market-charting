const express = require("express");
const uploadRouter = express.Router();
const dbn = require("../../config/firebasev9");
const request = require("request");
const csv = require("csvtojson");
const uploadCsvFunctions = require("./uploadCsvFunctions");
const parserconfig = {
  trim: true,
};
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
  Timestamp,
} = require("firebase/firestore");

////////////////////////////route to upload csv data////////////////////////////////////////

uploadRouter.post("/uploadCsv", async (req, res) => {
  try {
    const { url, companyName, seCode } = req.body;
    var upperSeCode = seCode.toUpperCase();
    const companyRef = collection(dbn, "companies");
    const jsonData = await uploadCsvFunctions.getJsonFromCsv(url);
    const companyDoc = query(
      companyRef,
      where("lowerCaseName", "==", companyName.toLowerCase()),
      where("seListed", "array-contains", seCode)
    );
    const companyDocSnap = await getDocs(companyDoc);
    if (companyDocSnap.docs.length > 0) {
      const company = companyDocSnap.docs[0];
      for (let i = 0; i < jsonData.length; i++) {
        var fullDate = jsonData[i].date;
        const { year, month, day, dateObje } =
          uploadCsvFunctions.extMoDaYear(fullDate);
        const { open, high, low, close, volume } =
          uploadCsvFunctions.getOpenCloseLowHigh(jsonData[i]);
        await setDoc(
          doc(
            dbn,
            `companies/${company.id}/stocks/${upperSeCode}/data/historic/${year}`,
            fullDate
          ),
          {
            open,
            high,
            low,
            close,
            volume,
            date: dateObje,
          }
        );
      }
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(404).json({ message: "company not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = uploadRouter;
