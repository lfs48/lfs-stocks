# Builds a json object by extracting id, ticker, shares, and owner_id from a stock
json.extract! stock, :id, :ticker, :shares, :owner_id