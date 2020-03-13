# Builds a json object using the transaction partial view.
# @transaction comes from the transactions controller
json.partial! "api/transactions/transaction", transaction: @transaction