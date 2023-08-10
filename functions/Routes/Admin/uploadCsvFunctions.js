const csv = require("csvtojson");
const request = require("request");

const trimJsonKeys = (jsonData) => {
  const jsonDataKeys = Object.keys(jsonData);
  const jsonDataValues = Object.values(jsonData);
  const jsonDataTrimmed = {};
  for (let i = 0; i < jsonDataKeys.length; i++) {
    jsonDataTrimmed[jsonDataKeys[i].trim().toLowerCase()] = jsonDataValues[i];
  }
  return jsonDataTrimmed;
};

const getJsonFromCsv = async (url) => {
  try {
    const jsonData = await csv().fromStream(request.get(url));
    for (let i = 0; i < jsonData.length; i++) {
      jsonData[i] = trimJsonKeys(jsonData[i]);
    }
    return jsonData;
  } catch (e) {
    console.log(e);
  }
};
///extract the date into month day and year
const extMoDaYear = (date) => {
  var arrdate = date.split("-");
  var year = arrdate[2];
  var month = arrdate[1];
  var day = arrdate[0];
  const monthmapping = {
    Jan: "00",
    Feb: "01",
    Mar: "02",
    Apr: "03",
    May: "04",
    Jun: "05",
    Jul: "06",
    Aug: "07",
    Sep: "08",
    Oct: "09",
    Nov: "10",
    Dec: "11",
  };
  var dateObje = new Date(year, monthmapping[month], day);
  return { year, month, day, dateObje };
};
//extract open,high,low,close,volume from json for NSE
const getOpenCloseLowHigh = (jsonData) => {
  // console.log(jsonData);
  const open = parseFloat(jsonData.open.replace(/,/g, ""));
  const high = parseFloat(jsonData.high.replace(/,/g, ""));
  const low = parseFloat(jsonData.low.replace(/,/g, ""));
  const close = parseFloat(jsonData.close.replace(/,/g, ""));
  const volume = parseFloat(jsonData.volume.replace(/,/g, ""));
  return { open, high, low, close, volume };
};

module.exports = {
  getJsonFromCsv,
  extMoDaYear,
  getOpenCloseLowHigh,
  trimJsonKeys,
};
