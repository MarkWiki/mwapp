import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import AuthService from '../services/AuthService';

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

PrivateRoute.propTypes = {
    component: PropTypes.node.isRequired
};

export default PrivateRoute;
