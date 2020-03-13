import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createUser} from '../../actions/entities/user_actions'
import {merge} from 'lodash';

const Splash = () => {

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

    // Handles register button by dispatching a createUser action, using info from react state to build user object.
    const handleRegister = (e) => {
        e.preventDefault();
        const user = {
            email: state.email,
            password: state.password
        };
        dispatch(createUser(user));
    }

    return(
        <section id="splash-container">
            <header>New User? Register An Account!</header>

            <input 
                type="text" 
                id="splash-email-input" 
                placeholder="Email"
                value={state.email}
                onChange={e => updateInput(e, "email")}
            ></input>

            <input 
                type="password" 
                id="splash-password-input" 
                placeholder="Password"
                value={state.password}
                onChange={e => updateInput(e, "password")}
            ></input>

            <button onClick={e => handleRegister(e)}>Register</button>
        </section>
    )
}

export default Splash;