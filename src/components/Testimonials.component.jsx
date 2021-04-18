import { Suspense, useEffect, useState } from "react"
import { useError } from "../context/useError";
import SkeletonLoader from "../pages/SkeletonLoader";
import ReviewDataService from '../services/review.service';
import BeautyStars from 'beauty-stars';

export default function Services() {
    const [reviews, setReviews] = useState([]);
    const { renderError } = useError();


    useEffect(() => {
        async function fetchData() {
            try {
                let data = await ReviewDataService.getAll()
                setReviews(data);
            } catch (error) {
                renderError(error);
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);
    const showStarIcon = rating => {
        let stars = "";
        for (let i = 1; i <= rating; i++) {
            stars += <i className="fa fa-star text-warning"></i>
        }
        return stars;
    }
    return (
        <div className="container-fluid py-3  mt-5 clip bg-light animation-right fade-right" id="testimonials">
            <div className="container py-3">
                <h2 className="text-teal text-center py-3"> Testimonials </h2>
                {
                    !reviews.length && <SkeletonLoader />
                }
                <Suspense fallback={<SkeletonLoader />}>

                    <div className="row  text-center">
                        {
                            reviews.map(_ => (
                                <div className="col-md-4">
                                    <div className="card-body m-1 shadow-md px-1 "
                                        style={{ backgroundColor: 'rgb(238, 238, 238)' }}
                                    >
                                        <i className="fa fa-quotes"></i>
                                        <strong className="text-secondary"> {_.name} <small> Says, </small> </strong>
                                        <img src={_?.image} alt={_.name} className="img-circle img-sm img-fluid" />
                                        <h6 className="text-info">{_.designation}</h6>
                                        <i className="quotes"> {_.description} </i>

                                        <p className="star">
                                            <BeautyStars
                                                maxStars={5}
                                                size="20px"
                                                inactiveColor="#121621"
                                                value={_.rating / 2.5}
                                            />
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </Suspense>
            </div>
        </div>
    )
}
