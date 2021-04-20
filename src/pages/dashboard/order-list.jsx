import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderProvider";
import { useAuth } from "../../context/AuthProvider";
import DashboardLayout from "../../Layout/Dashboard.layout";
import ErrorComponent from "../ErrorComponent";
import SkeletonLoader from "../SkeletonLoader";

export default function OrderList() {
    const [data, setData] = useState({});
    const { UserIsAdmin } = useAuth();
    const {
        getAllOrder,
        updateOrder,
        deleteOrder,
        orders,
        setOrders,
    } = useOrder();

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

    // UPDATE OPERATION
    const handleChange = async (e) => {
        const orderId = e.target.dataset.orderid;
        const value = e.target.value;
        try {
            setData({ loading: true });
            let updatedData = await updateOrder(orderId, {
                status: value,
            });
            let updata = orders.find((dt) => updatedData._id === dt._id);
            updata["status"] = updatedData.status;
            setOrders([...orders, updata]);
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: "delete" });
        }
    };

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
    const fixedStatus = {
        position: 'absolute',
        top: '0',
        right: 0,
        marginRight: '3px',
        marginTop: '3px',
    }

    return (
        <DashboardLayout>
            <h3 className="text-teal"> {UserIsAdmin ? 'All Orders' : 'My Orders'} </h3>

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
                                    ({
                                        _id,
                                        paymentId,
                                        amount,
                                        payment,
                                        service,
                                        shipment,
                                        status,
                                    }) => (
                                        <tr key={paymentId}>
                                            <td>
                                                <code>{paymentId}</code>
                                            </td>
                                            <td> {service?.name} </td>
                                            <td>
                                                {" "}
                                                <img
                                                    src={service?.image}
                                                    alt={service?.name}
                                                    className="img-md img-circle"
                                                />{" "}
                                            </td>
                                            {UserIsAdmin && <th scope="col">{shipment?.email}</th>}
                                            <td> ৳ {amount}</td>
                                            <td>{shipment?.address}</td>
                                            {!UserIsAdmin ? (
                                                <td>
                                                    {/done|paid/.test(status) && (
                                                        <span className="badge bg-success p-2">
                                                            <i className="far fa-check text-white"></i>
                              Paid
                                                        </span>
                                                    )}
                                                    {/pending|ongoing/.test(status) && (
                                                        <span className="badge bg-info p-2">
                                                            <i class="fas fa-spinner"></i>
                              On Going
                                                        </span>
                                                    )}
                                                    {/rejected/.test(status) && (
                                                        <span className="badge bg-danger p-2">
                                                            <i class="fas fa-times"></i> Rejected
                                                        </span>
                                                    )}
                                                </td>
                                            ) : (
                                                <td>
                                                    <select
                                                        onChange={handleChange}
                                                        data-orderid={_id}
                                                        className={
                                                            /done|paid/.test(status)
                                                                ? `btn btn-success`
                                                                : /pending|ongoing/.test(status)
                                                                    ? `btn btn-info`
                                                                    : "btn btn-danger"
                                                        }
                                                    >
                                                        <option
                                                            value="done"
                                                            selected={/done|paid/.test(status)}
                                                        >
                                                            {" "}
                              DONE{" "}
                                                        </option>

                                                        <option
                                                            value="pending"
                                                            selected={/pending|ongoing/.test(status)}
                                                        >
                                                            {" "}
                              PENDING{" "}
                                                        </option>
                                                        <option
                                                            value="rejected"
                                                            selected={/rejected/.test(status)}
                                                        >
                                                            {" "}
                              Rejected{" "}
                                                        </option>
                                                    </select>
                                                </td>
                                            )}
                                            <td>
                                                {UserIsAdmin && (
                                                    <button
                                                        onClick={() => handleDelete(_id)}
                                                        className="btn btn-danger"
                                                    >
                                                        <i className="fas fa-trash p-2"></i>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td colSpan={8}>
                                        <h3 className="text-center text-danger">
                                            {UserIsAdmin
                                                ? `There has no orders`
                                                : `You haven't ordered any service yet`}{" "}
                                        </h3>
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
