import { observable, computed } from 'mobx';
import WikiRepository from '../repositories/WikiRepository';

class LandingPageViewModel {
    @observable isLoadingWikis;

    @computed currentUserWikis;

    async loadCurrentUserWikis() {
        this.isLoadingWikis = true;

        try {
            this.currentUserWikis = await WikiRepository.instance.getCurrentUserWikisAsync();
        } catch (error) {
            console.warn('LandingPage: Failed to load current user wikis.', error);
        }

        this.isLoadingWikis = false;
    }
}

export default LandingPageViewModel;
