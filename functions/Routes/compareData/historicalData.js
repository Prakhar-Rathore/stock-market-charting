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

///////////////////////////////////////////////
const getHistoricalDataByDates = async (
  companyName,
  seCode,
  startDate,
  endDate
) => {
  try {
    // const { companyName, seCode, startDate, endDate } = req.query;
    const companyRef = historicalFunctions.getCollectionRef(dbn, "companies");
    const companyDoc = historicalFunctions.getCompanyDocByQuery(
      companyRef,
      companyName,
      seCode
    );
    // console.log(startDate);
    startDateObj = historicalFunctions.getDateObject(startDate);
    endDateObj = historicalFunctions.getDateObject(endDate);
    // console.log(startDateObj);
    // console.log(endDateObj);
    const yearsArr = getYearFromDate(startDateObj, endDateObj);
    // console.log(yearsArr);
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
    dataArr.reverse();
    return dataArr;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getHistoricalDataByDates };
