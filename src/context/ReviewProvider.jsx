import { createContext, useContext, useState } from 'react'
import ReviewDataService from '../services/review.service';

const ReviewContext = createContext();
export const useReview = () => useContext(ReviewContext);

export default function ReviewProvider({ children }) {
    const [reviews, setReviews] = useState([]);

    const getData = () => ReviewDataService.getAll()
    const getMyReviews = () => ReviewDataService.getAuthUserReviews()
    const createReview = data => ReviewDataService.createReview(data);
    const deleteReview = email => ReviewDataService.deleteReview(email);

    const value = {
        reviews, setReviews, getMyReviews,
        getData, createReview, deleteReview
    }

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    )
}
