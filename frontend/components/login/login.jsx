import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {merge} from 'lodash';
import { login } from '../../actions/sessions/sessions_actions';
import {Link} from 'react-router-dom';

const Login = () => {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    // Controls input fields by updating react state.
    const updateInput = (e, field) => {
        e.preventDefault();
        const newState = merge({}, state);
        newState[field] = e.target.value;
        setState(newState);
    }

    // Handles login button by dispatching a loginUser action, using info from react state to build user object.
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email: state.email,
            password: state.password
        };
        dispatch(login(user));
    }

    return(
        <section id="login-container" className="login-register">
            <div>
            <header>Log In</header>

            <input 
                type="text" 
                id="login-email-input" 
                placeholder="Email"
                value={state.email}
                onChange={e => updateInput(e, "email")}
            ></input>

            <input 
                type="password" 
                id="login-password-input" 
                placeholder="Password"
                value={state.password}
                onChange={e => updateInput(e, "password")}
            ></input>

            <button onClick={e => handleLogin(e)}>Log In</button>

            <Link to="/register">New User? Register Here</Link>
            </div>
        </section>
    )
}

export default Login;