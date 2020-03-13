class Api::StocksController < ApplicationController

    # Retrieves all users from db, then renders api/users/index view
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

    # Looks up stock by id from params, then renders api/stocks/show view if a stock with that id is found
    def show
        @stock = Stock.find_by(id: params[:id])
        render "api/stocks/show" if @stock
    end

    private

    # Filters params so that only params with a key of stock is allowed, and only reads the owner_id, ticker, and shares subkeys
    def stock_params
        params.require(:stock).permit(:owner_id, :ticker, :shares)
    end

end