import axios from 'axios';
import AuthService from './AuthService';

class GitHubApiService {
  static instance;

  async getUserNameAsync() {
    if (!AuthService.instance.isAuthenticated) return null;

    try {
      const response = await this._graphRequestAsync(
        'query { viewer { login } }'
      );
      const userName = response.data.data.viewer.login;
      return userName;
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

export default GitHubApiService;
