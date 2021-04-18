import React from "react";
import { useForm } from "react-hook-form";
import SocialMediaLogin from "../components/SocialMediaLogin";
import MainAppLayout from "../Layout/MainApp.layout";

import { signIn } from "../firebase";
import userObject from "../utils/userObject";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Login() {
    const { setCurrentUser, error, setError, setLoading } = useAuth();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (credentials) => {
        try {
            setLoading(true);

            let result = await signIn(credentials.email, credentials.password);
            const newUser = userObject(result.user);
            setCurrentUser(newUser);
            history.push(from);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);

        }
    };

    return (
        <MainAppLayout>
            <h2 className="text-center text-teal"> Login </h2>{" "}


            {error && <h6 className="text-center text-danger">  {error} </h6>}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-center row  align-items-center justify-content-center d-flex"
            >
                <div className="col-md-6">
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className={`form-control  m-2 p-2 ${errors.email && "is-invalid"} `}
                        placeholder="Enter Your Valid Email Address"
                    />
                    {errors.email && <p className="text-center text-danger"> Email Is required </p>}
                    <input
                        type="password"
                        {...register("password", { required: true, minLength: 6 })}
                        className={`form-control  m-2 p-2 ${errors.password && "is-invalid"} `}
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-center text-danger"> password Is required </p>}
                    <input type="submit" value="Login Now" className="btn btn-success" />
                </div>
                <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
            </form>
            <SocialMediaLogin />
        </MainAppLayout>
    );
}
