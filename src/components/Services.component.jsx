import { Suspense, useEffect, useState } from "react"
import Service from '../services/service.service';
import Loader from '../pages/Loading'
import SkeletonLoader from "../pages/SkeletonLoader";
import Loading from "../pages/Loading";
import ErrorComponent from "../pages/ErrorComponent";
import { useError } from "../context/useError";



export default function Services() {
    const [services, setServices] = useState([]);

    const { error, renderError } = useError();

    const fetchData = async () => {
        try {
            let data = await Service.getAll()
            setTimeout(() => {
                setServices(data)
            }, 3000);
        } catch (error) {
            renderError(error);
        }
    }
    // eslint-disable-next-line
    useEffect(fetchData, []);

    return (
        <>
            <Suspense fallback={<Loading />}>

                <div className="container-fluid py-3  mt-5 clip bg-light animation-right fade-right">
                    <div className="container py-3">
                        <h2 className="text-teal text-center py-3">Our Main Services</h2>
                        <div className="row  text-center">
                            {
                                !services.length && <SkeletonLoader />
                            }
                            {
                                services.map(service => (
                                    <div className="col-md-4">
                                        <div className="card-body bg-white m-1 shadow px-4 ">
                                            <div className="icon">
                                                <i className={service.icon}></i>
                                            </div>
                                            <img src="/logo512.png" alt="" className=" img-fluid" />
                                            <h2 className="text-info">{service.title}</h2>
                                            <p> {service.description.substr(0, 20)} </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </Suspense >
        </>
    )
}
