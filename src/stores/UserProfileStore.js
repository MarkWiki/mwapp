class UserProfileStore {
    _users = {};

    get(userId) {
        const matchedUsers = this._users.filter(u => u && u.userId === userId);
        return matchedUsers.length > 0 ? matchedUsers[0] : null;
    }

    set(userProfile) {
        this._users[userProfile.userId] = userProfile;
    }
}

export default UserProfileStore;
