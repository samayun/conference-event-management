import axios from "./axios";

class Review {
    async getAll() {
        try {
            let { data } = await axios.get(`/reviews`);
            return data;
        } catch (error) {
            throw new Error("Failed to fetch review data");
        }
    }
    async getAuthUserReviews() {
        try {
            let { data } = await axios.get(`/reviews/myreviews`);
            return data;
        } catch (error) {
            throw new Error("Failed to fetch review data");
        }
    }
    async createReview(reviewdata) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'post',
                url: `/reviews`,
                data: reviewdata,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data;
        } catch (error) {
            throw new Error("Review fetch error");
        }
    }
    async editReview(productId, reviewdata) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios({
                method: 'put',
                url: `/reviews/${productId}`,
                data: reviewdata,
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return data
        } catch (error) {
            throw new Error("Refresh your browser or login again. Review service failed");
        }
    }

    async deleteReview(id) {
        try {
            const token = sessionStorage.getItem('token') || null;
            let { data } = await axios.delete(`/reviews/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            throw new Error(`Failed to delete delete review`)
        }
    }

}

// eslint-disable-next-line 
export default new Review;
