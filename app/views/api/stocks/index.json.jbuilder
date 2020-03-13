# Builds a json object from a collection of stocks. 
# Each key is the id of a stock, and the value is a json object built using the stock partial view.
# @stocks comes from the stocks controller
@stocks.each do |stock|
    json.set! stock.id do
        json.partial! "api/stocks/stock", stock: stock
    end
end