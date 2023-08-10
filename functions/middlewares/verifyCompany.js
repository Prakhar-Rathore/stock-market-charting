const dbn = require("../config/firebasev9");
const { doc, getDoc } = require("firebase/firestore");
const verifyCompany = async (req, res, next) => {
  try {
    const companyname = req.headers["companyname"];
    if (companyname) {
      const id = companyname.toLowerCase();
      const disabledCompanyRef = doc(dbn, "Disabled_companies", id);
      const docSnap = await getDoc(disabledCompanyRef);
      if (docSnap.exists()) {
        res.status(400).send({ message: "Company is disabled" });
        return;
      }
      next();
    } else {
      res.status(401).send({ message: "no ticker found in request headers" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyCompany;
