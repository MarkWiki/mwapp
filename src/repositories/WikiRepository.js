import GitHubApiService from '../services/GitHubApiServices';
import StorageService from '../services/StorageService';

class WikiRepository {
    static instance;

    async getCurrentUserWikisAsync() {
        try {
            const cachedWikis = StorageService.permanentGet('currentUserWikis');
            if (cachedWikis != null && cachedWikis instanceof Array) return cachedWikis;

            const wikis = await GitHubApiService.instance.getCurrentUserWikisAsync();
            StorageService.permanentSet('currentUserWikis', wikis);

            return wikis;
        } catch (error) {
            // TODO: Log
            console.warn('Failed to retrieve current user wikis.', error);
            throw new Error("couldn't resolve current user wikis");
        }
    }
}

WikiRepository.instance = new WikiRepository();

export default WikiRepository;
