import React from 'react';
import {Link} from 'react-router-dom';

const Splash = () => {

    return(
        <section id="splash-container">
            <header>LFS Stocks</header>
            <Link className="splash-link" to="/login">Log In</Link>
            <Link className="splash-link" to="register">Register</Link>
        </section>
    )

}

export default Splash;