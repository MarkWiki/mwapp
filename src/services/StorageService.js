class StorageService {
    static localStorageSet(key, value) {
        if (!window.localStorage) return;

        if (value == null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, JSON.stringify(value));
    }

    static localStorageGet(key) {
        if (!window.localStorage) return null;

        const item = window.localStorage.getItem(key);
        if (item != null) return JSON.parse(item);
        return null;
    }
}

export default StorageService;
