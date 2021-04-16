import { Link } from "react-router-dom";

export default function Banner() {
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
            <div className="col-md-6  d-none d-md-inline-block">
                <img src="/banner.png" alt="Banner" className="img-fluid banner-img" />
            </div>
        </main>

    )
}
