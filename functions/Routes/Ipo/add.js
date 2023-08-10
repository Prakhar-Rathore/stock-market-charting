const express = require('express');
const { addDoc, collection, doc, setDoc, Timestamp } = require('firebase/firestore');

const db = require("../../config/firebasev9");
const {checkNecessaryFields, checkIfIpoAlreadyInDb, checkUrl, checkStartEndDate} = require('./helperFunctions');

const ipoAddRouter = express.Router();
ipoAddRouter.use(express.json());
ipoAddRouter.use(express.urlencoded({extended: false}));

const compensateForIST = 5.5*60*60*1000;

ipoAddRouter.post('/', async (req, res) => {
    
    const necessaryFields = ['companyName', 'exchangesListed', 'securityType', 'issueStart', 'issueEnd', 'symbol'];
    let result = checkNecessaryFields(req.body, necessaryFields);

    if (!result.success)
        return res.status(400).json({success: false, message: result.message});
    
    const {companyName, exchangesListed, securityType, issueStart, issueEnd, issuePrice, issueSize, marketLot,
    issueType, symbol, faceValue, sponsorBank, registrar, prospectusGidDownloadLink, aboutCompany, companyFinancials} = req.body;

    result = checkStartEndDate(issueStart, issueEnd); //checking if date fields are valid

    if (!result.success)
        return res.status(400).json({success: false, message: result.message});

    //check if prospectusGidDownloadLink is a valid url
    if (prospectusGidDownloadLink && !checkUrl(prospectusGidDownloadLink))
        return res.status(400).json({success: false, message: 'Invalid prospectusGidDownloadLink'});

    //add a new doc to ipos collection in firestore
    const iposRef = collection(db, 'ipos');
    
    try
    {
        //checking whether this ipo is already in the database
        result = await checkIfIpoAlreadyInDb(symbol);

        if (result)
            return res.status(400).json({success: false, message: 'Ipo already in database'});
        
        //add the IPO document to the collection of IPOs in the database
        const docRef = await addDoc(iposRef, {
            companyName: companyName,
            exchangesListed: exchangesListed,
            securityType: securityType,
            issueStart: Timestamp.fromMillis(Timestamp.fromDate(new Date(issueStart)).toMillis() - compensateForIST),
            issueEnd: Timestamp.fromMillis(Timestamp.fromDate(new Date(issueEnd)).toMillis() +(1000*60*60*24-1000) - compensateForIST),
            symbol : symbol,
            lowerCaseCompanyName: companyName.toLowerCase(),
            issuePrice: issuePrice ? issuePrice : null,
            issueSize: issueSize ? issueSize : null,
            marketLot: marketLot ? marketLot : null,
        });

        const detailsRef = doc(db, docRef.path, 'detailsCol', 'details');

        await setDoc(detailsRef, {
            issueType: issueType? issueType : null,
            faceValue: faceValue? faceValue : null,
            sponsorBank: sponsorBank? sponsorBank : null,
            registrar: registrar? registrar : null,
            prospectusGidDownloadLink: prospectusGidDownloadLink? prospectusGidDownloadLink : null,
            aboutCompany: aboutCompany? aboutCompany : null,
            companyFinancials: companyFinancials? companyFinancials : null
        });

        return res.status(200).json({success: true, message: 'IPO added successfully'});
    }

    catch(err)
    {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
})


module.exports = ipoAddRouter;