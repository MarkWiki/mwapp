import React from 'react';
import AuthService from '../services/AuthService';
import { getQueryVariable } from '../utils/url';
import gitHubLogoLightLarge from '../images/GitHub-Mark-120px-plus.png';

const applyLoginCode = async () => {
    const code = getQueryVariable('code') || null;
    const state = getQueryVariable('state') || null;
    try {
        await AuthService.loginCodeGitHubAsync(code, state);
    } catch (error) {
        console.warn('Failed to login.', error);
        window.location = '/';
    }
};

const LoginGitHubResponsePage = () => {
    applyLoginCode();

    return (
        <div className="pt-5">
            <div className="text-center">
                <img src={gitHubLogoLightLarge} alt="GitHub Mark" />
                <div className="pt-4">
                    {'Logging you in...'}
                </div>
            </div>
        </div>
    );
};

export default LoginGitHubResponsePage;
