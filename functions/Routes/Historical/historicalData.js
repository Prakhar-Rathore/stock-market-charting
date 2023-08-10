const express = require("express");
const { query, orderBy } = require("firebase/firestore");
const historicalRouter = express.Router();
const dbn = require("../../config/firebasev9");

const historicalFunctions = require("./historicalFunction");

//////////////functions////////////////
const getYearFromDate = (startDate, endDate) => {
  yearsArr = [];
  if (typeof startDate !== "object" || typeof endDate !== "object") {
    throw new Error("startDate and endDate must be date objects");
  }
  var startYear = startDate.getFullYear();
  var endYear = endDate.getFullYear();
  for (var year = startYear; year <= endYear; year++) {
    yearsArr.push(year);
  }
  return yearsArr;
};

const getCompanyHistoricalData = async (
  companyDocSnap,
  yearsArr,
  startDateObj,
  endDateObj,
  dataArr,
  seCode
) => {
  if (companyDocSnap.docs.length > 0) {
    const company = companyDocSnap.docs[0];
    if (yearsArr.length === 1) {
      const stockRef = historicalFunctions.getCollectionRef(
        dbn,
        `companies/${company.id}/stocks/${seCode}/data/historic/${yearsArr[0]}`
      );
      const historicalData = historicalFunctions.historicalQueryFromDate(
        stockRef,
        startDateObj,
        endDateObj
      );
      const historicalDataSnap = await historicalFunctions.getDocSnapshot(
        historicalData
      );

      historicalFunctions.updateDataArray(historicalDataSnap, dataArr);
    } else {
      // console.log(company.id)
      for (let i = 0; i < yearsArr.length; i++) {
        const year = yearsArr[i];
        const stockRef = historicalFunctions.getCollectionRef(
          dbn,
          `companies/${company.id}/stocks/${seCode}/data/historic/${year}`
        );

        const historicalDoc =
          i === 0
            ? historicalFunctions.historicalQueryByStartDate(
                stockRef,
                startDateObj
              )
            : i === yearsArr.length - 1
            ? historicalFunctions.historicalQueryByEndDate(stockRef, endDateObj)
            : historicalFunctions.historicalQueryFromDate(
                stockRef,
                startDateObj,
                endDateObj
              );
        console.log("runned");
        const historicalDataSnap = await historicalFunctions.getDocSnapshot(
          historicalDoc
        );
        historicalFunctions.updateDataArray(historicalDataSnap, dataArr);
      }
    }
  }
};

const getCompanyData = async (companyDocSnap, year, dataArr, seCode) => {
  if (companyDocSnap.docs.length > 0) {
    const company = companyDocSnap.docs[0];
    const stockRef = historicalFunctions.getCollectionRef(
      dbn,
      `companies/${company.id}/stocks/${seCode}/data/historic/${year}`
    );
    const historicalData = query(stockRef, orderBy("date", "asc"));
    const historicalDataSnap = await historicalFunctions.getDocSnapshot(
      historicalData
    );
    historicalFunctions.updateDataArray(historicalDataSnap, dataArr);
  }
};

///////////////////////////////////////////////
historicalRouter.get("/historicalDataByDates", async (req, res) => {
  try {
    const { companyName, seCode, startDate, endDate } = req.query;
    const companyRef = historicalFunctions.getCollectionRef(dbn, "companies");
    const companyDoc = historicalFunctions.getCompanyDocByQuery(
      companyRef,
      companyName,
      seCode
    );
    startDateObj = historicalFunctions.getDateObject(startDate);
    endDateObj = historicalFunctions.getDateObject(endDate);
    const yearsArr = getYearFromDate(startDateObj, endDateObj);
    const companyDocSnap = await historicalFunctions.getDocSnapshot(companyDoc);
    dataArr = [];

    await getCompanyHistoricalData(
      companyDocSnap,
      yearsArr,
      startDateObj,
      endDateObj,
      dataArr,
      seCode
    );
    res.status(200).send({ data: dataArr });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
});

historicalRouter.get("/historicalData", async (req, res) => {
  try {
    const { companyName, seCode, year } = req.query;
    const companyRef = historicalFunctions.getCollectionRef(dbn, "companies");
    const companyDoc = historicalFunctions.getCompanyDocByQuery(
      companyRef,
      companyName,
      seCode
    );
    const companyDocSnap = await historicalFunctions.getDocSnapshot(companyDoc);
    dataArr = [];
    await getCompanyData(companyDocSnap, year, dataArr, seCode);
    res.status(200).send({ data: dataArr });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
});

///////////////////////////////////////////////////
// historicalRouter.get("/historicalDataByDates", async (req, res) => {
//   try {
//     const { companyName, seCode, startDate, endDate } = req.query;
//     const companyRef = collection(dbn, "companies");
//     const companyDoc = query(
//       companyRef,
//       where("lowerCaseName", "==", companyName.toLowerCase()),
//       where("seListed", "array-contains", seCode)
//     );
//     startDateObj = getDateObject(startDate);
//     endDateObj = getDateObject(endDate);
//     // console.log(startDateObj, endDateObj);
//     const yearsArr = getYearFromDate(startDateObj, endDateObj);
//     const companyDocSnap = await getDocs(companyDoc);
//     dataArr = [];
//     if (companyDocSnap.docs.length > 0) {
//       const company = companyDocSnap.docs[0];
//       if (yearsArr.length === 1) {
//         console.log("true");
//         const stockRef = collection(
//           dbn,
//           `companies/${company.id}/stocks/${seCode}/data/historic/${yearsArr[0]}`
//         );
//         const historicalData = query(
//           stockRef,
//           orderBy("date", "asc"),
//           startAt(startDateObj),
//           endAt(endDateObj)
//         );
//         const historicalDataSnap = await getDocs(historicalData);
//         if (historicalDataSnap.docs.length > 0) {
//           historicalDataSnap.docs.map((doc) => {
//             dateFromTimeStamp = doc.data().date.toDate();
//             dataVal = { ...doc.data(), date: dateFromTimeStamp };
//             dataArr.push(dataVal);
//           });
//         }
//       } else {
//         for (let i = 0; i < yearsArr.length; i++) {
//           const year = yearsArr[i];
//           const stockRef = collection(
//             dbn,
//             `companies/${company.id}/stocks/${seCode}/data/historic/${year}`
//           );
//           const historicalDa =
//             i === 0
//               ? query(
//                   stockRef,
//                   orderBy("date", "desc"),
//                   where("date", ">=", startDateObj)
//                 )
//               : i === yearsArr.length - 1
//               ? query(
//                   stockRef,
//                   orderBy("date", "desc"),
//                   where("date", "<=", endDateObj)
//                 )
//               : query(stockRef, orderBy("date", "desc"));

//           const historicalDataSnap = await getDocs(historicalDa);
//           if (historicalDataSnap.docs.length > 0) {
//             historicalDataSnap.docs.map((doc) => {
//               dateFromTimeStamp = doc.data().date.toDate();
//               dataVal = { ...doc.data(), date: dateFromTimeStamp };
//               dataArr.push(dataVal);
//             });
//           }
//         }
//       }
//     }
//     dataArr.reverse();
//     res.status(200).send({ data: dataArr });
//   } catch (err) {
//     res.status(500).send({ message: "error" });
//   }
// });

module.exports = {
  historicalRouter,
  getCompanyHistoricalData,
  getYearFromDate,
};
