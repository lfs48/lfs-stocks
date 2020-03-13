import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';
import transactionsReducer from './transactions_reducer';

// Combines all lower-level entities reducers, to be passed to the root reducer under the 'entities' key.
const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    transactions: transactionsReducer
});

export default entitiesReducer;