import DashboardLayout from "../../Layout/Dashboard.layout";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useAdmin } from "../../context/AdminProvider";
import SkeletonLoader from "../SkeletonLoader";
import ErrorComponent from "../ErrorComponent";

export default function MakeAdmin() {
    const [data, setData] = useState({});

    const { getData, deleteAdmin, createAdmin, admins, setAdmins } = useAdmin();
    const fetchData = async () => {
        try {
            setData({ loading: true });
            let response = await getData();
            setAdmins(response);
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'list' })
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();


    const onSubmit = async formData => {
        try {
            setData({ loading: true });
            let response = await createAdmin(formData);
            reset();
            setAdmins([response, ...admins]);
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'add' })
        }
    }

    const handleDelete = async (email) => {
        try {
            console.log({ admins });
            setData({ loading: true });
            let deletedAdmin = await deleteAdmin(email);
            setAdmins(admins.filter(dt => deletedAdmin._id !== dt._id));
            setData({ loading: false });
        } catch (error) {
            setData({ error })
        }
    }
    return (
        <DashboardLayout>
            {/* ADD SECTION  */}
            <div className="row px-3 my-5 ">


                <div className="col-md-4">
                    <h2 className="text-teal"> Add an admin </h2>
                    {data.error && data.place === 'add' && <ErrorComponent error={data.error} to={"/dashboard"} />}
                    <form className="form " onSubmit={handleSubmit(onSubmit)}>
                        {errors.email && <h6 className="text-danger"> Provide valid email address</h6>}
                        <div className="input-group form-group mt-3">
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className={`form-control ${errors.email && 'is-invalid'} `}
                                placeholder={'Enter Admins\'s Email'} /><br />

                        </div>

                        <div className="form-group mt-3 d-block text-center">
                            <button type="submit" className="btn btn-info">
                                <i className="fas fa-plus m-2"></i>
                                 Make Admin
                    </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-8  text-center">
                    {/* FETCH SECTION  */}
                    {data.loading && <SkeletonLoader />}
                    <div class="table-responsive-md">
                        <table class="table caption-top">
                            <caption>List of Admins</caption>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colSpan={6}>{data.error && data.place === 'list' && <ErrorComponent error={data.error} to={"/dashboard"} />}</td>
                                </tr>
                                {
                                    admins.length ? admins.map(({ _id, email }) => (
                                        <tr key={_id}>
                                            <td> <strong>{_id}</strong> </td>
                                            <td> {email} </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(email)}
                                                    className="btn btn-danger">
                                                    <i className="fas fa-trash px-2"></i>
                                            Remove as admin
                                        </button>
                                            </td>
                                        </tr>
                                    )) : <tr> <td colSpan={6}> <h4 className="text-danger"> No Admin Added </h4> </td> </tr>
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </DashboardLayout>
    )
}