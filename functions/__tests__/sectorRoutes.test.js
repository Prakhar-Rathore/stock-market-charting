const {
  removeMarkfromPercentage,
  removeCommas,
  dfsStringObjectParser,
} = require("../Routes/sector/sectorRoutesFunctions");

const dataObj = {
  1: { Agri: { market_cap: "216,576", subsector: "Agriculture" } },
};
const res = {
  1: { Agri: { market_cap: "216576", subsector: "Agriculture" } },
};

// write test for removeCommas
describe("removeCommas", () => {
  it("should remove commas from string", () => {
    expect(removeCommas(dataObj[1].Agri.market_cap)).toEqual(
      res[1].Agri.market_cap
    );
  });
  it("should return  string if no commas", () => {
    expect(removeCommas("216576")).toEqual("216576");
  });
  it('should return empty string if no string', () => {
    expect(removeCommas()).toEqual("");
  })

});

// write test for removeMarkfromPercentage
describe("removeMarkfromPercentage", () => {
  it("should remove % from string", () => {
    expect(removeMarkfromPercentage("50%")).toEqual("50");
  });
});

describe("dfsStringObjectParser", () => {
  it("should parse object recursively for nested key values", () => {
    const fakeobj = {
      Agri: {
        market_cap: "216,576",
        "%chg": "-0.16%",
        "A/D ratio": "1.31",
        Advance: "38",
        "Advance Decline Graph": "41%",
        Decline: "29",
        subsector: {
          Agriculture: {
            "%chg": "1.22%",
            "A/D ratio": "7",
            Advance: "7",
            "Advance Decline Graph": "97%",
            Decline: "1",
            market_cap: "11,313",
          },
          Aquaculture: {
            "%chg": "1.22%",
            "A/D ratio": "7",
            Advance: "7",
            "Advance Decline Graph": "97%",
            Decline: "1",
            market_cap: "11,313",
          },
        },
      },
    };
    const expectedRes = {
      market_cap: 216576,
      "%chg": -0.16,
      "A/D ratio": 1.31,
      Advance: 38,
      "Advance Decline Graph": 41,
      Decline: 29,
      subsector: {
        Agriculture: {
          "%chg": 1.22,
          "A/D ratio": 7,
          Advance: 7,
          "Advance Decline Graph": 97,
          Decline: 1,
          market_cap: 11313,
        },
        Aquaculture: {
          "%chg": 1.22,
          "A/D ratio": 7,
          Advance: 7,
          "Advance Decline Graph": 97,
          Decline: 1,
          market_cap: 11313,
        },
      },
    };
    const res = dfsStringObjectParser(fakeobj.Agri);
    expect(res).toEqual(expectedRes);
  });
});
