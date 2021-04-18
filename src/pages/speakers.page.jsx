import { Suspense, useEffect, useState } from "react"
import SpeakerDataService from '../services/speaker.service';
import SkeletonLoader from "./SkeletonLoader";
import Loading from "./Loading";
import { useSpring, animated as a } from 'react-spring'
import { useError } from "../context/useError";
import MainAppLayout from "../Layout/MainApp.layout";

export default function SpeakerPage() {
    const [speakers, setSpeakers] = useState([]);
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
                let data = await SpeakerDataService.getAll();
                console.log({ speakers: data })
                setSpeakers(data)
            } catch (error) {
                renderError(error);
            }
        }
        fetchData();
    }, [renderError]);

    return (
        <MainAppLayout>
            <Suspense fallback={<Loading />}>

                <div className="container-fluid py-3  mt-5 clip bg-light animation-right fade-right">
                    <div className="container py-3">
                        <h2 className="text-teal text-center py-3">Our Speakers</h2>

                        <div className="row  text-center">
                            {
                                !speakers.length && <Loading />
                            }
                            {
                                speakers.length > 0 && speakers.map((speaker) => (
                                    <div className="col-md-6"
                                        onClick={() => set(state => !state)}>
                                        <div className="card-body bg-white m-1 shadow px-4 ">
                                            <div className="zoom">
                                                {
                                                    flipped ? <a.img
                                                        src={speaker.image}
                                                        alt={speaker.name}
                                                        className="img-thumbnail"
                                                        style={{
                                                            opacity: opacity.interpolate(o => 1 - .2),
                                                            transform
                                                        }} /> : <a.img
                                                        src={speaker.image}
                                                        alt={speaker.name}
                                                        className="img-thumbnail"
                                                        style={{
                                                            opacity: .3,
                                                            transform: transform.interpolate(t => `${t} rotateX(10deg)`)
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <h2 className="text-info">{speaker.name}</h2>
                                            <p class="text-muted"> {speaker.designation} </p>
                                            <p> {speaker.bio.substr(0, 150)} </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </Suspense >
        </MainAppLayout>
    )
}
