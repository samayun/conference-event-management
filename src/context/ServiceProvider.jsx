import { createContext, useContext, useState } from 'react'

import ServiceDataStore from '../services/service.service';

const ServiceContext = createContext();
export const useService = () => useContext(ServiceContext);


export default function ServiceProvider({ children }) {
    const [services, setServices] = useState([]);

    const getAllServiceData = () => ServiceDataStore.getAll()
    const getSingleService = serviceId => ServiceDataStore.getSingleService(serviceId)
    const createService = formData => ServiceDataStore.createService(formData)
    const deleteService = serviceId => ServiceDataStore.deleteService(serviceId);
    const updateService = (productId, serviceData) => ServiceDataStore.editService(productId, serviceData);

    const value = {
        services, setServices,
        getAllServiceData, createService, getSingleService, updateService, deleteService
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}
