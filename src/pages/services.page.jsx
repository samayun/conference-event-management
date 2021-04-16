import { Suspense, useEffect, useState } from "react"
import MainAppLayout from "../Layout/MainApp.layout";
import Service from '../services/service.service';
import Loading from './Loading'

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const fetchData = async () => {
        try {
            let data = await Service.getAll();
            setTimeout(() => {
                setServices(data)
            }, 3000);
        } catch (error) {
            setTimeout(() => alert(error.message), 4000)
        }
    }
    useEffect(fetchData, [])
    return (
        <MainAppLayout>
            <div className="container-fluid py-3  clip bg-light animation-right fade-right">
                <div className="container py-3">
                    <h2 className="text-teal text-center py-3">Our Main services</h2>
                    <Suspense fallback={<h2 className="text-teal">Loading.....</h2>}>
                        {
                            !services.length && <Loading />
                        }
                        <div className="row  text-center">
                            {
                                services.map(({ _id, icon, title, description }) => (
                                    <div className="col-md-4">
                                        <div className="card-body bg-white m-1 shadow px-4 ">
                                            <div className="icon">
                                                <i className={icon}></i>
                                            </div>
                                            <img data-lazy="/logo512.png" alt="" className=" img-fluid" />
                                            <h2 className="text-info">{title}</h2>
                                            <p> {description.substr(0, 30)} </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </Suspense>
                </div>
            </div>
        </MainAppLayout>
    )
}
