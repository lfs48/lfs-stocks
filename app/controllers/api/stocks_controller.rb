class Api::StocksController < ApplicationController

    # Retrieves all stocks owned by user from db, then renders api/stocks/index view
    def index
        @stocks = Stock.where(:owner_id => params[:user_id])
        render "api/stocks/index"
    end

    # Creates a stock object from filtered params, then renders api/stock/show view if successfully persists to db, or renders errors otherwise
    def create
        @stock = Stock.new(stock_params)
        if @stock.save
            render "api/stocks/show"
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end

    private

    # Filters params so that only params with a key of stock is allowed, and only reads the owner_id, ticker, and shares subkeys
    def stock_params
        params.require(:stock).permit(:owner_id, :ticker, :shares)
    end

end