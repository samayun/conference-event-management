import { useEffect, useState } from "react";
import { useService } from "../../context/ServiceProvider";
import DashboardLayout from "../../Layout/Dashboard.layout";
import ErrorComponent from "../ErrorComponent";
import SkeletonLoader from "../SkeletonLoader";

export default function ManageServices() {
    const [data, setData] = useState({});

    const { getAllServiceData, deleteService, services, setServices } = useService();


    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ loading: true })
                let response = await getAllServiceData();
                setServices(response);
                setData({ loading: false })
            } catch (error) {
                setData({ error })
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    // DELETE OPERATION 
    const handleDelete = async (serviceId) => {
        try {
            setData({ loading: true });
            let deletedService = await deleteService(serviceId);
            setServices(services.filter(dt => deletedService._id !== dt._id));
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'delete' })
        }
    }

    return (
        <DashboardLayout>
            <h3 className="text-teal"> Services </h3>
            {data.loading ? <SkeletonLoader /> : (
                <div class="table-responsive-sm">
                    <table class="table caption-top">
                        <caption>List of Services</caption>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    {data.error && <ErrorComponent error={data.error} to={"/dashboard"} />}
                                </td>
                            </tr>
                            {
                                services.length && services.map(({ _id, image, price, name, description }) => (
                                    <tr key={_id}>
                                        <td> {name} </td>
                                        <td> <img src={image} alt={name} className="img-md img-circle" /> </td>
                                        <td> {description} </td>
                                        <td>{price}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(_id)}
                                                className="btn btn-danger">
                                                <i className="fas fa-trash p-2"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                </div>
            )}
        </DashboardLayout>
    )
}
