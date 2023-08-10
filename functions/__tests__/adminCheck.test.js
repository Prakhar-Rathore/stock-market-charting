const docData = { data: "bIdXzbDWEjf3JpVRvpa6iTq6D4Y2" };
const docResult = {

  data: () => docData
};
verifyIdToken = jest.fn()

// const verifyIdToken = jest.fn((token) => {
//     return token;
//     })
verifyIdToken.mockImplementation(value => value);
const auth = () => {
    return { verifyIdToken }
  };

describe ("", () => {
  test("", () => {
    const verify = verifyIdToken("bIdXzbDWEjf3JpVRvpa6iTq6D4Y")
    
    expect(verify).toEqual("bIdXzbDWEjf3JpVRvpa6iTq6D4Y")
  })
})