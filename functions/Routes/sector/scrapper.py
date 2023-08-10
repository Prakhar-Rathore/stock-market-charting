from bs4 import BeautifulSoup
import requests
import firebase_admin

from firebase_admin import credentials, firestore

cred = credentials.Certificate("./config/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_details(dic, lis, widths):
    global req_attr
    i = len(req_attr) + 1

    while(i < len(lis)):
        if(lis[i] == '0'):
            i += len(req_attr)
            continue
        dic[lis[0]]['subsector'][lis[i]] = {
            req_attr[j]: lis[i+1+j] for j in range(len(req_attr))}
        dic[lis[0]]['subsector'][lis[i]
                                 ]["Advance Decline Graph"] = widths[i % len(req_attr)]
        i += len(req_attr) + 1

    return dic


def updateFunction():
    URL = "https://www.moneycontrol.com/stocks/marketstats/sector-scan/nse/today.html"

    requests.packages.urllib3.disable_warnings()
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')

    # find elements with class "acrcbx" in the page
    table = soup.find_all('div', {'class': 'acrcbx'})

    sector_details = {}
    req_attr = ['market_cap', '%chg', 'A/D ratio', 'Advance', 'Decline']

    for element in table[1:]:
        # text = element.find_all('div', {'class': 'accrMain'})[0].text.strip('').strip(' ').strip('\n').strip('\t').split('\n')
        text = element.text.strip('').strip(
            ' ').strip('\n').strip('\t').split('\n')
        text = [x.strip(' ') for x in text if x != '']
        graph = element.find_all('span', {'class': 'grnBr'})
        widths = [x.attrs['style'][6:-1] for x in graph]
        sector_details[text[0]] = {req_attr[i]: text[i+1]
                                   for i in range(len(req_attr))}
        sector_details[text[0]]['Advance Decline Graph'] = widths[0]
        sector_details[text[0]]['subsector'] = {}

        sector_details = add_details(sector_details, text, widths)

    for key in sector_details.keys():
        db.collection('sectors')\
            .document('NSE')\
            .collection('sector_details')\
            .document(key)\
            .set(sector_details[key])
