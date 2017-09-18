from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'shopdb'
COLLECTION_NAME = 'product'
FIELDS = {'category': True, 'size': True, 'price': True, 'brand': True, '_id': False, 'sales_date': True, 'name':True }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/products")
def salesDeshbord_Products():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    products = collection.find(projection=FIELDS)
    json_products = []
    for product in products:
        json_products.append(product)
    json_products = json.dumps(json_products, default=json_util.default)
    connection.close()
    return json_products

if __name__ == "__main__":
    app.run()
