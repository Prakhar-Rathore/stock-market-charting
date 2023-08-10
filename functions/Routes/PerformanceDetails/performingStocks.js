const express = require("express");
const performanceRouter = express.Router();
const { admin, db, auth } = require("../../config/firebasev8");

performanceRouter.post("/getbest", async (req, res) => {
    try {
        const performance = await db
        .collection("companies")
        .orderBy("changepct", "desc")
        .limit(5)
        .get();
        res.json(performance.docs.map(doc => doc.data()));
    } catch (error) {
        res.status(500).json({ error: error.code });
    }
})

performanceRouter.post("/getworst", async (req, res) => {
    try {
        const performance = await db
        .collection("companies")
        .orderBy("changepct", "asc")
        .limit(5)
        .get();
        res.json(performance.docs.map(doc => doc.data()));
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = performanceRouter;