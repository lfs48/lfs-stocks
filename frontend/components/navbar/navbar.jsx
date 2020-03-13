import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {login, logout} from '../../actions/sessions/sessions_actions';
import {merge} from 'lodash';

const Navbar = () => {

    // Set react state.
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    // Retrieve data from redux state.
    const {loggedIn, currentUser} = useSelector(
        state => ({
            loggedIn: state.sessions.id != null,
            currentUser: state.entities.users[state.sessions.id]
        })
    );

    // Controls input fields by updating react state.
    const updateInput = (e, field) => {
        e.preventDefault();
        const newState = merge({}, state);
        newState[field] = e.target.value;
        setState(newState);
    }

    // Handles login button by dispatching a login action, using info from react state to build user object.
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email: state.email,
            password: state.password
        };
        dispatch(login(user));
    }

    // Handles logout button by dispatching a logout action.
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    let content = <></>
    
    // Conditionally render different content based on whether user is logged in.
    // When logged in render welcome message and logout button.
    // When not logged in, render login input fields.
    if (loggedIn) {
        content = 
        <> 
        <span>Welcome, {currentUser.email}</span>
        <button onClick={e => handleLogout(e)}>Log Out</button>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/transactions">Transactions</Link>
        </>
    } else {
        content = 
        <>
        <input 
            type="text" 
            id="nav-email-input" 
            placeholder="Email"
            value={state.email}
            onChange={e => updateInput(e, "email")}
        ></input>

        <input 
            type="password" 
            id="nav-password-input" 
            placeholder="Password"
            value={state.password}
            onChange={e => updateInput(e, "password")}
        ></input>

        <button id="nav-login-button" onClick={e => handleLogin(e)}>Log In</button>
        </>
    }

    return (
        <nav id="nav-container">
            {content}
        </nav>
    );
}

export default Navbar;