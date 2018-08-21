import { observable } from 'mobx';
import UserProfile from './UserProfile';

class CurrentUserProfile extends UserProfile {
    @observable isAuthenticated = false;

    setUserInfo(userId, userName, userEmail = null) {
        super(userId, userName, userEmail);
        this.isAuthenticated = false;
    }

    signOut() {
        this.isAuthenticated = false;
    }
}

export default CurrentUserProfile;
