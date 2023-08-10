const { admin, db, auth } = require("../../config/firebasev8");
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

const getCompany = async(companyName) => {
    try {
        const companyInfo = await db
            .collection("companies")
            .where("lowerCaseName", "==", companyName.toLowerCase())
            .get();
        return companyInfo.docs[0].data();
    } catch (err) {
        console.log(err);
    }
}

const getRecent = async(name, se) => {
    try {
        const c_ref = collection(dbn, "companies");
        const q = query(
            c_ref,
            where("lowerCaseName", "==", name.toLowerCase()),
            where("seListed", "array-contains", se)
        );

        getDocs(q)
            .then((snapshot) => {
            if (snapshot.docs.length == 0)
                return {
                success: false,
                message: "Incorrect combination of company name and stock exchange",
                };

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
            });
        });
    } catch (err) {
        console.log(err);
        return { success: false, message: "Internal server error" }
    }
}


const getCompanies = async() => {
    try {
        var companiesRef = await db.collection("companies").get();
        var companies = [];
        for(docu of companiesRef.docs) {
            companies.push(docu.data());
        }
        return companies;
    } catch (error) {
        console.log(error);
    }
}

const getDisabledCompanies = async() => {
    try {
        var companiesRef = await db.collection("Disabled_companies").get();
        var companies = [];
        for(docu of companiesRef.docs) {
            companies.push(docu.id);
        }
        return companies;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getCompany,
    getRecent,
    getCompanies,
    getDisabledCompanies
}