import axios from 'axios';
import AuthService from './AuthService';

class GitHubApiService {
    static instance;

    async getUserWikisAsync() {
        try {
            const currentUserOrganizationsQuery = '{ viewer { organizations(first: 100) { edges { node { login } } } } }';

            const currentUserOrganizationsResult = await this._graphRequestAsync(currentUserOrganizationsQuery);
            if (currentUserOrganizationsResult == null) return;
            console.log(currentUserOrganizationsResult);
            const organizationsLogins = currentUserOrganizationsResult.data.viewer.organizations.edges.map(edge => edge.node.login);
            console.log(organizationsLogins);
        } catch (error) {
            // TODO: Log
        }
        // const organization = 'markwiki';
        // const organizationQuery = `{ organization(login: "${organization}") { repositories(first: 100) { edges { node { defaultBranchRef { target { ... on Commit { tree { entries { name, mode, type, } } } } } } } } } }`;

        // const viewerQuery = '{ viewer { repositories(first: 100) { edges { node { defaultBranchRef { target { ... on Commit { tree { entries { name, mode, type } } } } } } } } } }';
    }

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
        if (response.data.data == null) return this._handleGraphError(response.data.errors);

        return response.data;
    }

    _handleGraphError(error) {
        console.warn('Got error from graph API', error);
        // TODO: Log
        return null;
    }

    _handleInvalidStatusCode(response) {
        console.warn(`Got invalid response code: ${response.status}`, response);
        // TODO: Log
        return null;
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
