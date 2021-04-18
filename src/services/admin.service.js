import axios from "./axios";

class AdminDataService {
    async getAll() {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.get(`/admins`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            return data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Failed to add admin");
            }
        }
    }
    async getSingleAdmin(email) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.get(`/admins?email=${email}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            return data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Failed to add admin");
            }
        }
    }
    async createAdmin(adminData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'post',
                url: `/admins`,
                data: adminData,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            if (error.response && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Failed to add admin");
            }
        }
    }
    async editAdmin(email, payload) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'put',
                url: `/admins?email=${email}`,
                data: payload,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data
        } catch (error) {
            throw new Error("Refresh your browser or login again. Service service failed");
        }
    }

    async deleteAdmin(email) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.delete(`/admins?email=${email}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

}

// eslint-disable-next-line 
export default new AdminDataService;
