from yahoo_fin.stock_info import get_data, get_stats,get_quote_data,get_dividends,get_splits
import json
import datetime
import csv
import firebase_admin
import yfinance as yf
from firebase_admin import credentials, firestore
cred = credentials.Certificate("../../config/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_change_percent(ticker):
    data=get_quote_data(ticker)
    change_percent=data["regularMarketChangePercent"]
    return change_percent


def getDateFromTimeStamp(timestamp):
    return datetime.datetime.fromtimestamp(timestamp/1000)


def getStringDate(datetimeObj):
    return datetimeObj.strftime('%d-%b-%Y')


def get50Dmaand200Dma(stats):
    # print(stats)
    # stats=json.loads(stats)
    # dma_50, dma_200 = 0, 0
    # key_list = list(stats['Attribute'].keys())
    # for key in key_list:
    #     if stats['Attribute'][key] == '50-Day Moving Average 3':
    #         dma_50 = stats['Value'][key]
    #     if stats['Attribute'][key] == '200-Day Moving Average 3':
    #         dma_200 = stats['Value'][key]
    return ["NA", "NA"]




def getHistoricalData(symbol, startDate, endDate):
    data = json.loads(get_data(symbol, start_date=startDate,
                      end_date=endDate, index_as_date=False).to_json())
    return data


def getCompanyListFromDb():
    docs = db.collection("companies").stream()
    companyList = []
    companyIdList = []
    for doc in docs:
        doc_dict = doc.to_dict()
        companyList.append(doc_dict['ticker'])
        companyIdList.append(doc.id)
    return companyList, companyIdList


def insertData(data_dict, company_id, year, newDocID):
    # ...
    # print(data_dict, company_id, year)
    db.collection("companies")\
        .document(company_id)\
        .collection("stocks")\
        .document("NSE")\
        .collection("data")\
        .document("historic")\
        .collection(year)\
        .document(newDocID)\
        .set(data_dict)


valid_id = '0VA7tuzTKQd28nHOUEEv'


def getCompanyData(companyList, companyIdList):
    le = len(companyList)
    for i in range(0, le):
        company = companyList[i]
        data = getHistoricalData(company, datetime.datetime.now(
        ) - datetime.timedelta(days=70), datetime.datetime.now())
        # print(data)
        keyList = list(data['date'].keys())
        for key in keyList:
            data_to_add = {}
            data_to_add['date'] = getDateFromTimeStamp(data['date'][key])
            new_doc_id = getStringDate(getDateFromTimeStamp(data['date'][key]))
            data_to_add['open'] = data['open'][key]
            data_to_add['high'] = data['high'][key]
            data_to_add['low'] = data['low'][key]
            data_to_add['close'] = data['close'][key]
            data_to_add['volume'] = data['volume'][key]
            # data_to_add['change_percent'] = get_change_percent(company)
            # dma = get50Dmaand200Dma((get_stats(company).to_json()))
            # dma=["NA","NA"]
            # dma_50 = dma[0]
            # dma_200 = dma[1]
            # data_to_add['50 dma'] = dma_50
            # data_to_add['200 dma'] = dma_200
            year = str(data_to_add['date'].year)
            insertData(data_to_add, companyIdList[i], year, new_doc_id)


# companyList, companyIdList = getCompanyListFromDb()
# getCompanyData(companyList, companyIdList)
tcs=yf.Ticker('ADANIPORTS.NS')
print(tcs.info['industry'])




