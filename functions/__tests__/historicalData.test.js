const historicalData = require("../Routes/Historical/historicalFunction");
const {
  getYearFromDate,
  getCompanyHistoricalData,
} = require("../Routes/Historical/historicalData");

const yearsArr = [2022];
const dataArr = {
  2021: [
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
      date: new Date("2021-01-01"),
    },
  ],
  2022: [
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
      date: new Date("2022-01-01"),
    },
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
      date: new Date("2022-05-01"),
    },
  ],
};

const snapShot = {
  docs: [
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
      date: new Date("2022-01-01"),
    },
    {
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0,
      date: new Date("2022-05-01"),
    },
  ],
};
describe("historicalData functions test", () => {
  describe("getYearFromDate", () => {
    it("should return an array of years", () => {
      const startDateObj = new Date(2020, 0, 1);
      const endDateObj = new Date(2020, 11, 31);
      const yearsArr = getYearFromDate(startDateObj, endDateObj);
      expect(yearsArr).toEqual([2020]);
    });
    it("should return an array of years", () => {
      const startDateObj = new Date(2020, 0, 1);
      const endDateObj = new Date(2021, 11, 31);
      const yearsArr = getYearFromDate(startDateObj, endDateObj);
      expect(yearsArr).toEqual([2020, 2021]);
    });
  });
  it("getCompanyHistorical", async () => {
    const spy1 = jest
      .spyOn(historicalData, "getCollectionRef")
      .mockImplementation(() => {
        return 2022;
      });
    const spy2 = jest
      .spyOn(historicalData, "historicalQueryFromDate")
      .mockImplementation((stockref, startdateobj, enddateobj) => {
        data = dataArr[stockref];
        return data;
      });
    const spy3 = jest
      .spyOn(historicalData, "getDocSnapshot")
      .mockImplementation(() => {
        Promise.resolve(dataArr[2022]);
      });
    const spy4 = jest
      .spyOn(historicalData, "getDocSnapshot")
      .mockImplementation((historicadoc) => {
        return snapShot;
      });
    const spy5 = jest
      .spyOn(historicalData, "updateDataArray")
      .mockImplementation((historicadoc, arr) => {
        arr.push(snapShot.docs[0]);
        arr.push(snapShot.docs[1]);
      });
    var arr = [];
    const res = await getCompanyHistoricalData(
      snapShot,
      yearsArr,
      new Date(2022, 1, 1),
      new Date(2022, 5, 1),
      arr,
      "SE"
    );
    expect(arr).toEqual([
      {
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        volume: 0,
        date: new Date("2022-01-01"),
      },
      {
        open: 0,
        close: 0,
        high: 0,
        low: 0,
        volume: 0,
        date: new Date("2022-05-01"),
      },
    ]);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(spy5).toHaveBeenCalledTimes(1);
  });
});
