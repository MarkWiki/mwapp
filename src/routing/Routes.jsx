import React from 'react';
import LandingPage from '../pages/LandingPage';
import DefaultLayout from '../pages/layouts/DefaultLayout';
import LoginGitHubResponsePage from '../pages/LoginGitHubResponsePage';
import LoginGitHubPage from '../pages/LoginGitHubPage';

const Routes = [
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

export default Routes;
