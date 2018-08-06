import { observable, action } from 'mobx';
import GitHubApiService from '../services/GitHubApiServices';

class ProfileViewModel {
    @observable
    id;

    @observable
    isLoading;

    @observable
    userName;

    @observable
    email;

    isCurrentUser = false;

    constructor(isCurrentUser) {
        if (typeof isCurrentUser !== 'boolean') throw new Error('Invalid argument type isCurrentUser.');

        this.isLoading = true;
        this.isCurrentUser = isCurrentUser;

        setTimeout(() => this.loadProfileAsync(), 0);
    }

    @action.bound
    async loadProfileAsync() {
        this.isLoading = true;

        try {
            const profile = this.isCurrentUser
                ? await GitHubApiService.instance.getCurrentUserProfile()
                : await GitHubApiService.instance.getUserProfile(this.userName);

            if (profile == null) throw new Error('Got null profile.');

            this.id = profile.id;
            this.userName = profile.userName;
            this.email = profile.email;
        } catch (error) {
            // TODO: Log
            console.warn('Failed to retrieve profile details.', error);
        }

        this.isLoading = false;
    }
}

export default ProfileViewModel;
