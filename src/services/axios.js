import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_SERVER_URL_DEV : process.env.REACT_APP_SERVER_URL,
    headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }
})
