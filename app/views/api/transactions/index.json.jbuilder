# Builds a json object from a collection of transactions. 
# Each key is the id of a transaction, and the value is a json object built using the transaction partial view.
# @transactions comes from the transactions controler
@transactions.each do |transaction|
    json.set! transaction.id do
        json.partial! "api/transactions/transaction", transaction: transaction
    end
end