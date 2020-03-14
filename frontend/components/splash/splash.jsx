import React from 'react';
import {Link} from 'react-router-dom';

const Splash = () => {

    return(
        <section id="splash-container">
            <Link to="/login">Log In</Link>
            <Link to="register">Register</Link>
        </section>
    )

}

export default Splash;