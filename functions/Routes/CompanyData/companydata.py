import firebase_admin

from firebase_admin import credentials, firestore

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

companies_ref = db.collection('companies')\
                  .document("2jXAtTeXKSj5rR7nrGLe")\
                  .get()

print(companies_ref.to_dict())