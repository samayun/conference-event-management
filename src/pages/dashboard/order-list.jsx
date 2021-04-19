import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderProvider";
import { useAuth } from "../../context/AuthProvider";
import DashboardLayout from "../../Layout/Dashboard.layout";
import ErrorComponent from "../ErrorComponent";
import SkeletonLoader from "../SkeletonLoader";

export default function ManageServices() {
    const [data, setData] = useState({});
    const { UserIsAdmin } = useAuth();
    const { getAllOrder, deleteOrder, orders, setOrders } = useOrder();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ loading: true });
                let response = await getAllOrder();
                setOrders(response);
                setData({ loading: false });
            } catch (error) {
                setData({ error, place: "list" });
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    // DELETE OPERATION
    const handleDelete = async (serviceId) => {
        try {
            setData({ loading: true });
            let deletedData = await deleteOrder(serviceId);
            setOrders(orders.filter((dt) => deletedData._id !== dt._id));
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: "delete" });
        }
    };

    return (
        <DashboardLayout>
            <h3 className="text-teal"> Orders </h3>
            {data.loading ? (
                <SkeletonLoader />
            ) : (
                <div class="table-responsive">
                    <table class="table caption-top">
                        <caption> List of Orders </caption>
                        <thead>
                            <tr>
                                <th scope="col"> PaymentId </th>
                                <th scope="col"> Service Name </th>
                                <th scope="col"> Thumbnail </th>
                                {UserIsAdmin && <th scope="col">Email</th>}
                                <th scope="col">Amount</th>
                                <th scope="col">Shipment Address</th>
                                <th scope="col">Status</th>
                                {UserIsAdmin && <th scope="col">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    {data.error && (
                                        <ErrorComponent error={data.error} to={"/dashboard"} />
                                    )}
                                </td>
                            </tr>

                            {orders.length > 0 ? (
                                orders.map(
                                    ({ _id, paymentId, amount, payment, service, shipment, status }) => (
                                        <tr key={paymentId}>
                                            <td>
                                                <code>
                                                    {paymentId}
                                                </code></td>
                                            <td> {service?.name} </td>
                                            <td> <img
                                                src={service?.image}
                                                alt={service?.name}
                                                className="img-md img-circle" /> </td>
                                            {UserIsAdmin && <th scope="col">{shipment?.email}</th>}
                                            <td>{amount}</td>
                                            <td>{shipment?.address}</td>
                                            <td>
                                                {status === "pending" && (
                                                    <button className="btn btn-outline-danger">
                                                        {" "}
                                                        <i className="fal fa-close"></i> Pending{" "}
                                                    </button>
                                                )}
                                                {status === "paid" ||
                                                    (status === "done" && (
                                                        <button className="btn btn-success">
                                                            <i className="far fa-check text-white"></i>
                                                            Paid{" "}
                                                        </button>
                                                    ))}
                                                {status === "ongoing" && (
                                                    <button className="btn btn-info">
                                                        <i class="fas fa-spinner"></i>
                                                         On Going{" "}
                                                    </button>
                                                )}
                                                {status === "rejected" && (
                                                    <button className="btn btn-outline-danger">
                                                        <i class="fas fa-times"></i> rejected{" "}
                                                    </button>
                                                )}
                                            </td>

                                            {UserIsAdmin && (
                                                <td>
                                                    <button
                                                        onClick={() => handleDelete(_id)}
                                                        className="btn btn-danger"
                                                    >
                                                        <i className="fas fa-trash p-2"></i>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan={8}>
                                        <h3 className="text-center text-danger">
                                            {UserIsAdmin ? `There has no orders` : `You haven't ordered any service yet`} </h3>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </DashboardLayout>
    );
}
