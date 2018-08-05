import axios from 'axios';
import StorageService from './StorageService';

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
    const redirectUrl =
      StorageService.localStorageGet('loginGitHubSourceUrl') || '/';
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

export default AuthService;
