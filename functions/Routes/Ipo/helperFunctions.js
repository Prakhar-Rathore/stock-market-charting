const {getDocs, where, query, collection, Timestamp} = require('firebase/firestore');
const db = require('../../config/firebasev9');
const iposRef = collection(db, 'ipos');
const compensateForIST = 5.5*60*60*1000;

//function to check if url is valid
function checkUrl(url)
{
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
}

//function that takes in an object and an array of necessary fields and checks if all the necessary fiels are present
function checkNecessaryFields(object, necessaryFields)
{
    for (let i = 0; i < necessaryFields.length; i++)
    {
        const field = necessaryFields[i];

        if (!object[field] || object[field] === '')
            return {success: false, message: `${field} must be defined and non-empty.`};
    }

    return {success: true};
}

//function to check if start and end date are valid
function checkStartEndDate(startDate, endDate)
{
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    //regex to check if date is in format yyyy-mm-dd
    const re = /^\d{4}-\d{2}-\d{2}$/;

    if (!re.test(startDate))
        return {success: false, message: 'Invalid start date'};

    if (!re.test(endDate))
        return {success: false, message: 'Invalid end date'};

    if (start > end)
        return {success: false, message: 'Start date cannot be after end date'};
    
    return {success: true};
}

//function to check whhether an ipo is already in db
async function checkIfIpoAlreadyInDb(symbol)
{
    const q = query(iposRef, where("symbol", '==', symbol));
    const snapshot = await getDocs(q);

    if (snapshot.docs.length > 0)
        return true;
    else
        return false;
}


//function to change date from firestore timestamp to js date and compensate for IST
function timestampToDateIST(timestamp)
{
    if (!(timestamp instanceof Timestamp))
        return null;
    
    const startMilliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(startMilliseconds + compensateForIST);
}


//function to validate whether a string is a year
function validateYear(year)
{
    var re = /^[0-9]{4}$/;
    return re.test(year);
}

module.exports = {checkUrl, checkIfIpoAlreadyInDb, checkNecessaryFields, checkStartEndDate, timestampToDateIST, validateYear};