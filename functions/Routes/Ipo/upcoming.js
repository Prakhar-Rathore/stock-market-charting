const express = require('express');
const ipoUpcomingRouter = express.Router();
const {collection, getDocs, where, Timestamp, query, orderBy } = require('firebase/firestore');

const db = require('../../config/firebasev9');
const {timestampToDateIST} = require('./helperFunctions');

ipoUpcomingRouter.use(express.json());
ipoUpcomingRouter.use(express.urlencoded({extended: false}));

const iposRef = collection(db, 'ipos');
const q = query(iposRef, where("issueStart", '>', Timestamp.now(), orderBy("issueStart")));

ipoUpcomingRouter.get('/', (req, res) => {

    getDocs(q).then((snapshot) => {
        let ipos = [];
        
        snapshot.docs.forEach((doc) => {
            const doc_data = doc.data();
            
            //firestore returns dates in seconds and nanoseconds; convert them to JS dates
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

module.exports = ipoUpcomingRouter;