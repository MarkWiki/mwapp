import { observable } from 'mobx';

class UserProfile {
    @observable userId = null;

    @observable userEmail = null;

    @observable userName = null;


    setUserInfo(userId, userName, userEmail = null) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}

export default UserProfile;
