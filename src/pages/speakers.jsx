import { Suspense, useEffect, useState } from "react"
import MainAppLayout from "../Layout/MainApp.layout";
import Service from '../services/service.service';
import Loading from './Loading'

export default function SpeakersPage() {
    const [speakers, setSpeakers] = useState([]);
    const fetchData = async () => {
        try {
            let data = await Service.getAll();
            setTimeout(() => {
                setSpeakers(data)
            }, 3000);
        } catch (error) {
            setTimeout(() => alert(error.message), 4000)
        }
    }
    useEffect(fetchData, [])
    return (
        <MainAppLayout>
            <div className="container-fluid py-3  mt-5 clip bg-light animation-right fade-right">
                <div className="container py-3">
                    <h2 className="text-teal text-center py-3">Our Speakers </h2>
                    <Suspense fallback={<Loading />}>
                        {
                            !speakers.length && <Loading />
                        }
                        <div className="row  text-center">
                            {
                                speakers.map(({ _id, icon, title, description }) => (
                                    <div className="col-md-6">
                                        <div className="card-body bg-white m-1 shadow px-4 ">
                                            <div className="icon">
                                                <i className={icon}></i>
                                            </div>
                                            <img src="/logo512.png" alt="" className=" img-fluid" />
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
