
import base64
from yahoo_fin.stock_info import get_analysts_info, get_stats, get_live_price, get_quote_data, get_quote_table
from yahoo_fin.news import get_yf_rss as get_news
import sys
import firebase_admin
from firebase_admin import credentials, firestore
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def updateStats(id, name, ticker):
    stats = get_stats(ticker).to_json()
    val_stats = get_stats_valuation(ticker).to_json()
    stats = json.loads(stats)
    val_stats = json.loads(val_stats)

    attributes = stats["Attribute"]
    values = stats["Value"]
    att_list = []
    val_list = []
    for(key, value) in attributes.items():
        att_list.append(value)

    for(key, value) in values.items():
        val_list.append(value)

    sph = {}
    ss = {}
    dns = {}
    fy = {}
    prof = {}
    me = {}
    ins = {}
    bs = {}
    cfs = {}
    val = {}

    for(key, value) in val_stats['0'].items():
        val[value] = val_stats['1'][key]

    for i in range(7):
        sph[att_list[i]] = val_list[i]

    for i in range(7, 19):
        ss[att_list[i]] = val_list[i]

    for i in range(19, 29):
        dns[att_list[i]] = val_list[i]

    for i in range(29, 31):
        fy[att_list[i]] = val_list[i]

    for i in range(31, 33):
        prof[att_list[i]] = val_list[i]

    for i in range(33, 35):
        me[att_list[i]] = val_list[i]

    for i in range(35, 43):
        ins[att_list[i]] = val_list[i]

    for i in range(43, 49):
        bs[att_list[i]] = val_list[i]

    for i in range(49, len(att_list)):
        cfs[att_list[i]] = val_list[i]

    final_dict = {"Valuation": val, "Trading Information": {"Stock Price History": sph, "Share Statistics": ss, "Dividend & Splits": dns}, "Financial Highlights": {
        "Fiscal Year": fy, "Profitability": prof, "Management Effectiveness": me, "Income Statement": ins, "Balance Sheet": bs, "Cash Flow statement": cfs}}

    db.collection("companies")\
        .document(id)\
        .collection("stocks")\
        .document("NSE")\
        .collection("data")\
        .document("stats")\
        .set(final_dict)


def execFunction():
    docs = db.collection(u'companies').stream()
    companyNames = []
    for doc in docs:
        id = doc.id
        data = doc.to_dict()
        updateStats(id, data['name'], data['ticker'])


def update_analytics(event, context):
    execFunction()
    """Triggered from a message on a Cloud Pub/Sub topic.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
