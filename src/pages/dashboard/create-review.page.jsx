import DashboardLayout from "../../Layout/Dashboard.layout";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router";
import { useReview } from "../../context/ReviewProvider";
import ErrorComponent from "../ErrorComponent";
import { useAuth } from "../../context/AuthProvider";
import BeautyStars from 'beauty-stars'

export default function CreateReview() {
    const [data, setData] = useState({});
    const [rating, setRating] = useState(5);
    const { createReview } = useReview()
    const { currentUser } = useAuth()
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const [image, setImage] = useState();
    const history = useHistory();
    const onSubmit = async formData => {
        try {
            console.log(formData)
            let userImage = image ? image : (currentUser.photoURL ? currentUser.photoURL : 'https://conference-events.web.app/user.png')
            setData({ loading: true });

            await createReview({
                ...formData,
                name: currentUser.name,
                image: userImage,
                rating
            });
            reset();
            history.push('/');
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
                {data.error && data.place === 'add' && <ErrorComponent error={data.error} />}
                <div className="col-md-6">
                    <h2 className="text-teal"> Review the company </h2>
                    <form className="form " onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-group form-group mt-3">
                            <input
                                type="email"

                                {...register("email", { required: true })}
                                defaultValue={currentUser.email}
                                className={`form-control ${errors.email && 'is-invalid'} `}
                                placeholder={errors.email ? 'Email is required' : 'Enter Services\'s Email'} />
                        </div>
                        <div className="input-group form-group mt-3 ">
                            <input
                                type="text"
                                {...register("designation", { required: true })}
                                value={currentUser.designation}
                                className={`form-control ${errors.designation && 'is-invalid'} `}
                                placeholder={errors.designation ? 'designation is required' : 'eg : CEO at Programming Hero'} />
                        </div>

                        <div className="input-group form-group mt-3">
                            <input
                                type="file"
                                onChange={handleImage}
                                className={`form-control `}
                                placeholder="Image" />
                        </div>
                        <div className="input-group form-group mt-3">
                            <textarea
                                {...register("description", { required: true })}
                                className={`form-control ${errors.description && 'is-invalid'} `}
                                placeholder="Description" ></textarea>
                        </div>
                        <div className="input-group form-group mt-3 ">
                            <h5 className="text-teal"> Rate Our Services :  ({rating} <i className="fa text-warning fa-star"></i> )  </h5>
                            <BeautyStars
                                maxStars={5}
                                value={rating}
                                onChange={rating => setRating(rating)}
                            />

                        </div>

                        <div className="form-group mt-3 d-block text-center">
                            <button type="submit" className="btn btn-success">
                                <i className="fas fa-plus m-2"></i>
                                 ADD REVIEW
                    </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4  text-center">

                    <img
                        src={image ? image : (currentUser.photoURL ? currentUser.photoURL : 'https://conference-events.web.app/user.png')}
                        alt={image}
                        className="w-100 img-thumbnail"
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}