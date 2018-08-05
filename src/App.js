import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { observer } from 'mobx-react';
import AuthService from './services/AuthService';
import DefaultLayout from './pages/layouts/DefaultLayout';
import LoginGitHubResponsePage from './pages/LoginGitHubResponsePage';
import LoginGitHubPage from './pages/LoginGitHubPage';
import './App.css';

import LandingPage from './pages/LandingPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchedProps =>
      AuthService.instance.isAuthenticated ? (
        <Component {...matchedProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: matchedProps.location }
          }}
        />
      )
    }
  />
);

const routes = [
  {
    path: '/',
    exact: true,
    isPublic: true,
    main: props => <LandingPage {...props} />,
    layout: DefaultLayout
  },
  {
    path: '/login/github',
    isPublic: true,
    main: props => <LoginGitHubResponsePage {...props} />,
    layout: DefaultLayout
  },
  {
    path: '/login',
    isPublic: true,
    main: props => <LoginGitHubPage {...props} />,
    layout: DefaultLayout
  }
];

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(route => (
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
    );
  }
}

export default observer(App);
