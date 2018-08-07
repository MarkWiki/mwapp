class StorageService {
    static permanentSet(key, value) {
        if (!window.localStorage) return;

        if (value == null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, JSON.stringify(value));
    }

    static permanentGet(key) {
        if (!window.localStorage) return null;

        const item = window.localStorage.getItem(key);
        if (item != null) return JSON.parse(item);
        return null;
    }
}

export default StorageService;
