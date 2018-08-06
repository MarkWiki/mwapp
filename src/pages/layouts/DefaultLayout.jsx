import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Alert, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { version } from '../../../package.json';
import mwLightLogo from '../../images/MarkWikiLightLogo240x120.png';
import githubIcon from '../../images/GitHub-Mark-32px.png';
import AuthService from '../../services/AuthService';
import { inject, observer } from '../../../node_modules/mobx-react';

const ProfileNavItemLoading = () => (
    <div className="btn btn-light font-weight-light">
        <span className="pr-2">
            <img
                src={githubIcon}
                width={16}
                className="pb-1"
                alt="GitHub Mark"
            />
        </span>
        {'Loggin you in...'}
    </div>
);

const ProfileNavItemLoggedIn = ({ userName }) => (
    <div className="btn btn-light font-weight-light">
        <span className="pr-2">
            <img
                src={githubIcon}
                width={16}
                className="pb-1"
                alt="GitHub Mark"
            />
        </span>
        {userName}
    </div>
);

ProfileNavItemLoggedIn.propTypes = {
    userName: PropTypes.string.isRequired
};

const ProfileNavItemLogin = ({ location }) => (
    <NavItem>
        <NavLink
            className="btn btn-light"
            tag={Link}
            to={{
                pathname: '/login',
                state: { from: location }
            }}
        >
            <span className="pr-2">
                <img
                    src={githubIcon}
                    width={16}
                    className="pb-1"
                    alt="GitHub Mark"
                />
            </span>
            {'Login with GitHub'}
        </NavLink>
    </NavItem>
);

ProfileNavItemLogin.propTypes = {
    location: PropTypes.object.isRequired
};

const ProfileNavItem = inject('currentUserProfileViewModel')(
    observer(({ currentUserProfileViewModel, location }) => {
        if (currentUserProfileViewModel.isLoading) {
            return <ProfileNavItemLoading />;
        }
        if (AuthService.instance.isAuthenticated) {
            return (
                <ProfileNavItemLoggedIn
                    userName={currentUserProfileViewModel.userName}
                />
            );
        }
        return <ProfileNavItemLogin location={location} />;
    })
);

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
                    {
                        "MarkWiki is still in development. Please don't use it in production environments."
                    }
                </Alert>
                <Component {...matchedProps} />
                <small className="text-muted pl-1">
                    {`MarkWiki v${version}`}
                </small>
            </div>
        )}
    />
);

DefaultLayout.propTypes = {
    baseRoute: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired
};

export default DefaultLayout;
