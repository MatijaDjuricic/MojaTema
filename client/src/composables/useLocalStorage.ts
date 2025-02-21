export const useLocalStorage = () => {
    const get = (key: string): string | null => {
        return localStorage.getItem(key);
    }
    const set = (key: string, item: string): void => {
        localStorage.setItem(key, item);
    }
    const remove = (key: string): void => {
        localStorage.removeItem(key);
    }
    return {
        get,
        set,
        remove
    }
}