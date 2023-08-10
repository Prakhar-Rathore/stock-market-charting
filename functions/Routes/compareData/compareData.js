const express = require("express");
const downloadRouter = express.Router();
const dbn = require("../../config/firebasev9");
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
  limit,
} = require("firebase/firestore");
const { getHistoricalDataByDates } = require("./historicalData");
const getStringDate = (dateobj) => {
  var mon = dateobj.getMonth() + 1;
  var day = dateobj.getDate();
  var year = dateobj.getFullYear();
  var date = mon + "-" + day + "-" + year;
  return date;
};

const getFinancialHighLights = (companyStats, companyName, financialArr) => {
  for (key in companyStats) {
    if (key === "Financial Highlights") {
      if (financialArr[key] === undefined) {
        financialArr[key] = {};
      }
      for (key2 in companyStats[key]) {
        if (financialArr[key][key2] === undefined) {
          financialArr[key][key2] = {};
        }
        for (key3 in companyStats[key][key2]) {
          if (financialArr[key][key2][key3] === undefined) {
            financialArr[key][key2][key3] = {};
          }
          financialArr[key][key2][key3][`${companyName}`] =
            companyStats[key][key2][key3];
        }
      }
    }
  }
};

const getTradingInfo = (companyStats, companyName, tradingArr) => {
  for (key in companyStats) {
    if (key === "Trading Information") {
      if (tradingArr[key] === undefined) {
        tradingArr[key] = {};
      }
      for (key2 in companyStats[key]) {
        if (tradingArr[key][key2] === undefined) {
          tradingArr[key][key2] = {};
        }
        for (key3 in companyStats[key][key2]) {
          if (tradingArr[key][key2][key3] === undefined) {
            tradingArr[key][key2][key3] = {};
          }
          tradingArr[key][key2][key3][`${companyName}`] =
            companyStats[key][key2][key3];
        }
      }
    }
  }
  // jsonObj = JSON.stringify(stats);
  // tradingArr.push(jsonObj);
};

const getValuation = (companyStats, companyName, valuationArr) => {
  // var stats = {};
  // stats["companyname"] = companyName;
  for (key in companyStats) {
    if (key === "Valuation") {
      if (valuationArr[key] === undefined) {
        valuationArr[key] = {};
      }
      for (key2 in companyStats[key]) {
        if (valuationArr[key][key2] === undefined) {
          valuationArr[key][key2] = {};
        }
        valuationArr[key][key2][`${companyName}`] = companyStats[key][key2];
      }
    }
  }
};

const sortByDate = (arr) => {
  arr.sort((a, b) => {
    const mon1 = a.date.split("-")[0];
    const day1 = a.date.split("-")[1];
    const year1 = a.date.split("-")[2];
    const date1 = new Date(year1, mon1, day1);
    const mon2 = b.date.split("-")[0];
    const day2 = b.date.split("-")[1];
    const year2 = b.date.split("-")[2];
    const date2 = new Date(year2, mon2, day2);
    return date1 - date2;
  });
};

const getChangePercentage = (name, dataArr, resArr) => {
  for (var i = 1; i < dataArr.length; i++) {
    var changePercentwithDate = {};
    var dat = getStringDate(dataArr[i].date);
    var changePercent =
      (dataArr[i].close - dataArr[i - 1].close) / dataArr[i - 1].close;
    changePercentwithDate["date"] = dat;
    changePercentwithDate[`${name} % change`] = changePercent;
    resArr.push(changePercentwithDate);
  }
};

const getStats = async (companyName, secode) => {
  const q = query(
    collection(dbn, "companies"),
    where("lowerCaseName", "==", companyName.toLowerCase()),
    where("seListed", "array-contains", secode)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    throw new Error("No data found");
  }

  const id = querySnapshot.docs[0].id;
  const docRef = doc(dbn, `companies/${id}/stocks/${secode}/data/stats`);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return data;
  }
  throw new Error("No data found");
};

const downloadChangePercent = async (
  startDate,
  endDate,
  companyarr,
  secodearr
) => {
  var numofCompanies = companyarr.length;
  if (secodearr.length !== numofCompanies) {
    throw new Error("companyarr and secodearr must be of same length");
  }
  var res = [];
  for (var company = 0; company < numofCompanies; company++) {
    var companyName = companyarr[company];
    var seCode = secodearr[company];
    var data = await getHistoricalDataByDates(
      companyName,
      seCode,
      startDate,
      endDate
    );
    getChangePercentage(companyName.toLowerCase(), data, res);
  }
  sortByDate(res);
  const allDates = res.map((obj) => obj.date);
  const uniqueDates = [...new Set(allDates)];
  var res2 = [];
  for (var i = 0; i < uniqueDates.length; i++) {
    var date = uniqueDates[i];
    var obj = {};
    obj["date"] = date;
    for (var j = 0; j < res.length; j++) {
      if (res[j].date === date) {
        for (var key in res[j]) {
          if (key !== "date") {
            obj[key] = res[j][key];
          }
        }
      }
    }
    res2.push(obj);
  }
  return res2;
};

var getStatsInsights = async (companyArr, secodearr) => {
  var numofCompanies = companyArr.length;
  if (secodearr.length !== numofCompanies) {
    throw new Error("companyarr and secodearr must be of same length");
  }
  var financialArr = {};
  var tradingArr = {};
  var valuationArr = {};
  for (var company = 0; company < numofCompanies; company++) {
    var companyName = companyArr[company];
    var seCode = secodearr[company];
    var data = await getStats(companyName, seCode);
    getFinancialHighLights(data, companyName, financialArr);
    getTradingInfo(data, companyName, tradingArr);
    getValuation(data, companyName, valuationArr);
  }
  return [financialArr, tradingArr, valuationArr];
};

const getComparison = async (companyArr, secodearr, startDate, endDate) => {
  try {
    var changePercent = await downloadChangePercent(
      startDate,
      endDate,
      companyArr,
      secodearr
    );
    var stats = await getStatsInsights(companyArr, secodearr);

    return [changePercent, stats];
  } catch (err) {
    console.log(err);
  }
};

// const companyArr = [
//   "SBI Life Insurance Company Ltd.",
//   "sun pharmaceutical industries ltd.",
// ];
// const secodearr = ["NSE", "NSE"];
// getComparison(companyArr, secodearr, "Jul 1, 2022", "Jul 13, 2022");

downloadRouter.post("/download", async (req, res) => {
  try {
    const { companyArr, secodeArr, startDate, endDate } = req.body;
    const val = await getComparison(companyArr, secodeArr, startDate, endDate);
    res.status(200).send({ data: val });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = { downloadRouter };
