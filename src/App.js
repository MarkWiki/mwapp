import axios from 'axios';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import {
  Button,
  Jumbotron,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';
import mwLightLogo from './images/MarkWikiLightLogo240x120.png';
import gitHubLogoLightLarge from './images/GitHub-Mark-120px-plus.png';

class LandingPage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          Welcome to MarkWiki{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
        </p>
        <hr className="my-2" />
        <p>Markdown + Wiki + Version Control</p>
        <p className="lead">
          <Button color="secondary">Start using</Button>
        </p>
      </Jumbotron>
    );
  }
}

class StorageService {
  static localStorageSet(key, value) {
    if (window.localStorage)
      window.localStorage.setItem(key, JSON.stringify(value));
  }

  static localStorageGet(key) {
    if (window.localStorage)
      return JSON.parse(window.localStorage.getItem(key));
    return null;
  }
}

class GitHubApiService {
  static instance;

  async getUserNameAsync() {
    if (!AuthService.instance.isAuthenticated) return null;

    try {
      const response = await this._graphRequestAsync(
        'query { viewer { login } }'
      );
      return response;
    } catch (error) {
      console.warn('Failed to retrieve graph data.', error);
      return null;
    }
  }

  _graphRequestAsync(query) {
    return this._getClient().post('/graphql', {
      query
    });
  }

  _getClient() {
    return axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 1000,
      headers: {
        Authorization: `bearer ${AuthService.instance.gitHubToken}`
      }
    });
  }
}

GitHubApiService.instance = new GitHubApiService();

class AuthService {
  static instance;

  isAuthenticated = false;
  gitHubToken = null;

  tryAuthenticate() {
    this.gitHubToken = StorageService.localStorageGet('gitHubToken');
    this.isAuthenticated = this.gitHubToken != null;
  }

  static navigateOauthGitHub(fromPathname) {
    const state = new Date().getTime();
    const scopes = 'user,public_repo';
    const clientId = '815b10ee06332853b128';
    const redirectUrl = 'https://markwiki.com/login/github';
    const newLocation = `https://github.com/login/oauth/authorize?client_id=${encodeURI(
      clientId
    )}&redirect_uri=${encodeURI(redirectUrl)}&scope=${encodeURI(
      scopes
    )}&state=${encodeURI(state)}`;

    // Save return state
    StorageService.localStorageSet('loginGitHubSourceUrl', fromPathname);
    StorageService.localStorageSet('loginGitHubNonce', state);

    window.location = newLocation;
  }

  static async loginCodeGitHubAsync(code, state) {
    const redirectUrl = StorageService.localStorageGet('loginGitHubSourceUrl');
    const checkNonce = StorageService.localStorageGet(
      'loginGitHubNonce'
    ).toString();

    if (checkNonce !== state) {
      throw new Error('Login GitHub: Nonce not matching.');
    }

    const response = await axios.get(
      `https://dqdzhooyx3.execute-api.eu-central-1.amazonaws.com/dev/token/github?code=${code}`
    );
    const accessToken = response.data.access_token;

    StorageService.localStorageSet('gitHubToken', accessToken);

    window.location = redirectUrl;
  }
}

AuthService.instance = new AuthService();

class LoginGitHubPage extends Component {
  render() {
    const { from } = (this.props.location && this.props.location.state) || {
      from: { pathname: '/' }
    };
    AuthService.navigateOauthGitHub(from.pathname);

    return (
      <div className="pt-5">
        <div className="text-center">
          <img src={gitHubLogoLightLarge} alt="GitHub Mark" />
          <div className="pt-4">Redirecting to GitHub...</div>
        </div>
      </div>
    );
  }
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

class LoginGitHubResponsePage extends Component {
  render() {
    const code = getQueryVariable('code') || null;
    const state = getQueryVariable('state') || null;
    try {
      AuthService.loginCodeGitHubAsync(code, state);
    } catch (error) {
      console.warn('Failed to login.', error);
    }

    return (
      <div className="pt-5">
        <div className="text-center">
          <img src={gitHubLogoLightLarge} alt="GitHub Mark" />
          <div className="pt-4">Logging you in...</div>
        </div>
      </div>
    );
  }
}

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

const ProfileNavItem = location => {
  try {
    AuthService.instance.tryAuthenticate();
    GitHubApiService.instance.getUserNameAsync();
  } catch (error) {
    console.warn("Couldn't obtain user info.", error);
  }

  return AuthService.instance.isAuthenticated ? (
    <div>Logged in</div>
  ) : (
    <NavItem>
      <NavLink
        tag={Link}
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      >
        Login with GitHub
      </NavLink>
    </NavItem>
  );
};

const DefaultLayout = ({
  baseRoute: BaseRoute,
  component: Component,
  ...rest
}) => (
  <BaseRoute
    {...rest}
    component={matchedProps => (
      <div>
        <Helmet title="MarkWiki" />
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img
                src={mwLightLogo}
                height={32}
                alt="MarkWiki Logo"
                title="MarkWiki"
              />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <ProfileNavItem location={matchedProps.location} />
            </Nav>
          </Navbar>
        </div>
        <Component {...matchedProps} />
      </div>
    )}
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

class App extends Component {
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

export default App;
