import * as UsersAPIUtil from '../../util/api/users_api_util';
import {loginUser} from '../sessions/sessions_actions'; 
import {RECEIVE_USER, RECEIVE_ALL_USERS} from '../types';


// Standard actions

// Action to add a user to state.
const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user: user
});

// Action to add collection of users to state.
const receiveAllUsers = (users) => ({
    type: RECEIVE_ALL_USERS,
    users: users
});

// Thunk actions

// Makes an http request for a user by id.
// Then creates and dispatches an action to add that user to state.
export const fetchUser = (id) => (dispatch) => {
    return UsersAPIUtil.fetchUser(id).then(
        (user) => dispatch( receiveUser(user) )
    );
};

// Makes an http request for collection of all users.
// Then creates and dispatches an action to add users to state.
export const fetchUsers = () => (dispatch) => {
    return UsersAPIUtil.fetchUsers().then(
        (users) => dispatch(receiveAllUsers(users))
    );
};

// Makes an http request to create a new user from form data.
// Then creates an action to add the newly created user to state and dispatches the action.
// If user creation fails, instead creates and dispatches an action to add signup errors to state.
export const createUser = (formUser) => (dispatch) => {
    return UsersAPIUtil.createUser(formUser).then(
        (user) => dispatch(loginUser(user))
    );
};