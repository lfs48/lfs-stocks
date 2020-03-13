# Builds a json object by extracting all fields from a transaction
json.extract! transaction, :id, :purchaser_id, :ticker, :price, :quantity