const functions = require("firebase-functions");
const express = require("express");
///////////////////////////////
const app = express();
const dataHandleApp = express();
const historicalDataApp = express();
const analyticsApp = express();
const authApp = express();
///////////////////////////////
const cors = require("cors");
const bodyParser = require("body-parser");
const { admin, db, auth } = require("./config/firebasev8");
const authRouter = require("./Routes/Auth/authRoutes");
const performanceRouter = require("./Routes/PerformanceDetails/performingStocks");
const handleDataRouter = require("./Routes/CompanyData/companyRoutes");
const { historicalRouter } = require("./Routes/Historical/historicalData");
const { sectorRouter } = require("./Routes/sector/sectorRoute");
//routers for ipo
const ipoUpcomingRouter = require("./Routes/Ipo/upcoming");
const ipoDetailsRouter = require("./Routes/Ipo/details");
const ipoAddRouter = require("./Routes/Ipo/add");
const ipoRecentRouter = require("./Routes/Ipo/recent");
const ipoCurrentRouter = require("./Routes/Ipo/current");
const ipoSearchRouter = require("./Routes/Ipo/search");
const { adminRouter } = require("./Routes/Admin/adminRoutes");
const uploadRouter = require("./Routes/Admin/uploadCsv");
const analyticsRouter = require("./Routes/Analytics/analyticsRoutes");
const predictionRouter = require('./Routes/Predictions/predict');
var schedule = require("node-schedule");
const { downloadRouter } = require("./Routes/compareData/compareData");
//importing the middleware to check client side token
const verifyToken = require("./middlewares/authCheck");
const updateCloudfunction = require("./Routes/PerformanceDetails/updatePercent");
////update recent function///////////////

////initializing app for handling authentication and getting company data
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/////initializing app for handling data
dataHandleApp.use(cors({ origin: true }));
dataHandleApp.use(bodyParser.json());
dataHandleApp.use(bodyParser.urlencoded({ extended: false }));

///////////////initializing app for handling historical data///

historicalDataApp.use(cors({ origin: true }));
historicalDataApp.use(bodyParser.json());
historicalDataApp.use(bodyParser.urlencoded({ extended: false }));
//////////////////analytics app//////////////////////
analyticsApp.use(cors({ origin: true }));
analyticsApp.use(bodyParser.json());
analyticsApp.use(bodyParser.urlencoded({ extended: false }));
///////////////////
authApp.use(cors({ origin: true }));
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded({ extended: false }));
/////////////////////
authApp.use("/auth", authRouter);

/////////////////

app.use("/data", handleDataRouter);
app.use("/admin", adminRouter);
app.use("/performance", performanceRouter);

app.use("/ipo/upcoming", ipoUpcomingRouter);
app.use("/ipo/recent", ipoRecentRouter);
app.use("/ipo/current", ipoCurrentRouter);
app.use("/ipo/details", ipoDetailsRouter);
app.use("/ipo/add", ipoAddRouter);
app.use("/ipo/search", ipoSearchRouter);



//////////////////////////////////////////////////////////////////////////////////////////////

///setting middlerae in use for dataHandleApp
dataHandleApp.use("/upload", uploadRouter);
dataHandleApp.use("/downloadComparison", downloadRouter);
//////////////////////////////////////////////////////////////////////////////////////////////

/////setting middlerae in use for historicalDataApp//////
historicalDataApp.use("/historical", historicalRouter);
historicalDataApp.use("/sector", sectorRouter);
/////////////////analytics app routes///////////////////////
analyticsApp.use("/stats", analyticsRouter);
analyticsApp.use('/stocks/prediction', predictionRouter);
// exports.updatePercent=updateCloudfunction;
///https server for handling authentication and
exports.server = functions.https.onRequest(app);

exports.authserver = functions
  .runWith({ timeoutSeconds: 305 })
  .https.onRequest(authApp);

//seperate server for handling data upload functionality
exports.data = functions.https.onRequest(dataHandleApp);
///function to get historical data//////
exports.historical = functions.https.onRequest(historicalDataApp);
////////////////////////////////////////
exports.analytics = functions.https.onRequest(analyticsApp);
