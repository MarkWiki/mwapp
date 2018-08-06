import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AuthService from '../services/AuthService';
import gitHubLogoLightLarge from '../images/GitHub-Mark-120px-plus.png';

const resolveFromPathname = location => {
    const state = location && location.state;
    return (state.from && state.from.pathname) || '/';
};

const LoginGitHubPage = ({ location }) => {
    AuthService.navigateOauthGitHub(resolveFromPathname(location));

    return (
        <div className="pt-5">
            <div className="text-center">
                <img src={gitHubLogoLightLarge} alt="GitHub Mark" />
                <div className="pt-4">{'Redirecting to GitHub...'}</div>
            </div>
        </div>
    );
};

LoginGitHubPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default observer(LoginGitHubPage);
