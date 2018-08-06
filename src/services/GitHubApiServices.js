import axios from 'axios';
import AuthService from './AuthService';

class GitHubApiService {
    static instance;

    async getUserProfile(userName) {
        if (!AuthService.instance.isAuthenticated) return null;

        try {
            const response = await this._graphRequestAsync(
                `query { user(login: '${userName}') { id, login, email } }`
            );

            const profileId = response.data.user.id;
            const profileUserName = response.data.user.login;
            const profileEmail = response.data.user.email;

            return {
                id: profileId,
                userName: profileUserName,
                email: profileEmail
            };
        } catch (error) {
            // TODO: Log
            console.warn(
                `Failed to retrieve user profile for ${userName}.`,
                error
            );
            return null;
        }
    }

    async getCurrentUserProfile() {
        if (!AuthService.instance.isAuthenticated) return null;

        try {
            const response = await this._graphRequestAsync(
                'query { viewer { id, login, email } }'
            );

            const profileId = response.data.viewer.id;
            const profileUserName = response.data.viewer.login;
            const profileEmail = response.data.viewer.email;

            return {
                id: profileId,
                userName: profileUserName,
                email: profileEmail
            };
        } catch (error) {
            // TODO: Log
            console.warn('Failed to retrieve current user profile.', error);
            return null;
        }
    }

    async _graphRequestAsync(query) {
        const response = await this._getClient().post('/graphql', {
            query
        });

        if (response.status !== 200) return this._handleInvalidStatusCode(response);

        return response.data;
    }

    _handleInvalidStatusCode(response) {
        console.warn(`Got invalid response code: ${response.status}`, response);
        // TODO: Log
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
