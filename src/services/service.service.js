import axios from "./axios";

class Service {
    async getAll() {
        try {
            let { data } = await axios.get(`/services`);
            console.log(data);
            return data;
        } catch (error) {
            throw new Error("Services fetch error");
        }
    }
    async getSingleService(id) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.get(`/services/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log(data);
            return data;
        } catch (error) {
            throw new Error("Service fetch error");
        }
    }
    async createService(serviceData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'post',
                url: `/services`,
                data: serviceData,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            throw new Error("Service fetch error");
        }
    }
    async editService(productId, serviceData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'put',
                url: `/products/${productId}`,
                data: serviceData,
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

    async deletService(id) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.delete(`/services/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            throw new Error(`error in Admin deletService`)
        }
    }

    async createOrder(orderData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.post(`/orders`, {
                data: orderData,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data
        } catch (error) {
            throw new Error(`error in Admin createOrder`);
        }
    }

    async fetchOrdersByEmail(email) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.get(`/orders/find?email=${email}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            throw new Error("Error in fetchOrdersByEmail")
        }
    }

}

// eslint-disable-next-line 
export default new Service;
