const { admin, db, auth } = require("../../config/firebasev8");

const getExtraInfo = async (uid) => {
  try {
    var userExtraInfo = await db.collection("users").doc(uid).get();
    if (userExtraInfo.exists) {
      const firstName = userExtraInfo.data().firstName;
      const lastName = userExtraInfo.data().lastName;
      return { firstName, lastName };
    } else {
      return { firstName: "", lastName: "" };
    }
  } catch (error) {
    console.log(error);
  }
};

const firebaseAuthDisableUser = async (uid) => {
  try {
    await auth.updateUser(uid, { disabled: true });
  } catch (error) {
    console.log(error);
  }
};
const firebaseAuthEnableUser = async (uid) => {
  try {
    await auth.updateUser(uid, { disabled: false });
  } catch (error) {
    console.log(error);
  }
};

const deleteFromAuthAndDB = async (uid) => {
  try {
    await db.collection("users").doc(uid).delete();
    await auth.deleteUser(uid);
  } catch (error) {
    console.log(error);
  }
};
const fireBaseListUsers = async () => {
  try {
    const users = await auth.listUsers();
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getExtraInfo,
  firebaseAuthDisableUser,
  firebaseAuthEnableUser,
  deleteFromAuthAndDB,
  fireBaseListUsers,
};
