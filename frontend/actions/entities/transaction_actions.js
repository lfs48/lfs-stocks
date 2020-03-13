import * as TransactionsAPIUtil from '../../util/api/transactions_api_util';
import {RECEIVE_TRANSACTION, RECEIVE_USER_TRANSACTIONS} from '../types';


// Standard actions

// Action to add a transaction to state.
const receiveTransaction = (transaction) => ({
    type: RECEIVE_TRANSACTION,
    transaction: transaction
});

// Action to add collection of transactions associated with one user to state.
const receiveUserTransactions = (transactions) => ({
    type: RECEIVE_USER_TRANSACTIONS,
    transactions: transactions
});

// Thunk actions

// Makes an http request for all transactions associated with a user.
// Then creates and dispatches an action to add transactions to state.
export const fetchUserTransactions = (id) => (dispatch) => {
    return TransactionsAPIUtil.fetchUserTransactions(id).then(
        (transactions) => dispatch(receiveUserTransactions(transactions))
    );
};

// Makes an http request to create a new transaction from form data.
// Then creates an action to add the newly created transaction to state and dispatches the action.
export const createTransaction = (formTransaction) => (dispatch) => {
    return TransactionsAPIUtil.createTransaction(formTransaction).then(
        (transaction) => dispatch(receiveTransaction(transaction))
    );
};