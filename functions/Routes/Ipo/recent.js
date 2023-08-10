const express = require('express');
const ipoRecentRouter = express.Router();
const {collection, getDocs, where, Timestamp, query, orderBy } = require('firebase/firestore');

const db = require('../../config/firebasev9');
const {timestampToDateIST, validateYear} = require('./helperFunctions');

ipoRecentRouter.use(express.json());
ipoRecentRouter.use(express.urlencoded({extended: false}));

const iposRef = collection(db, 'ipos');

//get all ipos of a calendar year

ipoRecentRouter.get('/', (req, res) => {
    let {year} = req.query;

    const currentYear = new Date().getFullYear();
    let startYear = currentYear;
    let endTime = Timestamp.now();

    if (year)
    {
        if (!validateYear(year))
            return res.status(400).json({success: false, message: 'Invalid year'});

        year = parseInt(year);

        if (year > currentYear)
            return res.status(400).json({success: false, message: 'Year cannot be greater than current year'});
        
        startYear = Math.min(startYear, year);

        if (year < currentYear)
            endTime = Timestamp.fromDate(new Date(startYear + 1, 0, 1));
    }

    const startTime = new Date(startYear, 0, 1);

    const q = query(iposRef, where("issueEnd", '<', endTime), where("issueEnd", ">", startTime), orderBy("issueEnd", "desc"));

    getDocs(q).then((snapshot) => {
        let ipos = [];
        
        snapshot.docs.forEach((doc) => {
            const doc_data = doc.data();
            
            //since firestore returns dates in seconds and nanoseconds
            doc_data.issueStart = timestampToDateIST(doc_data.issueStart);
            doc_data.issueEnd = timestampToDateIST(doc_data.issueEnd);

            ipos.push(doc_data);
        })

        return res.status(200).json({success: true, data: ipos});
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    })
})

module.exports = ipoRecentRouter;