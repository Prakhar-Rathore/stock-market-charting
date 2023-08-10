const PROD_SERV_ADDRESS_API =
  "https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/server";
const DEV_SERV_ADDRESS_API =
  "http://localhost:5000/stockmarketcharting-8c469/us-central1/server";
const DEV_SERV_ADDRESS_API_UPLOADDATA="http://localhost:5001/stockmarketcharting-8c469/us-central1/data"
const PROD_SERV_ADDRESS_API_UPLOADDATA="https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/data"

const AUTH_SERV_ADDRESS_API ="https://us-central1-stockmarketcharting-8c469.cloudfunctions.net/authserver"


export const routes = {AUTH_SERV_ADDRESS_API ,PROD_SERV_ADDRESS_API, DEV_SERV_ADDRESS_API, DEV_SERV_ADDRESS_API_UPLOADDATA, PROD_SERV_ADDRESS_API_UPLOADDATA };
