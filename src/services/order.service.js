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
            if (error.response && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("Order Render failed");
            }
        }
    }

    // USER 
    async createOrder(orderData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'post',
                url: `/orders`,
                data: orderData,
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
                throw new Error("Order Creation failed");
            }
        }
    }
    async updateOrder(orderId, orderData) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'put',
                url: `/orders/${orderId}`,
                data: orderData,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data;
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
            if (error.response && error.response.data.error) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error(`error in Admin deleteOrder`);
            }

        }
    }

}

// eslint-disable-next-line 
export default new Order;
