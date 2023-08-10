const express = require("express");
const companyRouter = express.Router();
const { db } = require("../../config/firebasev8");
const dbn = require("../../config/firebasev9");
const {
  orderBy,
  startAt,
  endAt,
  getDocs,
  collection,
  query,
  getDoc,
  where,
  doc,
  setDoc,
  addDoc,
} = require("firebase/firestore");
const companyRoutesFunction = require("./companyRoutesfunction");

const removeCommas = (str) => {
  var res = str.replace(/,/g, "");
  return res;
};
const checkStringNumber = (str) => {
  if (isNaN(str)) {
    return false;
  }
  return true;
};

const cleanRecentData = (data) => {
  var res = {};
  for (var key in data) {
    var val = data[key];
    if (typeof data[key] === "string") {
      val = removeCommas(data[key]);
    }
    if (checkStringNumber(val)) {
      res[key] = parseFloat(val);
      continue;
    }
    res[key] = val;
  }
  return res;
};

const companyInfo = async(companyName) => {
  try {
      const company = await companyRoutesFunction.getCompany(companyName);
      return company;
  } catch (error) {
      console.log(error);
  }
}   

const getEnableDisabledCompanies = async() => {
  try {
      const users = await companyRoutesFunction.getCompanies();
      const enabled = [];
      const disabled = await companyRoutesFunction.getDisabledCompanies();
      for (docs of users) {
          if (disabled.includes(docs.lowerCaseName)) {
              continue;
          }
          enabled.push(docs.lowerCaseName);
      }
      return { enabled, disabled };
  } catch (error) {
      console.log(error);
  }
}

const allCompanies = async() => {
  try {
      const companies = await companyRoutesFunction.getCompanies();
      return companies;
  } catch (error) {
      console.log(error);
  }
}

const recentData = async(companyName, se) => {
  try {
      const recent = await companyRoutesFunction.getRecent(companyName, se);
      return recent;
  } catch (error) {
      console.log(error);
  }
}

///////////////////////////route to add company////////////////////////////////////////

// companyRouter.post("/addCompany", async (req, res) => {
//   try {
//     const {
//       about,
//       boardMembers,
//       ceo,
//       founded,
//       hq,
//       industry,
//       name,
//       seListed,
//       sector,
//       tickers,
//     } = req.body;
//     const lowerCaseName = name.toLowerCase();
//     var changepct = 0;
//     const companyRef = collection(dbn, "companies");
//     const companyDocCheck = query(
//       companyRef,
//       where("lowerCaseName", "==", name.toLowerCase())
//     );
//     const companyDocSnap = await getDocs(companyDocCheck);
//     if (companyDocSnap.docs.length > 0) {
//       res.status(400).send({ message: "company already exists" });
//       return;
//     }
//     const comanyDoc = await addDoc(companyRef, {
//       about,
//       boardMembers,
//       ceo,
//       founded,
//       hq,
//       industry,
//       name,
//       seListed,
//       sector,
//       lowerCaseName,
//       tickers,
//     });

//     const companyId = comanyDoc.id;
//     for (var i = 0; i < tickers.length; i++) {
//       await setDoc(
//         doc(dbn, "companies/" + companyId + "/stocks", seListed[i]),
//         {
//           ticker: tickers[i],
//           seCode: seListed[i],
//         }
//       );
//       await setDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[i] + "/data",
//           "historic"
//         ),
//         {}
//       );
//       await setDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[i] + "/data",
//           "recent"
//         ),
//         {}
//       );
//     }

//     res.status(200).json({ companyId });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// /////////////////////////////////////////////////////////////////////

// companyRouter.post("/addHistoricRecent", async (req, res) => {
//   try {
//     const companyRef = collection(dbn, "companies");
//     const getallCompany = await getDocs(companyRef);
//     var co = 0;
//     for (var i = 0; i < getallCompany.docs.length; i++) {
//       const companyId = getallCompany.docs[i].id;
//       seListed = getallCompany.docs[i].data().seListed;
//       // console.log(seListed);
//       var checkifExists = await getDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[0] + "/data/stats"
//         )
//       );
//       if (checkifExists.exists()) {
//         co += 1;
//         continue;
//       }
//       await setDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[0] + "/data",
//           "historic"
//         ),
//         {}
//       );
//       await setDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[0] + "/data",
//           "recent"
//         ),
//         {}
//       );
//       await setDoc(
//         doc(
//           dbn,
//           "companies/" + companyId + "/stocks/" + seListed[0] + "/data",
//           "stats"
//         ),
//         {}
//       );
//     }

//     res.status(200).json(co);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

////////////////////////////////////////////////////////

companyRouter.post("/getCompanyInfo", async (req, res) => {
  try {
    var quer = req.body.NAME;
    quer = quer.toLowerCase();
    const companyInfo = await db
      .collection("companies")
      .where("lowerCaseName", "==", quer)
      .get();
    if (companyInfo.empty) {
      res.status(500).send("Company not found");
    } else {
      resarr = [];
      companyInfo.forEach((doc) => {
        resarr.push(doc.data());
      });
      res.status(200).send(resarr);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

///////////////////////////////////////////////////////////

companyRouter.get("/getAllCompanyNames", async (req, res) => {
  try {
    const companyInfo = await db.collection("companies").get();
    const companyNames = [];
    for (var i = 0; i < companyInfo.docs.length; i++) {
      const docRef = doc(
        dbn,
        "Disabled_companies",
        companyInfo.docs[i].data().lowerCaseName
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        continue;
      }
      companyNames.push(companyInfo.docs[i].data().name);
    }
    return res.json(companyNames);
  } catch (err) {
    res.status(500).send(err);
  }
});

companyRouter.get("/getEnableDisabled", async (req, res) => {
  try {
    const companyInfo = await db.collection("companies").get();
    var enabledNames = [];
    var disabledNames = [];
    for (var i = 0; i < companyInfo.docs.length; i++) {
      const docRef = doc(
        dbn,
        "Disabled_companies",
        companyInfo.docs[i].data().lowerCaseName
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        disabledNames.push(companyInfo.docs[i].data().name);
        continue;
      }
      enabledNames.push(companyInfo.docs[i].data().name);
    }
    res.status(200).send({ enabled: enabledNames, disabled: disabledNames });
  } catch (err) {
    res.status(500).send(err);
  }
});

//////get recent data/////////////////////

companyRouter.get("/recent", (req, res) => {
  const c_ref = collection(dbn, "companies");
  const { name, se } = req.query;
  const q = query(
    c_ref,
    where("lowerCaseName", "==", name.toLowerCase()),
    where("seListed", "array-contains", se)
  );

  getDocs(q)
    .then((snapshot) => {
      if (snapshot.docs.length == 0)
        return res.status(404).json({
          success: false,
          message: "Incorrect combination of company name and stock exchange",
        });

      snapshot.docs.forEach((document) => {
        const recent_ref = doc(
          dbn,
          document.ref.path,
          "stocks",
          se,
          "data",
          "recent"
        );

        getDoc(recent_ref)
          .then((doc_snap) => {
            const data = doc_snap.data();
            data.priceclose = data.price; //renaming the property
            delete data.price;
            parseddata = cleanRecentData(data);
            return res.status(200).json({ success: true, data: parseddata });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error" });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
});

///prefix search company/////

companyRouter.get("/search", (req, res) => {
  const c_ref = collection(dbn, "companies");
  const { name } = req.query;
  lcname = name.toLowerCase();
  let data = [];
  const q = query(
    c_ref,
    orderBy("lowerCaseName"),
    startAt(lcname),
    endAt(lcname + "\uf8ff")
  );

  getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const doc_data = doc.data();
        let obj = { name: doc_data.name, seListed: doc_data.seListed };
        data.push(obj);
      });

      if (data.length == 0)
        return res
          .status(404)
          .json({ success: false, message: "No companies found" });

      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
});

///////read csv data from firebase and upload to firestore/////////////////

module.exports = 
{  companyRouter,
   companyInfo,
   getEnableDisabledCompanies,
   allCompanies,
   recentData};
