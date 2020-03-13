import * as StocksAPIUtil from '../../util/api/stocks_api_util';
import {RECEIVE_STOCK, RECEIVE_USER_STOCKS} from '../types';


// Standard actions

// Action to add a stock to state.
const receiveStock = (stock) => ({
    type: RECEIVE_STOCK,
    stock: stock
});

// Action to add collection of stocks owned by one user to state.
const receiveUserStocks = (stocks) => ({
    type: RECEIVE_USER_STOCKS,
    stocks: stocks
});

// Thunk actions

// Makes an http request for all stocks owned by a user.
// Then creates and dispatches an action to add users to state.
export const fetchUserStocks = (id) => (dispatch) => {
    return StocksAPIUtil.fetchUserStocks(id).then(
        (stocks) => dispatch(receiveUserStocks(stocks))
    );
};

// Makes an http request to create a new stock from form data.
// Then creates an action to add the newly created stock to state and dispatches the action.
export const createStock = (formStock) => (dispatch) => {
    return StocksAPIUtil.createStock(formStock).then(
        (stock) => dispatch(receiveStock(stock))
    );
};