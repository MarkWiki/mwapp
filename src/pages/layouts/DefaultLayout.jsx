import React from 'react';
import Helmet from 'react-helmet';
import { Alert, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { version } from '../../../package.json';
import mwLightLogo from '../../images/MarkWikiLightLogo240x120.png';
import AuthService from '../../services/AuthService';
import GitHubApiService from '../../services/GitHubApiServices';

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
        <Alert
          color="primary"
          className="mb-0 alert-no-border-radius"
          fade={false}
        >
          MarkWiki is still in development. Please don't use it in production
          environments.
        </Alert>
        <Component {...matchedProps} />
        <small className="text-muted pl-1">MarkWiki v{version}</small>
      </div>
    )}
  />
);

export default DefaultLayout;
