class Api::TransactionsController < ApplicationController

    # Retrieves all transactions by user from db, then renders api/transactions/index view
    def index
        @transactions = Transaction.where(:purchaser_id => params[:user_id])
        render "api/transactions/index"
    end

    # Creates a transacton object from filtered params, then renders api/transactions/show view if successfully persists to db, or renders errors otherwise
    def create
        @transaction = Transaction.new(trans_params)
        user = User.find(params[:user_id])
        if user.buy(@transaction) && @transaction.save
            render "api/transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    private

    # Filters params so that only params with a key of stock is allowed, and only reads the owner_id, ticker, and shares subkeys
    def trans_params
        params.require(:transaction).permit(:purchaser_id, :ticker, :quantity, :price)
    end

end