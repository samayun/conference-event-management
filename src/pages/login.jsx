import React from 'react'
import SocialMediaLogin from '../components/SocialMediaLogin'
import MainAppLayout from '../Layout/MainApp.layout'

export default function Login() {
    return (
        <MainAppLayout>
            <h2 className="text-center text-teal"> Login </h2>
            <form action="" className="text-center row  align-items-center justify-content-center d-flex">
                <div className="col-md-6">
                    <input type="email" className="form-control m-2 p-2" placeholder="Enter Your Valid Email Address" />
                    <input type="password" className="form-control m-2 p-2" placeholder="Password" />
                    <input type="submit" value="Login Now" className="btn btn-success" />
                </div>
            </form>
            <SocialMediaLogin />
        </MainAppLayout>
    )
}
