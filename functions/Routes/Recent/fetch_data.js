const express = require("express");
const { db } = require("../../config/firebasev8");
const { spawn, spawnSync, exec } = require("child_process");
const stockRouter = express.Router();

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
} = require("firebase/firestore");
const { json } = require("body-parser");

stockRouter.get("/", async (req, res) => {
  const companyInfo = await db.collection("companies").get();
  const companyNames = [];
  companyInfo.forEach((doc) => {
    companyNames.push({
      id: doc.id,
      name: doc.data().name,
      ticker: doc.data().ticker,
    });
});

    for (const company of companyNames) {
        const python = spawn('python3', ['./Routes/Recent/fetch_data.py', company.id, company.name, company.ticker]);

        python.on('close', (code) => {
            console.log(`Data Fetch child process exited with code ${code}`);
        });
    }

    for( const company of companyNames) {
        const python = spawn('python3', ['./Routes/Recent/analytics.py', company.id, company.name, company.ticker]);
        
        python.on('close', (code) => {
            console.log(`Analytics child process exited with code ${code}`);
        });
    }

    for( const company of companyNames) {
      const python = spawn('python3', ['./Routes/Recent/historical.py', company.id, company.name, company.ticker]);
      
      python.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
      });
      python.on('close', (code) => {
          console.log(`Historical child process exited with code ${code}`);
      });
  }

    res.status(200).json({ success: true});
});

module.exports = stockRouter;
