import { useEffect, useState } from "react";
import { useReview } from "../../context/ReviewProvider";
import DashboardLayout from "../../Layout/Dashboard.layout";
import ErrorComponent from "../ErrorComponent";
import SkeletonLoader from "../SkeletonLoader";
import BeautyStars from 'beauty-stars';
import { Link } from "react-router-dom";

export default function ManageServices() {
    const [data, setData] = useState({});
    const { reviews, setReviews, getMyReviews, deleteReview } = useReview();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ loading: true })
                let response = await getMyReviews();
                setReviews(response);
                setData({ loading: false })
            } catch (error) {
                setData({ error })
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    // DELETE OPERATION 
    const handleDelete = async (reviewId) => {
        try {
            setData({ loading: true });
            let deletedReview = await deleteReview(reviewId);
            setReviews(reviews.filter(dt => deletedReview._id !== dt._id));
            setData({ loading: false });
        } catch (error) {
            setData({ error, place: 'delete' })
        }
    }

    return (
        <DashboardLayout>
            <h3 className="text-teal"> My Reviews </h3>
            {data.loading ? <SkeletonLoader /> : (
                <div class="table-responsive-sm">
                    <table class="table caption-top">
                        <caption>List of Services</caption>
                        <thead>
                            <tr>
                                <th scope="col">Reviewer</th>
                                <th scope="col">`Designation`</th>
                                <th scope="col">Description</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6}>
                                    {data.error && <ErrorComponent error={data.error} to={"/dashboard"} />}
                                </td>
                            </tr>
                            {
                                reviews.length ? reviews.map(({ _id, email, image, designation, name, description, rating }) => (
                                    <tr key={_id}>
                                        <td> <img src={image} alt={name} className="img-sm img-circle" /> </td>
                                        <td>{designation}</td>
                                        <td> {description} </td>
                                        <td>
                                            <BeautyStars
                                                maxStars={5}
                                                size="20px"
                                                inactiveColor="#121621"
                                                value={rating}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(_id)}
                                                className="btn btn-danger">
                                                <i className="fas fa-trash p-2"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6}>
                                            <h6 className="text-danger text-center py-3"> You have not reviewd yet :) Please
                                            <Link to="/dashboard/create-review"> review here  </Link> </h6>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>

                </div>
            )}
        </DashboardLayout>
    )
}
