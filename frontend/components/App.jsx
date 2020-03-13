import React from 'react';
import {Route} from 'react-router-dom';
import Navbar from './navbar/navbar';
import Splash from './splash/splash';
import Home from './home/home';
import { AuthRoute, ProtectedRoute } from './routes/routes';

const App = () => (
    <main id="app-container">
        <Navbar/>
        <ProtectedRoute path="/" component={Home} />
        <AuthRoute path="/" component={Splash} />
    </main>
);

export default App;