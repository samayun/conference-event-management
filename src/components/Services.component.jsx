import { Suspense, useEffect, useState } from "react"
import Service from '../services/service.service';
import SkeletonLoader from "../pages/SkeletonLoader";
import Loading from "../pages/Loading";
import { useSpring, animated as a } from 'react-spring'

import { useError } from "../context/useError";
import { Link } from "react-router-dom";



export default function Services() {
    const [services, setServices] = useState([]);
    const { renderError } = useError();

    const [flipped, set] = useState(true)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    })

    // eslint-disable-next-line
    useEffect(() => {
        async function fetchData() {
            try {
                let data = await Service.getAll()
                setServices(data)
            } catch (error) {
                renderError(error);
            }
        }
        fetchData();
    }, [renderError]);

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
                                    <div className="col-md-4" onClick={() => set(state => !state)}>

                                        <div className="card-body bg-white m-1 shadow px-4 ">
                                            {
                                                flipped ? <a.img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="img-thumbnail"
                                                    style={{
                                                        opacity: opacity.interpolate(o => 1 - .2),
                                                        transform
                                                    }} /> : <a.img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="img-thumbnail"
                                                    style={{
                                                        opacity: .3,
                                                        transform: transform.interpolate(t => `${t} rotateX(10deg)`)
                                                    }}
                                                />
                                            }
                                            <h2 className="text-info">{service.name}</h2>
                                            <p> Registration Fee : {service.price} </p>
                                            <p> {service.description.substr(0, 50)} </p>
                                            <Link className="btn btn-warning" to={`/services/${service._id}`}> Book Now  </Link>
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
