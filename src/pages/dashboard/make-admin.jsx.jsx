import DashboardLayout from "../../Layout/Dashboard.layout";
// import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router";
import DataServcie from "../../services/service.service";

export default function MakeAdmin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [image, setImage] = useState();
    const history = useHistory();
    const onSubmit = async doctorData => {
        try {
            await DataServcie.create({
                ...doctorData,
                image
            });
            history.replace('/dashboard/doctors')
        } catch (error) {
            console.error(error)
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
                <div className="col-md-8">
                    <h2 className="text-teal"> Add a Service </h2>
                    <form className="form " onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group form-group mt-3 ">
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className={`form-control ${errors.name && 'is-invalid'} `}
                                placeholder={errors.name ? 'Name is required' : 'Enter Doctor\'s Name'} />
                        </div>
                        <div className="input-group form-group mt-3">
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className={`form-control ${errors.email && 'is-invalid'} `}
                                placeholder={errors.email ? 'Email is required' : 'Enter Doctor\'s Email'} />

                        </div>
                        <div className="input-group form-group mt-3 ">
                            <input
                                type="education"
                                {...register("education", { required: true })}
                                className={`form-control ${errors.education && 'is-invalid'} `}
                                placeholder={errors.education ? 'education is required' : 'Enter Doctor\'s education'} />
                        </div>
                        <div className="input-group form-group mt-3">
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                onChange={handleImage}
                                className={`form-control ${errors.image && 'is-invalid'} `}
                                placeholder="Image" />

                        </div>
                        <div className="form-group mt-3 d-block text-center">
                            <button type="submit" className="btn btn-primary">
                                {/* <FontAwesomeIcon icon={faUserPlus} /> */}
                                 Add
                    </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4  text-center">
                    <img src={image}
                        alt={image} className="w-100 img-thumbnail" />
                </div>
            </div>
        </DashboardLayout>
    )
}