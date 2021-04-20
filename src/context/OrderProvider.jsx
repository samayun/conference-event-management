import { createContext, useContext, useState } from 'react'

import OrderDataServices from '../services/order.service';

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);


export default function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [orderError, setOrderError] = useState();
    const [orderSuccess, setOrderSuccess] = useState();
    const getAllOrder = () => OrderDataServices.getAll()
    const createOrder = formData => OrderDataServices.createOrder(formData);
    const updateOrder = (orderId, formData) => OrderDataServices.updateOrder(orderId, formData);
    const deleteOrder = orderId => OrderDataServices.deleteOrder(orderId)

    const value = {
        orders, setOrders,
        getAllOrder, createOrder, updateOrder, deleteOrder,
        orderError, setOrderError,
        orderSuccess, setOrderSuccess
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}
