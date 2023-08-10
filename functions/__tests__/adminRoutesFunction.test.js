const adminRoutesFunction = require("../Routes/Admin/adminRoutesFunction");

const {
  getUsers,
  deleteUsers,
  disableUser,
  enableUser,
  listUsers,
} = require("../Routes/Admin/adminRoutes");

const users = {
  1: { data: { firstName: "John", lastName: "Doe" } },
  2: { data: { firstName: "Jane", lastName: "Doe" } },
};
const authUsers = {
  users: [
    {
      uid: 1,
      email: "johndoe@gmail.com",
      disabled: false,
      displayName: "John Doe",
      emailVerified: true,
    },
    {
      uid: 2,
      email: "janedoe@gmail.com",
      disabled: true,
      displayName: "Jane Doe",
      emailVerified: true,
    },
  ],
};

describe("adminRoutes testing", () => {
  ///// getUsers //////
  describe("getUsers", () => {
    it("getUsers with spyOn and users exist in db", async () => {
      const spy = jest
        .spyOn(adminRoutesFunction, "getExtraInfo")
        .mockImplementation(async (uid) => {
          if (uid in users) {
            return {
              firstName: users[uid].data.firstName,
              lastName: users[uid].data.lastName,
            };
          } else {
            return { firstName: "", lastName: "" };
          }
        });
      const usersArray = await getUsers(authUsers);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(usersArray).toEqual([
        {
          uid: 1,
          email: "johndoe@gmail.com",
          disabled: false,
          displayName: "John Doe",
          emailVerified: true,
          firstName: "John",
          lastName: "Doe",
        },
        {
          uid: 2,
          email: "janedoe@gmail.com",
          disabled: true,
          displayName: "Jane Doe",
          emailVerified: true,
          firstName: "Jane",
          lastName: "Doe",
        },
      ]);
      spy.mockRestore();
    });
  });

  ///test deleteUsers/////////

  describe("deleteUsers", () => {
    it("deleteUsers with spyOn and users", async () => {
      const spy = jest
        .spyOn(adminRoutesFunction, "deleteFromAuthAndDB")
        .mockImplementation(async (uid) => {
          if (uid in users) {
            delete users[uid];
          }
          for (let i = 0; i < authUsers.users.length; i++) {
            if (authUsers.users[i].uid === uid) {
              authUsers.users.splice(i, 1);
            }
          }
        });
      const { uid } = authUsers.users[0];
      // console.log(uid);
      await deleteUsers(uid);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(users).toEqual({
        2: { data: { firstName: "Jane", lastName: "Doe" } },
      });
      expect(authUsers).toEqual({
        users: [
          {
            uid: 2,
            email: "janedoe@gmail.com",
            disabled: true,
            displayName: "Jane Doe",
            emailVerified: true,
          },
        ],
      });
      spy.mockRestore();
    });
  });
  ////since first we have perform testing for deletion it deletes first user/////
  ///////test disableUser/////////
  describe("disableUser", () => {
    it("disableUser with spyOn and users", async () => {
      const spy = jest
        .spyOn(adminRoutesFunction, "firebaseAuthDisableUser")
        .mockImplementation(async (uid) => {
          for (let i = 0; i < authUsers.users.length; i++) {
            if (authUsers.users[i].uid === uid) {
              authUsers.users[i].disabled = true;
            }
          }
        });
      const { uid } = authUsers.users[0];
      console.log(uid);
      await disableUser(uid);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(authUsers).toEqual({
        users: [
          {
            uid: 2,
            email: "janedoe@gmail.com",
            disabled: true,
            displayName: "Jane Doe",
            emailVerified: true,
          },
        ],
      });
      spy.mockRestore();
    });
  });

  ///////test enableUser/////////
  describe("enableUser", () => {
    it("enableUser with spyOn and users", async () => {
      const spy = jest
        .spyOn(adminRoutesFunction, "firebaseAuthEnableUser")
        .mockImplementation(async (uid) => {
          for (let i = 0; i < authUsers.users.length; i++) {
            if (authUsers.users[i].uid === uid) {
              authUsers.users[i].disabled = false;
            }
          }
        });
      const { uid } = authUsers.users[0];
      await enableUser(uid);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(authUsers).toEqual({
        users: [
          {
            uid: 2,
            email: "janedoe@gmail.com",
            disabled: false,
            displayName: "Jane Doe",
            emailVerified: true,
          },
        ],
      });
      spy.mockRestore();
    });
  });
  ///////test listUsers/////////
});
