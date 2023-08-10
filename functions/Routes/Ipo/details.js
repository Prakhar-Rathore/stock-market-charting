const express = require('express');
const ipoDetailsRouter = express.Router();
const {collection, getDocs, where, query, doc, getDoc } = require('firebase/firestore');

const db = require('../../config/firebasev9');
const {timestampToDateIST} = require('./helperFunctions');

const iposRef = collection(db, 'ipos');

ipoDetailsRouter.get('/', (req, res) => {
    const {companyName} = req.query;

    if (!companyName)
        return res.status(400).json({success: false, message: 'No companyName parameter provided'});

    const q = query(iposRef, where("companyName", '==', companyName));

    getDocs(q).then((snapshot) => {

        if (snapshot.docs.length == 0)
            return res.status(404).json({success: false, message: 'No ipo found for this company'});
        
        const document = snapshot.docs[0];
    
        const doc_data = document.data();
        
        //since firestore returns dates in seconds and nanoseconds
        doc_data.issueStart = timestampToDateIST(doc_data.issueStart);
        doc_data.issueEnd = timestampToDateIST(doc_data.issueEnd);

        const detailsRef = doc(db, document.ref.path, 'detailsCol', 'details');

        getDoc(detailsRef).then((snapshot) => {
            const details = snapshot.data();
            return res.status(200).json({success: true, data: {...doc_data, ...details}});
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    })
})

module.exports = ipoDetailsRouter;