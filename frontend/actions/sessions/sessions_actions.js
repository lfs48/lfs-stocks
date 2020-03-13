import * as SessionAPIUtil from '../../util/api/sessions_api_util';
import {LOGIN_USER, LOGOUT_USER} from '../types';

// Standard actions

export const loginUser = (user) => ({
    type: LOGIN_USER,
    user: user
});

export const logoutUser = () => ({
    type: LOGOUT_USER
})

// Thunk actions

// Make an http request to log in a user.
// Then creates and dispatches an action to add that user to state.
export const login = (user) => (dispatch) => {
    return SessionAPIUtil.login(user)
    .then( (res) => dispatch(loginUser(res) ) );
};

// Make an http request to log out a a user.
// Then creates and dispatches an action to remove session from state.
export const logout = () => (dispatch) => {
    return SessionAPIUtil.logout()
    .then( (res) => dispatch(logoutUser() ) );
}