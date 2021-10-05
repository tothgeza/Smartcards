import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL_MYCLASS = "http://localhost:8080/api/myclass/";

const getMyClasses = () => {
    const userId = AuthService.getCurrentUser().id;
    return axios.get(API_URL_MYCLASS + "user/" + userId, { headers: authHeader() });
}

const createMyClass = (title) => {
    const userId = AuthService.getCurrentUser().id;
    return axios
        .post(API_URL_MYCLASS + "user/" + userId, {
            title,
        }, { headers: authHeader() });
}

const updateMyClassTitle = async (myClassId, newTitle) => {
    return axios
        .put(API_URL_MYCLASS + myClassId, {
            "title": newTitle
        }, { headers: authHeader() });
}

const deleteMyClass = (myClassId) => {
    return axios
        .delete(API_URL_MYCLASS + myClassId, { headers: authHeader() });
}

export default {
    getMyClasses,
    createMyClass,
    updateMyClassTitle,
    deleteMyClass,
};