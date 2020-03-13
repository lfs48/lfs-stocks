# Builds a json object using the stock partial view.
# @stock comes from the stocks controller
json.partial! "api/stocks/stock", stock: @stock