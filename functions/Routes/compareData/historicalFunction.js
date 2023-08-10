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

const getYearFromDate = (startDate, endDate) => {
  yearsArr = [];
   if(typeof startDate !== "object" || typeof endDate !== "object"){
    throw new Error("startDate and endDate must be date objects");
   }
    var startYear = startDate.getFullYear();
    var endYear = endDate.getFullYear();
    for (var year = startYear; year <= endYear; year++) {
      yearsArr.push(year);
    }
    return yearsArr;
 
};


const getDateObject = (date) => {
  var dateObj = new Date(date);
  return dateObj;
};

const getCollectionRef = (dbref, collectionname) => {
  try {
    var res = collection(dbref, collectionname);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getCompanyDocByQuery = (companyRef, companyName, seCode) => {
  try {
    var res = query(
      companyRef,
      where("lowerCaseName", "==", companyName.toLowerCase()),
      where("seListed", "array-contains", seCode)
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getDocSnapshot = async (companyDoc) => {
  try {
    const res = await getDocs(companyDoc);
    return res;
  } catch (err) {
    console.log(err);
  }
};
const historicalQueryFromDate = (stockRef, startDate, endDate) => {
  try {
    const res = query(
      stockRef,
      orderBy("date", "asc"),
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const historicalQueryByStartDate = (companyRef, startDate) => {
  try {
    const res = query(
      companyRef,
      orderBy("date", "asc"),
      where("date", ">=", startDate)
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const historicalQueryByEndDate = (companyRef, endDate) => {
  try {
    const res = query(
      companyRef,
      orderBy("date", "asc"),
      where("date", "<=", endDate)
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateDataArray = (snapShot, arr) => {
  if (snapShot.docs.length > 0) {
    snapShot.docs.map((doc) => {
      dateFromTimeStamp = doc.data().date.toDate();
      dataVal = { ...doc.data(), date: dateFromTimeStamp };
      arr.push(dataVal);
    });
  }
};

module.exports={
  getDateObject,
  getCollectionRef,
  getCompanyDocByQuery,
  getDocSnapshot,
  historicalQueryFromDate,
  historicalQueryByStartDate,
  historicalQueryByEndDate,
  updateDataArray,
  getYearFromDate
}