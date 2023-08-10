const { auth } = require("../config/firebasev8");
const authcheckfunctions = require("./authcheckfunctions");
const verifyToken = async (req, res, next) => {
  try {
    const idToken = req.headers["authorization"];
    const result = await authcheckfunctions.verifyIdToken(idToken);
    if (result !== "Invalid token") {
      next();
    } else {
      res.status(401).json({ error: "No token" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyToken;
