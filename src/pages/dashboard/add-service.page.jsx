import DashboardLayout from "../../Layout/Dashboard.layout";

import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router";
import { useService } from "../../context/ServiceProvider";
import ErrorComponent from "../ErrorComponent";

export default function AddService() {
    const [data, setData] = useState({});

    const { createService } = useService();
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const [image, setImage] = useState();
    const history = useHistory();
    const onSubmit = async formData => {
        try {
            setData({ loading: true });
            await createService({
                ...formData,
                image
            });
            reset();
            history.push('/dashboard/manage-services');
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'add' })
        }
    }
    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        let base64String = btoa(binaryString);
        base64String = `data:image/png;base64,${base64String}`
        setImage(base64String);
    }
    const handleImage = e => {
        let file = e.target.files[0];
        let fileIsImage = file.type.includes('image/');
        file.type.split('/') === '' && setImage(file);
        let extension = /(png|gif|jpg|jpeg|webp)/i.test(file.type.split('/')[1])
        if (!fileIsImage || !extension) {
            alert('File Format Is Invalid . Please Upload in image');
            setImage(undefined)
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded;
            reader.readAsBinaryString(file);
            console.log(reader)
        }
    }
    return (
        <DashboardLayout>
            <div className="row px-3">
                {data.error && data.place === 'add' && <ErrorComponent error={data.error} to={"/dashboard"} />}
                <div className="col-md-6">
                    <h2 className="text-teal"> Add a Service </h2>
                    <form className="form " onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group form-group mt-3 ">
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className={`form-control ${errors.name && 'is-invalid'} `}
                                placeholder={errors.name ? 'Name is required' : 'Enter Services\'s Name'} />
                        </div>
                        <div className="input-group form-group mt-3">
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className={`form-control ${errors.email && 'is-invalid'} `}
                                placeholder={errors.email ? 'Email is required' : 'Enter Services\'s Email'} />
                        </div>
                        <div className="input-group form-group mt-3 ">
                            <input
                                type="number"
                                {...register("price", { required: true, minLength: 0 })}
                                className={`form-control ${errors.price && 'is-invalid'} `}
                                placeholder={errors.price ? 'price is required' : 'Enter Services\'s price'} />
                        </div>
                        <div className="input-group form-group mt-3">
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                onChange={handleImage}
                                className={`form-control ${errors.image && 'is-invalid'} `}
                                placeholder="Image" />
                        </div>
                        <div className="input-group form-group mt-3">
                            <textarea
                                {...register("description", { required: true })}
                                className={`form-control ${errors.description && 'is-invalid'} `}
                                placeholder="Description" ></textarea>
                        </div>
                        <div className="form-group mt-3 d-block text-center">
                            <button type="submit" className="btn btn-warning">
                                <i className="fas fa-plus"></i>
                                 Add
                    </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4  text-center">
                    <img
                        src={image}
                        alt={image}
                        className="w-100 img-thumbnail"
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}