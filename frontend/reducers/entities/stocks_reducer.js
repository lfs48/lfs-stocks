import { merge } from 'lodash';
import {RECEIVE_STOCK, RECEIVE_USER_STOCKS} from '../../actions/types';

const stocksReducer = (state = {}, action) => {
    // Copy of state is created and state is frozen to ensure this function does not create side effects
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        // Sets key in new state corresponding to stock's id to be stock info provided by action
        // Returns the new state
        case(RECEIVE_STOCK): {
            newState[action.stock.id] = action.stock
            return newState;
        }

        // Returns the stocks collection provided by action to replace previous state
        case(RECEIVE_USER_STOCKS): {
            return action.stocks;
        }
    }
};

export default stocksReducer;