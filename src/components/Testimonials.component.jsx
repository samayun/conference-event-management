import { Suspense, useEffect, useState } from "react"
import Service from '../services/service.service';
// import Loader from '../pages/Loading'
// col - md - 4
export default function Services() {
    const [services, setServices] = useState([]);
    const fetchData = async () => {
        try {
            let data = await Service.getAll()
            setTimeout(() => {
                setServices(data.slice(0, 2))
            }, 3000);
        } catch (error) {
            setTimeout(() => alert(error.message), 4000)
        }
    }
    useEffect(fetchData, [])
    return (
        <div className="container-fluid py-3  mt-5 clip bg-light animation-right fade-right">
            <div className="container py-3">
                <h2 className="text-teal text-center py-3"> Testimonials </h2>
                <Suspense fallback={<h2> .Loader </h2>}>
                    {
                        !services.length && <h1>LOADER...........</h1>
                    }
                    <div className="row  text-center">
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
                </Suspense>
            </div>
        </div>
    )
}
