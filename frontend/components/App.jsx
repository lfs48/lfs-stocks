import React from 'react';
import {Route} from 'react-router-dom';
import Navbar from './navbar/navbar';
import Splash from './splash/splash';
import { AuthRoute, ProtectedRoute } from './routes/routes';
import Portfolio from './portfolio/portfolio';
import Transactions from './transactions/transactions';

const App = () => (
    <main id="app-container">
        <Navbar/>
        <ProtectedRoute path="/transactions" component={Transactions} />
        <ProtectedRoute path="/portfolio" component={Portfolio} />
        <AuthRoute path="/" component={Splash} />
    </main>
);

export default App;