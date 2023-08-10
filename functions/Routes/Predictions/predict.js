const express = require('express');
const db = require('../../config/firebasev9');
const { where, query, collection, getDoc, getDocs, doc } = require('firebase/firestore');
const predictionRouter = express.Router();

const compRef = collection(db, 'companies');

predictionRouter.get('/', async (req, res) => {
    const {ticker} = req.query;

    if (!ticker)
        return res.status(400).json({success: false, message: 'No ticker parameter provided'});

    try
    {
        const q = query(compRef, where('ticker', '==', ticker));
        const snapshot = await getDocs(q);

        if (snapshot.docs.length === 0)
            return res.status(404).json({success: false, message: 'Stock not found'});

        const document = snapshot.docs[0];

        const predDocRef = doc(db, document.ref.path, 'stocks', 'NSE', 'data', 'prediction');
        const predDoc = await getDoc(predDocRef);
        const predData = predDoc.data();
        return res.status(200).json({success: true, data: predData});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
})

module.exports = predictionRouter;