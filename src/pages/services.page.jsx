import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useService } from "../context/ServiceProvider";

import MainAppLayout from "../Layout/MainApp.layout";
import ErrorComponent from "./ErrorComponent";

import SkeletonLoader from "./SkeletonLoader";

export default function ServicesPage() {
    const [data, setData] = useState({});
    const { getAllServiceData, services, setServices } = useService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log({ services })
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

    return (
        <MainAppLayout>
            <div className="container-fluid py-3  clip bg-light animation-right fade-right">
                <div className="container py-3">
                    <h2 className="text-teal text-center py-3">Our Main services   </h2>

                    {data.error && <ErrorComponent error={data.error} />}
                    {data.loading ? <SkeletonLoader /> : (
                        <div className="row  text-center">
                            {
                                services.length ? services.map(({ _id, image, name, price, description }) => (
                                    <div className="col-md-4">
                                        <div className="card-body bg-white m-1 shadow px-4 ">

                                            <img src={image} alt={name} className=" img-fluid" />
                                            <h2 className="text-info">{name}</h2>
                                            <p> Reeegistration Fee : ${price} </p>
                                            <p> {description.substr(0, 50)} </p>
                                            <Link className="btn btn-warning" to={`/services/${_id}`}> Book Now  </Link>
                                        </div>
                                    </div>
                                )) : <h3 className="text-danger"> No Service Found </h3>
                            }
                        </div>
                    )}

                </div>
            </div>
        </MainAppLayout>
    )
}
