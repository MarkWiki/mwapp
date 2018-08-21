import ProfileViewModel from '../viewModels/ProfileViewModel';
import UserProfileStore from './UserProfileStore';

const Stores = {
    userProfileStore: new UserProfileStore(),
    currentUserProfileViewModel: new ProfileViewModel(true)
};

export default Stores;
