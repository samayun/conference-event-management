import { Link } from "react-router-dom";
import { useSpring, animated as a } from 'react-spring'

export default function Banner() {

    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
    const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`


    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
    return (
        <main className="row d-flex align-items-center px-4 animation fade-left ">
            <div className="col-md-5 offset-md-1">
                <h1 className="text-white">
                    Your New Dream <br /> Starts Here  </h1>
                <p className="text-secondary">
                    JIbon zekhane stomito hoy,
                    sekhanei notun songram kore tike thakte hoy  </p>
                <Link to="/speakers" className="btn btn-primary"> SEE SPEAKERS </Link>
            </div>
            <div
                onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
                className="col-md-6  d-none d-md-inline-block">
                <a.img
                    style={{ transform: props.xy.interpolate(trans1) }}
                    src="/banner.png" alt="Banner" className="img-fluid banner-img" />
            </div>
        </main >

    )
}
