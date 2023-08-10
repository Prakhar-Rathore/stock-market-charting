const express = require('express');
const ipoCurrentRouter = express.Router();
const {collection, getDocs, where, Timestamp, query, orderBy } = require('firebase/firestore');

const db = require('../../config/firebasev9');
const {timestampToDateIST} = require('./helperFunctions');

ipoCurrentRouter.use(express.json());
ipoCurrentRouter.use(express.urlencoded({extended: false}));

const iposRef = collection(db, 'ipos');
const q = query(iposRef, where("issueEnd", '>=', Timestamp.now()), orderBy("issueEnd"));

ipoCurrentRouter.get('/', (req, res) => {
    getDocs(q).then((snapshot) => {
        let ipos = [];
        
        snapshot.docs.forEach((doc) => {
            const doc_data = doc.data();
            
            if (doc_data.issueStart <= Timestamp.now())
            {
                //since firestore returns dates in seconds and nanoseconds
                doc_data.issueStart = timestampToDateIST(doc_data.issueStart);
                doc_data.issueEnd = timestampToDateIST(doc_data.issueEnd);

                ipos.push(doc_data);
            }
        })

        return res.status(200).json({success: true, data: ipos});
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    })
})

module.exports = ipoCurrentRouter;