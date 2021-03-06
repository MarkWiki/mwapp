import axios from 'axios';
import StorageService from './StorageService';

class AuthService {
    static instance;

    get isAuthenticated() {
        this.tryAuthenticate();
        return this.gitHubToken != null;
    }

    gitHubToken = null;

    tryAuthenticate() {
        if (this.gitHubToken != null) return;

        this.gitHubToken = StorageService.permanentGet('gitHubToken');
    }

    tryRenewToken() {
        AuthService.clearOauthGitHub();
        AuthService.navigateOauthGitHub(window.location.href);
    }

    static clearOauthGitHub() {
        StorageService.permanentSet('gitHubToken', null);
        this.gitHubToken = null;
    }

    static navigateOauthGitHub(fromPathname) {
        const state = new Date().getTime();
        const scopes = 'user,repo,public_repo,user:email,read:org';
        const clientId = '815b10ee06332853b128';
        const redirectUrl = 'https://markwiki.com/login/github';
        const newLocation = `https://github.com/login/oauth/authorize?client_id=${encodeURI(
            clientId
        )}&redirect_uri=${encodeURI(redirectUrl)}&scope=${encodeURI(
            scopes
        )}&state=${encodeURI(state)}`;

        // Save return state
        StorageService.permanentSet('loginGitHubSourceUrl', fromPathname);
        StorageService.permanentSet('loginGitHubNonce', state);

        window.location = newLocation;
    }

    static async loginCodeGitHubAsync(code, state) {
        const redirectUrl = StorageService.permanentGet('loginGitHubSourceUrl') || '/';
        const checkNonce = StorageService.permanentGet(
            'loginGitHubNonce'
        );

        if (checkNonce == null || checkNonce.toString() !== state) {
            throw new Error('Login GitHub: Nonce not matching or non existent.');
        }

        const response = await axios.get(
            `https://dqdzhooyx3.execute-api.eu-central-1.amazonaws.com/dev/token/github?code=${code}`
        );
        const accessToken = response.data.access_token;

        StorageService.permanentSet('loginGitHubSourceUrl', null);
        StorageService.permanentSet('loginGitHubNonce', null);
        StorageService.permanentSet('gitHubToken', accessToken);

        window.location = redirectUrl;
    }
}

AuthService.instance = new AuthService();

export default AuthService;
