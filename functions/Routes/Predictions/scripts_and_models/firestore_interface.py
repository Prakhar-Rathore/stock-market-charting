from google.cloud import firestore

db = firestore.Client.from_service_account_json('config/serviceAccountKey.json')

#perform a collection group query
companies_ref = db.collection('companies')

#get all the docs in the stocks collection group

def get_all_tickers():
    yf_tickers = []

    for doc in companies_ref.stream():
        yf_tickers.append(doc.to_dict()['ticker'])

    return yf_tickers

def get_60_days_data(ticker):
    query = companies_ref.where('ticker', '==', ticker)
    if query.get() is None:
        return None
    for doc in query.stream():
        #get all the docs in the path -> doc.reference.path + "/stocks/NSE/data/historic/2022/"
        stock_historic_col = doc.reference.collection('stocks').document('NSE').collection('data').document('historic').collection('2022').order_by(u'date', direction=firestore.Query.DESCENDING).limit(60)
        prev_data_60 = []
        for doc in stock_historic_col.stream():
            prev_data_60.append(doc.to_dict())
    
    prev_data_60.reverse()
    return prev_data_60

def update_firestore_predictions(ticker, predicted_prices):
    query = companies_ref.where('ticker', '==', ticker)

    #round off the values
    predicted_prices = [round(x, 2) for x in predicted_prices]

    for doc in query.stream():
        doc.reference.collection('stocks').document('NSE').collection('data').document('prediction').set({
            'predictions': predicted_prices
        })