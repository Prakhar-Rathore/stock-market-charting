from yahoo_fin.stock_info import get_data, get_stats
import datetime
import json
import sys
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def updateHistoric(id, name, ticker):
    prev_day = datetime.datetime.now() - datetime.timedelta(days=1)
    today = datetime.datetime.now()
    newDocID = prev_day.strftime("%d-%b-%Y")
    prev_year = prev_day.strftime("%Y")

    stats = get_stats(ticker).to_json()
    stats = json.loads(stats)

    JSON = get_data(ticker, prev_day, today, index_as_date=True).to_json()
    JSON = json.loads(JSON)

    prev_day_data = {}
    k = list(JSON['open'].keys())[0]

    for (key, value) in JSON.items():
        prev_day_data[key] = value[k]

    prev_day_data = {key: value for key, value in prev_day_data.items(
    ) if key != "ticker" and key != "adjclose"}
    prev_day_data["date"] = prev_day
    prev_day_data["50 dma"] = float(stats["Value"][[key for (key, value) in stats["Attribute"].items()
                                                    if value == "50-Day Moving Average 3"][0]])
    prev_day_data["200 dma"] = float(stats["Value"][[key for (key, value) in stats["Attribute"].items()
                                                     if value == "200-Day Moving Average 3"][0]])

    db.collection("companies")\
        .document(id)\
        .collection("stocks")\
        .document("NSE")\
        .collection("data")\
        .document("historic")\
        .collection(prev_year)\
        .document(newDocID)\
        .set(prev_day_data)


def execFunction():
    docs = db.collection(u'companies').stream()
    companyNames = []
    for doc in docs:
        id = doc.id
        data = doc.to_dict()
        updateHistoric(id, data['name'], data['ticker'])


def update_historic(event, context):
    execFunction()
    """Triggered from a message on a Cloud Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
