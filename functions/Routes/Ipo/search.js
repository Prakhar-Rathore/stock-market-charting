const express = require('express');
const ipoSearchRouter = express.Router();
const {collection, getDocs, query, orderBy, startAt, endAt } = require('firebase/firestore');

const db = require('../../config/firebasev9');

const iposRef = collection(db, 'ipos');

ipoSearchRouter.get('/', (req, res) => {
    const {name} = req.query;

    if (!name)
        return res.status(400).json({success: false, message: 'No name parameter provided'});

    const lcname = name.toLowerCase();
    let ipoNames = [];
    const q = query(iposRef, orderBy("lowerCaseCompanyName"), startAt(lcname), endAt(lcname+'\uf8ff'));

    getDocs(q).then((snapshot) => {
        
        snapshot.docs.forEach((doc) => {
            const doc_data = doc.data();
            ipoNames.push(doc_data.companyName);
        })

        return res.status(200).json({success: true, data: ipoNames});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    })
})

module.exports = ipoSearchRouter;