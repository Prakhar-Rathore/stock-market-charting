from yahoo_fin.stock_info import get_data, get_company_info, tickers_nifty50, get_analysts_info, get_company_officers, get_quote_data
import requests
import firebase_admin

from firebase_admin import credentials, firestore

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

req_attr = ['about', 'boardMembers', 'ceo', 'founded', 'hq', 'industry', 'name', 'lowerCaseName', 'seListed', 'sector', 'ticker']

URL = "https://archives.nseindia.com/content/indices/ind_nifty50list.csv"
data = requests.get(URL).content.decode('UTF-8').split('\n')
names = []
tickers = []

tickers_present = []
companies_ref = db.collection(u'companies')
companies = companies_ref.stream()

for company in companies:
    tickers_present.append(company.to_dict()['ticker'])

for i in range(len(data)):
    if i == 0:
        continue
    li = data[i].split(',')
    if(len(li) == 1):
        continue
    names.append(li[0])
    tickers.append((li[2]+'.NS'))

for i in range(len(tickers)):
    if(tickers[i] in tickers_present):
        continue
    data = get_quote_data(tickers[i])
    company_info = get_company_info(tickers[i])
    officers = get_company_officers(tickers[i]).to_dict()
    company_data = []
    company_data.append(company_info['Value']['longBusinessSummary'])
    key = list(officers.keys())
    company_data.append(list(officers[key[0]].keys()))
    company_data.append(company_data[-1][0])
    company_data.append('NA')
    company_data.append(company_info['Value']['city'])
    company_data.append(company_info['Value']['industry'])
    company_data.append(names[i])
    company_data.append(company_data[-1].lower())
    company_data.append(["NSE"])
    company_data.append(company_info['Value']['sector'])
    company_data.append(tickers[i])

    company_data = {req_attr[i]: company_data[i] for i in range(len(req_attr))}
    company_data['changepct'] = 0
    
    companies_ref.add(company_data)

