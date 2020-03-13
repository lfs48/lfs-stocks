# Builds a json object by extracting id and username from a user
json.extract! user, :id, :email

# If user is logged in, also extract array of id's of stocks owned by user
if logged_in? && user.id == current_user.id
    json.ownedStockIds do
        json.array! user.owned_stocks.map { |stock| stock.id }
    end

    json.transactionIds do
        json.array! user.transactions.map { |transaction| transaction.id }
    end
end