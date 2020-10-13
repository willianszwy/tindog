export const TOKEN_KEY = "TinDog-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getAvatar = avatar => avatar + "&access_token=" + localStorage.getItem("facebook_token");
export const login = data => {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    setUser(data.profile);
    localStorage.setItem("facebook_token", data.facebook_token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("facebook_token");
};
export const getUser = () => JSON.parse(localStorage.getItem("currentUser"));
export const setUser = user =>
    localStorage.setItem("currentUser", JSON.stringify(user));
export const isActivate = () => !getUser().primeiro_acesso;