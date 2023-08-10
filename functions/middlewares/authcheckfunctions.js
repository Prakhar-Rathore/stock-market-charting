const { auth } = require("../config/firebasev8");
const verifyIdToken = async (idToken) => {
  if (idToken) {
    const result = await auth.verifyIdToken(idToken);
    return result;
  } else {
    return "Invalid token";
  }
};

module.exports = { verifyIdToken };
