/* eslint-disable  no-await-in-loop */

import axios from 'axios';
import AuthService from './AuthService';

class GitHubApiService {
    static instance;

    async getUserWikisAsync() {
        try {
            const wikiRepos = [];

            const organizationQuery = `
              query GetAllRepoRootFiles {
                viewer {
                  login
                  repositories(first: 100 isFork: false) {
                    edges {
                      node {
                        ...repoFragment
                      }
                    }
                  }
                  organizations(first: 100) {
                    edges {
                      node {
                        id
                        name
                        url
                        repositories(first: 100 isFork: false) {
                          edges {
                            node {
                              ...repoFragment
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              
              fragment repoFragment on Repository {
                id
                name
                url
                defaultBranchRef {
                  target {
                    ... on Commit {
                      tree {
                        entries {
                          name
                          mode
                          type
                        }
                      }
                    }
                  }
                }
              }`;
            const result = await this._graphRequestAsync(organizationQuery);

            const repos = [];

            // Process user repos
            const userRepos = result.data.viewer.repositories.edges;
            for (
                let userRepositoryIndex = 0;
                userRepositoryIndex < userRepos.length;
                userRepositoryIndex++
            ) {
                const userRepo = userRepos[userRepositoryIndex];
                repos.push({ owner: result.data.viewer.login, repo: userRepo });
            }

            // Process organization repos
            const organizations = result.data.viewer.organizations.edges;
            for (
                let organizationIndex = 0;
                organizationIndex < organizations.length;
                organizationIndex++
            ) {
                const organization = organizations[organizationIndex];
                if (organization.node != null) {
                    const organizationLogin = organization.node.name;
                    const organizationRepos = organization.node.repositories.edges;
                    for (
                        let repoIndex = 0;
                        repoIndex < organizationRepos.length;
                        repoIndex++
                    ) {
                        const repo = organizationRepos[repoIndex];
                        repos.push({ owner: organizationLogin, repo });
                    }
                }
            }

            // Process repos - get only mark wiki repos
            for (let repoIndex = 0; repoIndex < repos.length; repoIndex++) {
                const repo = repos[repoIndex];
                if (
                    repo.repo.node.defaultBranchRef.target.tree.entries.find(
                        e => e.name.startsWith('.markwiki')
                    )
                ) {
                    wikiRepos.push({
                        owner: repo.owner,
                        id: repo.repo.node.id,
                        name: repo.repo.node.name,
                        url: repo.repo.node.url
                    });
                }
            }

            return wikiRepos;
        } catch (error) {
            // TODO: Log
            console.warn(error);
            return [];
        }
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
            if (error.status === 401) AuthService.instance.tryRenewToken();

            // TODO: Log
            console.warn('Failed to retrieve current user profile.', error);
            return null;
        }
    }

    async _graphRequestAsync(query) {
        try {
            const response = await this._getClient().post('/graphql', {
                query
            });

            if (response.data.data == null) return this._handleGraphError(response.data.errors);

            return response.data;
        } catch (error) {
            if (error.response.status !== 200) return this._handleInvalidStatusCode(error.response);
            return error;
        }
    }

    _handleGraphError(error) {
        console.warn('Got error from graph API', error);
        // TODO: Log
        return null;
    }

    _handleInvalidStatusCode(response) {
        console.warn(`Got invalid response code: ${response.status}`, response);

        if (response.status === 401) AuthService.instance.tryRenewToken();

        // TODO: Log
        return null;
    }

    _getClient() {
        return axios.create({
            baseURL: 'https://api.github.com/',
            timeout: 30000,
            headers: {
                Authorization: `bearer ${AuthService.instance.gitHubToken}`
            }
        });
    }
}

GitHubApiService.instance = new GitHubApiService();

export default GitHubApiService;
