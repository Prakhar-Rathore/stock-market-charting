const {checkUrl, checkStartEndDate, checkNecessaryFields, validateYear, timestampToDateIST} = require('./helperFunctions');
const {Timestamp} = require('firebase/firestore');

describe("checkUrl", () => {

    test("should be defined", () => {
        expect(checkUrl).toBeDefined();
    })

    test("should receive only one argument", () => {
        expect(checkUrl.length).toBe(1);
    })

    test("returns true if url is valid", () => {
        expect(checkUrl("https://www.google.com")).toBe(true);
    })

    test("returns false if url is invalid", () => {
        expect(checkUrl("https://www.google")).toBe(false);
    })

    test("returns false if url is empty", () => {
        expect(checkUrl("")).toBe(false);
    })

    test("returns false if url is null", () => {
        expect(checkUrl(null)).toBe(false);
    })
})


describe("checkStartEndDate", () => {

    test("should be defined", () => {
        expect(checkStartEndDate).toBeDefined();
    })

    test("should receive two arguments", () => {
        expect(checkStartEndDate.length).toBe(2);
    })

    test("success property is false when startDate is invalid", () => {
        const res1 = checkStartEndDate("2020-01-011", "2020-01-01");
        expect(res1.success).toBe(false);

        const res2 = checkStartEndDate("20a0-01-01", "2020-01-01");
        expect(res2.success).toBe(false);
    })

    test("success property is false when endDate is invalid", () => {
        const res1 = checkStartEndDate("2020-01-01", "2020-01-101");
        expect(res1.success).toBe(false);

        const res2 = checkStartEndDate("20a0-01-01", "2020-01-0a");
        expect(res2.success).toBe(false);
    })

    test("(start, end) (2012-12-12, 2012-12-21) is valid", () => {
        const res = checkStartEndDate("2012-12-12", "2012-12-21");
        expect(res.success).toBe(true);
    })

    test("(start, end) (2012-12-12, 2012-12-02) is invalid", () => {
        const res = checkStartEndDate("2012-12-12", "2012-12-02");
        expect(res.success).toBe(false);
    })
})


describe("checkNecessaryFields", () => {
    
    test("should be defined", () => {
        expect(checkNecessaryFields).toBeDefined();
    })
    
    test("should receive two arguments", () => {
        expect(checkNecessaryFields.length).toBe(2);
    })
    
    test("success = true when all necessary fields are defined in the object", () => {
        const res = checkNecessaryFields({symbol: "AAPL", startDate: "2020-01-01", endDate: "2020-01-01", something: "something"}, ["symbol", "startDate", "endDate"]);
        expect(res.success).toBe(true);
    })
    
    test("success = false if any of the necessary fields are missing", () => {
        const res = checkNecessaryFields({symbol: "AAPL", startDate: "2020-01-01"}, ["symbol", "startDate", "endDate"]);
        expect(res.success).toBe(false);
    })
    
    test("success = false if any of the necessary fields are empty", () => {
        const res = checkNecessaryFields({symbol: "", startDate: "2020-01-01", endDate: "2020-01-01"}, ["symbol", "startDate", "endDate"]);
        expect(res.success).toBe(false);
    })
    
    test("success = false if any of the necessary fields are null", () => {
        const res = checkNecessaryFields({symbol: null, startDate: "2020-01-01", endDate: "2020-01-01"}, ["symbol", "startDate", "endDate"]);
        expect(res.success).toBe(false);
    })
})


describe("validateYear", () => {

    test("should be defined", () => {
        expect(validateYear).toBeDefined();
    })

    test("should receive one argument", () => {
        expect(validateYear.length).toBe(1);
    })

    test("returns true if year is valid", () => {
        expect(validateYear("2020")).toBe(true);
    })

    test("returns false if year is invalid", () => {
        expect(validateYear("20a0")).toBe(false);
    })

    test("returns false if year is not a 4-digit string (out of range)", () => {
        expect(validateYear("123")).toBe(false);
        expect(validateYear("12345")).toBe(false);
    })

    test("returns false if year is empty", () => {
        expect(validateYear("")).toBe(false);
    })

    test("returns false if year is null", () => {
        expect(validateYear(null)).toBe(false);
    })

    test("returns false if year is undefined", () => {
        expect(validateYear(undefined)).toBe(false);
    })

})

describe("timestampToDateIST", () => {
    
    test("should be defined", () => {
        expect(timestampToDateIST).toBeDefined();
    })

    test("should receive one argument", () => {
        expect(timestampToDateIST.length).toBe(1);
    })

    test("returns null if argument is not of type Timestamp", () => {
        expect(timestampToDateIST("hello")).toBeNull();
    })

    test("returns null if argument is null", () => {
        expect(timestampToDateIST(null)).toBeNull();
    })

    test("returns a js date object", () => {
        expect(timestampToDateIST(new Timestamp(0, 0))).toBeInstanceOf(Date);
    })

    test("gives the correct results", () => {
        const date = timestampToDateIST(new Timestamp(1657557934, 421000000));
        expect(date.getFullYear()).toBe(2022);
        expect(date.getMonth()).toBe(6);
        expect(date.getDate()).toBe(12);
        expect(date.getHours()).toBe(3);
        expect(date.getMinutes()).toBe(45);
        expect(date.getSeconds()).toBe(34);
        expect(date.getMilliseconds()).toBe(421);
    })
})