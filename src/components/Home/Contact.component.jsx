
export default function Contact() {
    return (
        <div className="container-fluid  py-3 w-75">
            <div className="container py-3">
                <h2 className="text-center text-teal"> Contact Us </h2>
                <form action="" className="text-center row  align-items-center justify-content-center d-flex">
                    <div className="col-md-6">
                        <input type="text" className="form-control m-2 p-2" placeholder="Enter Your Name" />
                        <input type="email" className="form-control m-2 p-2" placeholder="Email" />
                        <input type="text" className="form-control m-2 p-2" placeholder="Subject" />
                    </div>
                    <div className="col-md-6">
                        <textarea
                            name="desc"
                            className="form-control m-2 o-2"
                            placeholder="Description" id="" cols="30" rows="10"></textarea> <br />
                        <input type="submit" value="SEND" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    )
}
