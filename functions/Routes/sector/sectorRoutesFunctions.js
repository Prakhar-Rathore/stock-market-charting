const removeCommas = (str) => {
  if (str.length === 0) {
    return str;
  }
  return str.replace(/,/g, "");
};
const removeMarkfromPercentage = (str) => {
  if (str.length === 0) {
    return str;
  }
  return str.replace("%", "");
};

const dfsStringObjectParser = (dataObj) => {
  var res = {};
  for (var key in dataObj) {
    if (key === "subsector") {
      var re = {};
      for (var subkey in dataObj[key]) {
        re[subkey] = dfsStringObjectParser(dataObj[key][subkey]);
      }
      res[key] = re;
    } else if (key === "market_cap") {
      res[key] = parseFloat(removeCommas(dataObj[key]));
    } else if (key === "%chg" || key === "Advance Decline Graph") {
      res[key] = parseFloat(removeMarkfromPercentage(dataObj[key]));
    } else {
      res[key] = parseFloat(dataObj[key]);
    }
  }
  return res;
};

module.exports = {
  removeMarkfromPercentage,
  removeCommas,
  dfsStringObjectParser,
};
