
import base64
from yahoo_fin.stock_info import get_analysts_info, get_stats, get_live_price, get_quote_data, get_quote_table
from yahoo_fin.news import get_yf_rss as get_news
import sys
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def updateRecent(id, name, ticker):
    data = get_quote_data(ticker)
    table = get_quote_table(ticker)
    hilo = table["Day's Range"].split(' - ')
    hilo52 = table["52 Week Range"].split(' - ')
    recent = dict()
    recent["ticker"] = ticker
    recent["bookval"] = data["bookValue"]
    recent["changepct"] = data["regularMarketChangePercent"]
    recent["currency"] = data["financialCurrency"]
    recent["divyield"] = data["trailingAnnualDividendYield"]
    recent["high"] = str(hilo[1])
    recent["low"] = str(hilo[0])
    recent["high52"] = str(hilo52[1])
    recent["low52"] = str(hilo52[0])
    recent["marketcap"] = data["marketCap"]
    recent["pe"] = table["PE Ratio (TTM)"]
    recent["price"] = table["Quote Price"]
    recent["price open"] = table["Open"]
    recent["volume"] = table["Volume"]
    recent["faceval"] = "NA"
    recent["pb"] = "NA"
    recent["sectorpe"] = "NA"

    db.collection("companies")\
        .document(id)\
        .collection("stocks")\
        .document("NSE")\
        .collection("data")\
        .document("recent")\
        .set(recent)

    db.collection("companies")\
        .document(id)\
        .update({"changepct": recent["changepct"]})


def execFunction():
    docs = db.collection(u'companies').stream()
    companyNames = []
    for doc in docs:
        id = doc.id
        data = doc.to_dict()
        updateRecent(id, data['name'], data['ticker'])


def update_recent(event, context):
    execFunction()
    """Triggered from a message on a Cloud Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
