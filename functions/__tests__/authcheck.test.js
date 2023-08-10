// const verifyToken = require("../middlewares/authCheck")
// const authfunctions = require("./middlewares/authcheckfunctions")
// const s = { status: 401 };
// const m = { status: 500 };
// const users = {
//     1: { data: { idToken: 1, decodedToken: "John Doe" } },
//     2: { data: { idToken: 2, decodedToken: "Jane Doe" } },
//   };
// const authUsers = {
//     users: [
//       {
//         idToken: 1,
//         decodedToken: "John Doe"
//       },
//       {
//         idToken: 2,
//         decodedToken: "Jane Doe"
//       },
//     ],
//   };
//   describe("verifyToken testing", () => {
//     ///// verifyidToken //////
//     describe("verifyToken", () => {
//       it("get corresponding idtoken and decodedtoken if it exists in db", async () => {
//         const spy = jest
//           .spyOn(authfunctions, "verifyIdToken")
//           .mockImplementation(async (idToken) => {
//             if (idToken == 1) {
//               return {
//                 decodedToken: "John Doe"
//               };
//             }
//             else if  (idToken == 2) {
//                 return {
//                   decodedToken: "Jane Doe"
//                 };
//               }
//             else {
//               return { decodedToken: "" };
//             }
//           });
//         const usersArray = await authfunctions.verifyIdToken(authUsers);
//         expect(spy).toHaveBeenCalledTimes(1);
//         if(usersArray.idToken==1){
//             expect(usersArray.decodedToken).toEqual(users[idToken].data.decodedToken)
//         }
//         else if (usersArray.idToken==2){
//             expect(usersArray.decodedToken).toEqual(users[idToken].data.decodedToken)
//         }
//         else
//         expect(usersArray.decodedToken).toEqual("")
//         spy.mockRestore();
//       });
//     });
// });
// verifyIdToken = jest.fn()
// verifyIdToken.mockImplementation(value => {
//     if (value.status == 401){
//         return("No token")

//     }
// if (value.status == 500){
//     return("error message")
// }});

// describe ("", () => {
//     test("", () => {
//       const verify = verifyIdToken(s)

//       expect(verify).toEqual("No token")

//     })
//     test("", () => {
//         const check = verifyIdToken(m)

//         expect(check).toEqual("error message")

//       })
//   })
