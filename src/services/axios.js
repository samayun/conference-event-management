import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV !== "production"
        ? process.env.REACT_APP_SERVER_URL_DEV
        : process.env.REACT_APP_SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (401 === error.response.status) {
            window.location.reload(true);
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;