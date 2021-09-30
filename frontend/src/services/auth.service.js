import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_URL_USERS = "http://localhost:8080/api/users/";

const register = (username, email, password) => {
    return axios
        .post(API_URL + "signup", {
            username,
            email,
            password,
        });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data
        });
};

const logout = () => {
    localStorage.removeItem("user");
    // window.location.reload();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
};

const getCurrentUserURL = () => {
    const userId = getCurrentUser().id;
    return API_URL_USERS + userId + "/"
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentUserURL,
};