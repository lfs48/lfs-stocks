import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/sessions/sessions_actions';

const Navbar = () => {

    const dispatch = useDispatch();

    // Retrieve data from redux state.
    const {loggedIn, currentUser} = useSelector(
        state => ({
            loggedIn: state.sessions.id != null,
            currentUser: state.entities.users[state.sessions.id]
        })
    );

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
        </>
    }

    return (
        <nav id="nav-container">
            {content}
        </nav>
    );
}

export default Navbar;