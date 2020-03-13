import { merge } from 'lodash';
import {RECEIVE_USER, RECEIVE_ALL_USERS, LOGIN_USER} from '../../actions/types';

const usersReducer = (state = {}, action) => {
    // Copy of state is created and state is frozen to ensure this function does not create side effects
    const newState = merge({}, state);
    Object.freeze(state);

    switch (action.type) {
        default: return state;

        // Sets key in new state corresponding to user's id to be user info provided by action
        // Returns the new state
        case(LOGIN_USER):
        case(RECEIVE_USER): {
            newState[action.user.id] = action.user
            return newState;
        }

        // Returns the users collection provided by action to replace previous state
        case(RECEIVE_ALL_USERS): {
            return action.users;
        }
    }
};

export default usersReducer;