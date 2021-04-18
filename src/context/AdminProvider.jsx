import { createContext, useContext, useState } from 'react'

import AdminDataService from '../services/admin.service';

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);


export default function ServiceProvider({ children }) {
    const [admins, setAdmins] = useState([]);

    const getData = () => AdminDataService.getAll()
    const deleteAdmin = email => AdminDataService.deleteAdmin(email);
    const createAdmin = data => AdminDataService.createAdmin(data);

    const value = {
        admins, setAdmins,
        getData, createAdmin, deleteAdmin
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}
