import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useService } from "../context/ServiceProvider";
import MainAppLayout from "../Layout/MainApp.layout";
import ErrorComponent from "../pages/ErrorComponent";
import { useSpring, animated as a } from "react-spring";
import Loading from "../pages/Loading";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { useOrder } from "../context/OrderProvider";

export default function MyCheckoutForm() {
    const { serviceId } = useParams();
    const [data, setData] = useState({});
    const [shipment, setShipment] = useState();
    const [service, setService] = useState({});

    const { getSingleService } = useService();
    const {
        createOrder,
        orderError,
        setOrderError,
        orderSuccess,
        setOrderSuccess,
    } = useOrder();

    const history = useHistory();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
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
                setData({ loading: true });
                let response = await getSingleService(serviceId);
                setService(response);
                setData({ loading: false });
            } catch (error) {
                setData({ error });
            }
        };
        fetchData();
        setOrderSuccess(null);
        setOrderError(null);
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (formData) => {
        try {
            setData({ loading: true });
            setShipment(formData);
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: "add" });
        }
    };
    const { _id, name, description, price, image } = service;

    const handlePayment = async (paymentdata) => {
        try {
            let orderCredentials = {
                paymentId: paymentdata.id,
                service: _id,
                payment: {
                    id: paymentdata.id,
                    card: paymentdata.card,
                    type: paymentdata.type,
                },
                shipment,
                amount: price,
                status: "done",
            };
            console.log(paymentdata);
            await createOrder(orderCredentials);
            setOrderError(null);
            setOrderSuccess("Ordered Successfully");
            history.push("/dashboard/order-list");
        } catch (error) {
            setOrderError(error.message);
            setOrderSuccess(null);
        }
    };

    return (
        <MainAppLayout>
            <div className="container-fluid py-3  clip bg-light animation-right fade-right">
                <div className="container py-3">

                    {data.error && <ErrorComponent error={data.error} />}

                    {data.loading ? (
                        <Loading />
                    ) : (
                        <div className="row  text-center">

                            { !shipment ? <> <div className="col-md-6">
                                <h2 className="text-teal"> Shipment Details </h2>
                                <form className="form " onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input-group form-group mt-3 ">
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            defaultValue={currentUser.name}
                                            className={`form-control ${errors.name && "is-invalid"} `}
                                            placeholder={
                                                errors.name ? "Name is required" : "Enter Your Name"
                                            }
                                        />
                                    </div>
                                    <div className="input-group form-group mt-3">
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            defaultValue={currentUser.email}
                                            className={`form-control ${errors.email && "is-invalid"
                                                } `}
                                            placeholder={
                                                errors.email ? "Email is required" : "Enter Your Email"
                                            }
                                        />
                                    </div>
                                    <div className="input-group form-group mt-3 ">
                                        <input
                                            type="text"
                                            {...register("phone", { required: true, minLength: 10 })}
                                            className={`form-control ${errors.phone && "is-invalid"
                                                } `}
                                            placeholder={
                                                errors.phone ? "phone is required" : "Enter Your phone"
                                            }
                                        />
                                    </div>

                                    <div className="input-group form-group mt-3">
                                        <textarea
                                            {...register("address", { required: true })}
                                            className={`form-control ${errors.address && "is-invalid"
                                                } `}
                                            placeholder="address"
                                        ></textarea>
                                    </div>
                                    <div className="form-group mt-3 d-block text-center">
                                        <button
                                            disabled={shipment && shipment.email}
                                            type="submit"
                                            className="btn btn-warning"
                                        >
                                            <i className="far fa-check mr-2"></i>
                                           Submit </button>
                                    </div>
                                </form>
                            </div> </> : <div className="col-md-6">
                                <div
                                    onClick={() => set(state => !state)}
                                    className="card">
                                    <div className="card-body bg-white m-1 shadow px-4 ">
                                        <div className="zoom">
                                            {
                                                flipped ? <a.img
                                                    src={image}
                                                    alt={name}
                                                    className="img-thumbnail"
                                                    style={{
                                                        opacity: opacity.interpolate(o => 1 - .2),
                                                        transform
                                                    }} /> : <a.img
                                                    src={image}
                                                    alt={name}
                                                    className="img-thumbnail"
                                                    style={{
                                                        opacity: .3,
                                                        transform: transform.interpolate(t => `${t} rotateX(10deg)`)
                                                    }}
                                                />
                                            }
                                        </div>
                                        <h2 className="text-info">{name}</h2>
                                        <p class="text-muted"> {description} </p>
                                        <p> Registration FEE: {price} </p>
                                        <hr />
                                    </div>
                                </div>
                            </div>}

                            <div className="col-md-6 align-items-center d-flex">
                                {shipment && shipment.email ? (
                                    <ProcessPayment
                                        handlePayment={handlePayment}
                                        amount={price}
                                    ></ProcessPayment>
                                ) : (
                                    <h3 className="text-secondary">
                                        Please Input Shipment Details First
                                    </h3>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainAppLayout>
    );
}
