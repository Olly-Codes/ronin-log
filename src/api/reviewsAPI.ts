import type { ReviewDetailResponse, ReviewsResponse } from "../types/types";
import apiClient from "./apiClient";

const getReviews = async (): Promise<ReviewsResponse> => {
    const res = await apiClient.get<ReviewsResponse>("/reviews");
    return res.data;
};

const getReviewById = async (id: number): Promise<ReviewDetailResponse> => {
    const res = await apiClient.get<ReviewDetailResponse>(`/reviews/${id}`);
    return res.data;
}

export default {
    getReviews,
    getReviewById
}