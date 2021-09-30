import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
}

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getMyClasses = () => {
    const url = AuthService.getCurrentUserURL();
    return axios.get(url + "classes", { headers: authHeader() });
}

const createMyClass = (title) => {
    const url = AuthService.getCurrentUserURL();
    return axios
        .post(url + "classes", {
            title,
        }, { headers: authHeader() });
}

const deleteMyClass = (class_id) => {
    const url = AuthService.getCurrentUserURL();
    return axios
        .delete(url + "classes/" + class_id, { headers: authHeader() });
}

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    getMyClasses,
    createMyClass,
    deleteMyClass,
};