const { auth, db } = require("../config/firebasev8");

var verifyAdmin = async (req, res, next) => {
  try {
    const idToken = req.headers["authorization"];

    if (idToken) {
      const user = await auth.verifyIdToken(idToken);
      var userRef = db.collection("admin").doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            next();
          } else {
            res.status(401).send("Unauthorized");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(401).json({ error: " No idtoken found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyAdmin;
