import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useService } from "../context/ServiceProvider";
import { useSpring, animated as a } from "react-spring";
import MainAppLayout from "../Layout/MainApp.layout";
import ErrorComponent from "./ErrorComponent";

import Loading from "./Loading";
import { useOrder } from "../context/OrderProvider";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function ServiceSinglePage() {
    const { serviceId } = useParams();
    const [data, setData] = useState({});
    const [service, setService] = useState({});

    const { getSingleService } = useService();
    const { createOrder, orderError, setOrderError } = useOrder();
    const { currentUser } = useAuth();

    const [flipped, set] = useState(true);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log({ data });
                setData({ loading: true });
                let response = await getSingleService(serviceId);
                setService(response);
                setData({ loading: false });
            } catch (error) {
                setData({ error });
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);
    const { _id, name, description, price, image } = service;

    return (
        <MainAppLayout>
            <div className="container-fluid py-3  clip bg-light animation-right fade-right">
                <div className="container py-3">
                    {name && (
                        <h2 className="text-teal text-center py-3">
                            Service Name : {name}
                        </h2>
                    )}

                    {data.error && <ErrorComponent error={data.error} />}

                    {data.loading ? (
                        <Loading />
                    ) : (
                        <div className="row  text-center">
                            <div
                                className="col-md-5"
                                onMouseOver={() => set((state) => !state)}
                            >
                                <div className="zoom">
                                    {flipped ? (
                                        <a.img
                                            src={image}
                                            alt={name}
                                            className="img-thumbnail"
                                            style={{
                                                opacity: opacity.interpolate((o) => 1 - 0.2),
                                                transform,
                                            }}
                                        />
                                    ) : (
                                        <a.img
                                            src={image}
                                            alt={name}
                                            className="img-thumbnail"
                                            style={{
                                                opacity: 0.3,
                                                transform: transform.interpolate(
                                                    (t) => `${t} rotateX(10deg)`
                                                ),
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body bg-white m-1 shadow px-4 ">
                                    <h5> Registration Fee: ৳ {price} /- </h5>
                                    <p> {description} </p>
                                </div>
                                <Link to={`/checkout/${_id}`} className="btn btn-success">
                                    <i className="far fa-check mr-2"></i> CHECKOUT
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainAppLayout>
    );
}
