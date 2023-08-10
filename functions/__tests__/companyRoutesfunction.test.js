const companyRoutesFunction = require("../Routes/CompanyData/companyRoutesFunction");
const {companyInfo,
    getEnableDisabledCompanies,
    allCompanies,
    recentData} = require("../Routes/CompanyData/companyRoutes");

const disabled_companies = ['sbi life insurance company ltd.'];

const recents = {
    "open": "1,000,000",
    "high": "2,000,000",
    "low": "1,000,000",
    "close": "2,000,000",
    "volume": "1,000,000"
}

const companies = [{ 'name': 'SBI Life Insurance Company Ltd.', 
         'industry': 'Insurance—Life', 
         'ticker': 'SBILIFE.NS', 
         'changepct': -0.611653, 
         'about': 'SBI Life Insurance Company Limited operates as a private life insurance company in India. Its life insurance business comprises of individual life and group business, including participating, non-participating, pension, group gratuity, group leave encashment, group superannuation, group immediate annuity, unit-linked and variable insurance products, health, and micro insurance. The company also provides accident and disability benefit, level term, and critical illness insurance products. It offers its products through a multi-channel distribution network comprising individual agents, SBI branches, brokers, corporate agents, banca partners, and certified insurance facilitators, as well as common service centre, insurance marketing firm, direct business, and website and web aggregators. The company was incorporated in 2000 and is based in Mumbai, India. SBI Life Insurance Company Limited is a subsidiary of State Bank of India.', 
         'seListed': ['NSE'], 
         'hq': 'Mumbai', 
         'lowerCaseName': 'sbi life insurance company ltd.', 
         'ceo': 'Mr. Mahesh Kumar Sharma', 
         'boardMembers': ['Mr. Mahesh Kumar Sharma', 'Mr. Sangramjit  Sarangi', 'Mr. Vinod  Koyande', 'Mr. Ravi  Krishnamurthy', 'Mr. Gopikrishna  Shenoy', 'Mr. Pranay  Raniwala', 'Mr. Ravindra  Sharma', 'Ms. Seema  Trikannad', 'Mr. M.  Anand', 'Mr. Abhijit  Gulanikar'], 
         'sector': 'Financial Services', 
         'founded': 'NA'
    },{
        'about': 'NTPC Limited generates and sells bulk power to state power utilities in India. It operates in two segments, Generation of Energy and Others. The company generates power from coal, gas, liquid fuel, hydro, solar, nuclear, wind, thermal, and renewable energy sources. It also offers consultancy, project management, and supervision services. In addition, the company is involved in energy trading, oil and gas exploration, and coal mining activities. Further, it sells electricity to private DISCOMs operating in various states. As of May 20, 2022, the company had an installed capacity of 69016.68 megawatt and commercial capacity of 68356.68 MW. NTPC Limited was incorporated in 1975 and is headquartered in New Delhi, India.', 
        'boardMembers': ['Mr. Gurdeep  Singh', 'Mr. V. Ramesh Babu', 'Ms. Nandini  Sarkar', 'Mr. Dillip Kumar Patel', 'Mr. Chandan Kumar Mondol', 'Mr. Ujjwal Kanti Bhattacharya', 'Ms. Renu  Narang', 'Mr. Aditya  Dar', 'Mr. Gopal  Ravindra', 'Mr. Sudarsan  Chakrabarti'], 
        'founded': 'NA', 
        'ticker': 'NTPC.NS', 
        'lowerCaseName': 'ntpc ltd.', 
        'sector': 'Utilities', 
        'industry': 'Utilities—Independent Power Producers', 
        'seListed': ['NSE'], 
        'ceo': 'Mr. Gurdeep  Singh', 
        'hq': 'New Delhi', 
        'name': 'NTPC Ltd.', 
        'changepct': 0.63417685
    }];

describe("Company Info", () => {
    it("should return company info", async () => {
        const spy = jest.spyOn(companyRoutesFunction, "getCompany")
        .mockImplementation(async (name) => {
            return [companies[1]];
        });

        const companyinfo = await companyInfo(companies[1].name);
        expect(spy).toHaveBeenCalledWith(companies[1].name);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(companyinfo[0]).toEqual(companies[1]);
        spy.mockRestore();
    });
});

describe("get Enabled, Disabled companies", () => {
    it("should return enabled companies", async () => {
        const spy1 = jest
                .spyOn(companyRoutesFunction, "getDisabledCompanies")
                .mockImplementation(async () => {
                    return disabled_companies;
                });
        
        const spy2 = jest
                .spyOn(companyRoutesFunction, "getCompanies")
                .mockImplementation(async () => {
                    return companies;
                });
        const {enabled, disabled} = await getEnableDisabledCompanies();
        //expect(spy1).toHaveBeenCalledTimes(1);
        expect(enabled).toEqual([companies[1].lowerCaseName]);
        expect(disabled).toEqual(disabled_companies);
        spy1.mockRestore();
        spy2.mockRestore();

    });
});

describe("get Recents", () => {
    it("should return recents", async () => {
        const spy = jest
                .spyOn(companyRoutesFunction, "getRecent")
                .mockImplementation(async (name, se) => {
                    return recents;
                });

        const recent = await recentData("SBI Life Insurance Company Ltd.", "NSE");
        //expect(spy).toHaveBeenCalledTimes(1);
        expect(recents).toEqual(recent);
        spy.mockRestore();
    });
});