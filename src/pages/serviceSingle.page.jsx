import { useHistory, useParams } from 'react-router'
import { useEffect, useState } from "react"
import { useService } from "../context/ServiceProvider";

import MainAppLayout from "../Layout/MainApp.layout";
import ErrorComponent from "./ErrorComponent";

import Loading from './Loading';

export default function ServiceSinglePage() {
    const { serviceId } = useParams()
    const [data, setData] = useState({});
    const [service, setService] = useState({});
    const { getSingleService } = useService();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log({ data })
                setData({ loading: true })
                let response = await getSingleService(serviceId);
                setService(response);
                setData({ loading: false })
            } catch (error) {
                setData({ error })
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    const handlePayment = () => {
        history.push('/dashboard/order-list')
    }
    const { _id, name, description, price, image } = service;
    return (
        <MainAppLayout>
            <div className="container-fluid py-3  clip bg-light animation-right fade-right">
                <div className="container py-3">
                    <h2 className="text-teal text-center py-3">  {name}  </h2>

                    {data.error && <ErrorComponent error={data.error} />}

                    {data.loading ? <Loading /> : (
                        <div className="row  text-center">
                            <div className="col-md-6">
                                <div className="zoom">
                                    <img src={image} alt={name} className="w-50" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body bg-white m-1 shadow px-4 ">
                                    <h5> Registration Fee: $ {price} </h5>
                                    <p> {description} </p>
                                </div>
                                <butto className="btn btn-success" onClick={handlePayment}> Pay Via Stripe </butto>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainAppLayout>
    )
}
