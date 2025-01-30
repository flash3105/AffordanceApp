import http.client

conn = http.client.HTTPSConnection("woolworths-products-api.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "95d777c75amshce45e1874372f8fp10e57djsn16a8d4cafaaf",
    'x-rapidapi-host': "woolworths-products-api.p.rapidapi.com"
}

conn.request("GET", "/woolworths/barcode-search/9310199012717", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))