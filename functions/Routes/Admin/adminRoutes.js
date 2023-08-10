const express = require("express");
const adminRouter = express.Router();
const { admin, db, auth } = require("../../config/firebasev8");
const verifyAdmin = require("../../middlewares/adminCheck");
const verifyCompanyEnable = require("../../middlewares/verifyCompany");
const adminRoutesFunction = require("./adminRoutesFunction");
const dbn = require("../../config/firebasev9");
const { doc, getDoc, deleteDoc, setDoc } = require("firebase/firestore");
/////////////////////////////////////
const getUsers = async (users) => {
  let usersArray = [];
  for (let i = 0; i < users.users.length; i++) {
    let user = users.users[i];
    const userExtraInfo = await adminRoutesFunction.getExtraInfo(user.uid);

    var firstName = userExtraInfo.firstName;
    var lastName = userExtraInfo.lastName;
    usersArray.push({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      disabled: user.disabled,
      firstName,
      lastName,
    });
  }
  return usersArray;
};

const deleteUsers = async (uid) => {
  await adminRoutesFunction.deleteFromAuthAndDB(uid);
};

const disableUser = async (uid) => {
  await adminRoutesFunction.firebaseAuthDisableUser(uid);
};

const enableUser = async (uid) => {
  await adminRoutesFunction.firebaseAuthEnableUser(uid);
};

const listUsers = async () => {
  const users = await adminRoutesFunction.fireBaseListUsers();
  return users;
};

////////////////////////////////

adminRouter.get("/isAdmin", verifyAdmin, (req, res) => {
  return res.status(200).json({ message: "Admin" });
});

adminRouter.get("/getUsers", verifyAdmin, async (req, res) => {
  try {
    var users = await listUsers();
    let usersArray = await getUsers(users);
    return res.status(200).json({ users: usersArray });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

adminRouter.delete("/removeUser", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.query;
    await deleteUsers(uid);
    var users = await listUsers();
    let usersArray = await getUsers(users);
    return res.status(200).json({ message: "User deleted", users: usersArray });
  } catch (err) {
    res.status(500).send(err);
  }
});
///search user by email
adminRouter.get("/searchUsersByEmail", verifyAdmin, async (req, res) => {
  try {
    const { email } = req.query;
    const re = await auth.getUserByEmail(email);
    res.status(200).send({ user: [re] });
  } catch (err) {
    res.status(500).send(err);
  }
});

adminRouter.put("/disableUser", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.body;
    await disableUser(uid);
    res.status(200).send({ message: "User disabled" });
  } catch (err) {
    res.status(500).send(err);
  }
});

adminRouter.put("/enableUser", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.body;
    await enableUser(uid);
    res.status(200).send({ message: "User enabled" });
  } catch (err) {
    res.status(500).send(err);
  }
});

adminRouter.put("/enableCompany", verifyAdmin, async (req, res) => {
  try {
    const companyname = req.headers["companyname"];
    if (!companyname) {
      return res.status(400).send({ message: "No ticker found" });
    } else {
      const id = companyname.toLowerCase();
      var docRef = doc(dbn, "Disabled_companies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await deleteDoc(docRef);
        res.status(200).send({ message: "Company enabled" });
      } else {
        return res.status(200).send({
          message: "Invalid company ticker or company already enabled",
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

adminRouter.put(
  "/disableCompany",
  verifyAdmin,
  verifyCompanyEnable,
  async (req, res) => {
    try {
      const companyname = req.headers["companyname"];
      if (!companyname) {
        return res.status(400).send({ message: "No ticker found" });
      } else {
        const id = companyname.toLowerCase();
        const docRef = await setDoc(doc(dbn, "Disabled_companies", id), {});
        return res.status(200).send({ message: "Company disabled" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = {
  adminRouter,
  getUsers,
  deleteUsers,
  disableUser,
  enableUser,
  listUsers,
};
