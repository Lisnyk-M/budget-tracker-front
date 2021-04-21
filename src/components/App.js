import React from 'react';
import { Switch, Route } from 'react-router-dom';

import login from '../views/login/login';
import logout from '../views/logout/logout';
import register from '../views/register/register';
import Header from './Header/Header';
import routes from '../routes';
import ReactNotification from 'react-notifications-component';
import Layout from './Layout/Layout';
import Entries from '../views/entries/EntriesView';

import 'react-notifications-component/dist/theme.css';

const App = () => (
    <Layout>
         <ReactNotification />
        <Header user="User"></Header>

        <Switch>
            <Route path={routes.home} exact component={register} />
            <Route path={routes.login} exact component={login} />
            <Route path={routes.logout} exact component={logout} />
            <Route path={routes.register} exact component={register} />
            <Route path={routes.entries} exect component={Entries} />
        </Switch>

       
    </Layout>
)

export default App;
