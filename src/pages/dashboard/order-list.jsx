import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderProvider";
import { useAuth } from "../../context/AuthProvider";
import DashboardLayout from "../../Layout/Dashboard.layout";
import ErrorComponent from "../ErrorComponent";
import SkeletonLoader from "../SkeletonLoader";

export default function ManageServices() {
    const [data, setData] = useState({});
    const { UserIsAdmin } = useAuth()
    const { getAllOrder, deleteOrder, orders, setOrders } = useOrder();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ loading: true })
                let response = await getAllOrder();
                setOrders(response);
                setData({ loading: false })
            } catch (error) {
                setData({ error, place: 'list' })
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    // DELETE OPERATION 
    const handleDelete = async (serviceId) => {
        try {
            setData({ loading: true });
            let deletedData = await deleteOrder(serviceId);
            setOrders(orders.filter(dt => deletedData._id !== dt._id));
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'delete' })
        }
    }

    return (
        <DashboardLayout>
            <h3 className="text-teal"> Orders  </h3>
            {data.loading ? <SkeletonLoader /> : (
                <div class="table-responsive-sm">
                    <table class="table caption-top">
                        <caption> List of Orders </caption>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                {UserIsAdmin && <th scope="col">Email</th>}
                                <th scope="col">Amount</th>
                                <th scope="col">Status</th>
                                {UserIsAdmin && <th scope="col">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    {data.error && <ErrorComponent error={data.error} to={"/dashboard"} />}
                                </td>
                            </tr>
                            {
                                orders.length > 0 ? orders.map(({ _id, image, price, name, email, status }) => (
                                    <tr key={_id}>
                                        <td> {name} </td>
                                        {UserIsAdmin && <th scope="col">{email}</th>}
                                        <td>{price}</td>
                                        <td>
                                            {status === 'pending' && <button className="btn btn-outline-danger"> Pending </button>}
                                            {status === 'paid' && <button className="btn btn-success"> Paid </button>}
                                            {status === 'ongoing' && <button className="btn btn-info"> On Going </button>}
                                            {status === 'rejected' && <button className="btn btn-outline-danger"> rejected </button>}
                                        </td>

                                        {
                                            UserIsAdmin && <td>
                                                <button
                                                    onClick={() => handleDelete(_id)}
                                                    className="btn btn-danger">
                                                    <i className="fas fa-trash p-2"></i>
                                                </button>
                                            </td>
                                        }

                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={8}>
                                            <h3 className="text-center text-danger"> No Orders Yet </h3>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>

                </div>
            )}
        </DashboardLayout>
    )
}