const express = require("express");
const authRouter = express.Router();
var schedule = require("node-schedule");
const { admin, db, auth } = require("../../config/firebasev8");

//will make call to this route to remove unverified users from the database
authRouter.post("/removeunverified", async (req, res) => {
  try {
    const uid = req.body.uid;
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    schedule.scheduleJob(date, async () => {
      const refetchuser = await admin.auth().getUser(uid);
      if (!refetchuser.emailVerified) {
        await db.collection("users").doc(uid).delete();
        await admin.auth().deleteUser(refetchuser.uid);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = authRouter;
