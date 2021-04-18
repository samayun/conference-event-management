import axios from "./axios";

class Order {
    // Admins
    async getAll() {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.get(`/orders`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            throw new Error("Orders fetch error");
        }
    }

    // USER 
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
    // ADMIN 
    async deleteOrder(orderId) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.delete(`/orders/${orderId}`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data
        } catch (error) {
            throw new Error(`error in Admin deleteOrder`);
        }
    }

}

// eslint-disable-next-line 
export default new Order;
