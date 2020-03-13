import { merge } from 'lodash';
import {LOGIN_USER, LOGOUT_USER} from '../../actions/types';

const sessionsReducer = (state = {}, action) => {
    // Copy of state is created and state is frozen to ensure this function does not create side effects
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        // Set id key in new state to point to the id of user provided by action.
        // Returns the new state.
        case(LOGIN_USER): {
            newState.id = action.user.id;
            return newState;
        }

        // Set id key in new state to null.
        // Returns the new state.
        case(LOGOUT_USER): {
            delete newState.id;
            return newState;
        }

    }
}

export default sessionsReducer;