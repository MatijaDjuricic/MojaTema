import Cookie from 'js-cookie';
export const useCookie = () => {
    const setCookie = (name: string, token: string): void => {
        Cookie.set(name, token, {
            secure: true,
            sameSite: 'strict'
        });
    }
    const getCookie = (name: string): string | undefined => Cookie.get(name);
    const removeCookie = (name: string): void => Cookie.remove(name)
    return { setCookie, getCookie, removeCookie }
}