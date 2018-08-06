/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import Routes from './routing/Routes';
import Stores from './stores/Stores';
import PrivateRoute from './routing/PrivateRoute';
import './App.css';

const App = () => (
    <Provider {...Stores}>
        <Router>
            <Switch>
                {Routes.map(route => (
                    <route.layout
                        baseRoute={route.isPublic ? Route : PrivateRoute}
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
            </Switch>
        </Router>
    </Provider>
);

export default observer(App);
