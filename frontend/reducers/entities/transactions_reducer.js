import { merge } from 'lodash';
import {RECEIVE_TRANSACTION, RECEIVE_USER_TRANSACTIONS} from '../../actions/types';

const transactionsReducer = (state = {}, action) => {
    // Copy of state is created and state is frozen to ensure this function does not create side effects
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        // Sets key in new state corresponding to transaction's id to be transaction info provided by action
        // Returns the new state
        case(RECEIVE_TRANSACTION): {
            newState[action.transaction.id] = action.transaction
            return newState;
        }

        // Returns the transactions collection provided by action to replace previous state
        case(RECEIVE_USER_TRANSACTIONS): {
            return action.transactions;
        }
    }
};

export default transactionsReducer;