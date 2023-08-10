const csvFunctions = require("../Routes/Admin/uploadCsvFunctions");

test("getJsonFromCsv", async () => {
  const url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-03-2020.csv";
  const jsonData = await csvFunctions.getJsonFromCsv(url);
  expect(jsonData).toBeDefined();
});

test("getJsonFromCsv", async () => {
  const invalidurl = "https://google.com";
  const jsonData = csvFunctions.getJsonFromCsv(invalidurl);
  expect(jsonData).toMatchObject({});
});
////test extMoDaYear////
test("should get month day and year", () => {
  var res = csvFunctions.extMoDaYear("03-june-2020");
  expect(res.month).toBe("june");
  expect(res.day).toBe("03");
  expect(res.year).toBe("2020");
});
////test getOpenCloseLowHigh////
describe("getOpenCloseLowHigh", () => {
  test("should get open,high,low,close,volume", () => {
    const jsonData = {
      open: "1,0.00",
      high: "10,0.00",
      low: "10,00",
      close: "10.00",
      volume: "10.00",
    };
    var res = csvFunctions.getOpenCloseLowHigh(jsonData);
    // console.log(res);
    expect(res.open).toBe(10);
    expect(res.high).toBe(100);
    expect(res.low).toBe(1000);
    expect(res.close).toBe(10);
    expect(res.volume).toBe(10);
  });

  test("should get open,high,low,close,volume with comma removed", () => {
    var jsonData = {
      open: "10,00",
      high: "100,00",
      low: "1,00",
      close: "10,00",
      volume: "10,00",
    };
    var res = csvFunctions.getOpenCloseLowHigh(jsonData);
    expect(res.open).toBe(1000);
    expect(res.high).toBe(10000);
    expect(res.low).toBe(100);
    expect(res.close).toBe(1000);
    expect(res.volume).toBe(1000);
  });
});

describe("trimJsonKeys", () => {
  test("should trim  spaces  from keys and convert uppercase to lowercase", () => {
    var jsonData = {
      " OPEN ": "10.00",
      " HIGH ": "100.00",
      "low ": "1.00",
      "close ": "10.00",
      "volume ": "10.00",
    };
    var res = csvFunctions.trimJsonKeys(jsonData);
    expect(res).toStrictEqual({
      open: "10.00",
      high: "100.00",
      low: "1.00",
      close: "10.00",
      volume: "10.00",
    });
  });
});
