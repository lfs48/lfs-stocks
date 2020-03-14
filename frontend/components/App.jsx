import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './navbar/navbar';
import Register from './register/register';
import Login from './login/login';
import Splash from './splash/splash';
import { AuthRoute, ProtectedRoute } from './routes/routes';
import Portfolio from './portfolio/portfolio';
import Transactions from './transactions/transactions';

const App = () => (
    <main id="app-container">
        <Navbar/>
        <Switch>
            <ProtectedRoute path="/transactions" component={Transactions} />
            <ProtectedRoute path="/portfolio" component={Portfolio} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <AuthRoute path="/" component={Splash} />
        </Switch>
    </main>
);

export default App;